from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import pandas as pd
import joblib
from pydantic import BaseModel, Field, validator
from typing import List, Optional
import logging
import os
from enum import Enum
import numpy as np

# Configure logging with more detail
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class ContentType(str, Enum):
    EDUCATIONAL = "Educational"
    ISLAMIC = "Islamic"
    EMOTIONAL = "Emotional"
    SOCIAL = "Social"
    ETHICAL = "Ethical"

class Genre(str, Enum):
    ACTION = "Action"
    ADVENTURE = "Adventure"
    BIOGRAPHY = "Biography"
    COMEDY = "Comedy"
    CRIME = "Crime"
    DRAMA = "Drama"
    EDUCATIONAL = "Educational"
    FAMILY = "Family"
    FANTASY = "Fantasy"
    HISTORY = "History"
    HORROR = "Horror"
    ISLAMIC = "Islamic"
    MUSIC = "Music"
    MUSICAL = "Musical"
    MYSTERY = "Mystery"
    ROMANCE = "Romance"
    SCIFI = "Sci-Fi"
    SPORT = "Sport"
    THRILLER = "Thriller"
    WAR = "War"
    WESTERN = "Western"
    ANIMATION = "Animation"

class UserInput(BaseModel):
    content_type: ContentType
    genres: List[Genre]
    age: Optional[int] = Field(None, ge=0, le=120)

    @validator('genres')
    def validate_genres_length(cls, v):
        if not v:
            raise ValueError("At least one genre must be provided")
        return v

    class Config:
        json_schema_extra = {
            "example": {
                "content_type": "Educational",
                "genres": ["Action", "Educational"],
                "age": 25
            }
        }

class Models:
    def __init__(self):
        self.scaler = None
        self.kmeans = None
        self.dataset = None
        self.dataset_shows_desc = None

    def is_loaded(self) -> bool:
        return all([
            self.scaler is not None,
            self.kmeans is not None,
            self.dataset is not None,
            self.dataset_shows_desc is not None
        ])

# Global models instance
models = Models()

def load_models():
    """Load all required models and datasets"""
    model_files = {
        'scaler': 'standard_scaler.pkl',
        'kmeans': 'kmeans_model.pkl',
        'dataset': 'dataset_with_clusters.csv',
        'dataset_shows_desc': 'dataset_shows_desc.csv'
    }

    try:
        logger.info("Starting model loading process...")

        for name, file_path in model_files.items():
            logger.info(f"Loading {name} from {file_path}...")

            if not os.path.exists(file_path):
                logger.error(f"File not found: {file_path}")
                raise FileNotFoundError(f"Required file {file_path} not found. Please run train_models.py first.")

            if file_path.endswith('.pkl'):
                setattr(models, name, joblib.load(file_path))
            else:
                setattr(models, name, pd.read_csv(file_path))

            logger.info(f"Successfully loaded {name}")

        logger.info("All models loaded successfully")
        return True

    except Exception as e:
        logger.error(f"Error loading models: {str(e)}")
        return False

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting application...")
    success = load_models()
    if not success:
        logger.error("Failed to load models")
        raise RuntimeError("Failed to load required models")
    logger.info("Application startup complete")
    yield
    # Shutdown
    logger.info("Shutting down application...")

app = FastAPI(
    title="Content Recommendation API",
    description="API for content recommendations based on user preferences",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def create_feature_vector(content_type: ContentType, genres: List[Genre], age: Optional[int]) -> list:
    try:
        # Initialize all features with zeros for content type scores
        features = {
            'Script_educational_Score': 0,
            'Script_Islamic_Score': 0,
            'Script_emotional_Score': 0,
            'Script_social_Score': 0,
            'Script_Ethical_Score': 0,
            'Average_Age': age if age is not None else 0
        }

        # Set the corresponding content type score to 1
        score_key = f'Script_{content_type.value.lower()}_Score'
        features[score_key] = 1

        # Initialize genre features (these will not be passed to the scaler)
        genre_features = {f"genre_{genre.value.lower()}": 0 for genre in genres}

        # Set selected genres to 1
        for genre in genres:
            genre_features[f"genre_{genre.value.lower()}"] = 1

        # Add genre features to the vector (without including in scaling)
        features.update(genre_features)

        # Return only the relevant columns for scaling (i.e., content type scores and age)
        return [features['Script_Ethical_Score'], features['Script_educational_Score'],
                features['Script_Islamic_Score'], features['Script_social_Score'],
                features['Script_emotional_Score'], features['Average_Age']]
    except Exception as e:
        logger.error(f"Error creating feature vector: {e}")
        raise


class RecommendationResponse(BaseModel):
    index: int
    Show_Title: str
    YouTube_Playlist_Link: str
    Number_of_Episodes: int
    Show_Description: str
    Year: int
    URL_Picture: str
    IMDb_Rating: float
    Runtime: int
    Title_Type: str
def safe_convert(value, dtype):
    """Safely convert values to the specified dtype (int/float). Returns default value if conversion fails."""
    try:
        if pd.isna(value):
            return 0 if dtype == int else 0.0  # Default to 0 or 0.0 for NaN values
        return dtype(value)
    except (ValueError, TypeError):
        return 0 if dtype == int else 0.0  # Return 0 or 0.0 in case of an error

@app.post("/recommendations/", response_model=dict)
async def get_recommendations(user_input: UserInput):
    try:
        logger.info(f"Received request with input: {user_input}")

        if not models.is_loaded():
            logger.error("Models not properly loaded")
            raise HTTPException(
                status_code=500,
                detail="Models not properly loaded. Please try again later."
            )

        user_vector = create_feature_vector(
            user_input.content_type,
            user_input.genres,
            user_input.age
        )

        logger.info(f"Feature vector created: {user_vector}")

        user_vector_scaled = models.scaler.transform([user_vector])
        user_cluster = models.kmeans.predict(user_vector_scaled)[0]
        logger.info(f"Predicted user cluster: {user_cluster}")

        # Get recommendations from the cluster
        cluster_mask = models.dataset['Cluster'] == user_cluster
        recommendations = models.dataset[cluster_mask]

        if recommendations.empty:
            logger.warning(f"No recommendations found for cluster {user_cluster}")
            raise HTTPException(
                status_code=404,
                detail="No recommendations found for the given preferences."
            )

        # Get the corresponding show descriptions
        results = []
        for idx, row in recommendations.iterrows():
            # Find matching show in dataset_shows_desc using index
            show_info = models.dataset_shows_desc.loc[idx]

            try:
                results.append({
                    "index": int(idx),
                    "Show_Title": str(show_info['Show_Title']),
                    "YouTube_Playlist_Link": str(show_info['YouTube Playlist Link']),
                    "Number_of_Episodes": safe_convert(show_info['Number of Episodes'], int),
                    "Show_Description": str(show_info['Show_Description']),
                    "Year": safe_convert(show_info['Year'], int),
                    "URL_Picture": str(show_info['URL_Picture']),
                    "IMDb_Rating": safe_convert(show_info['IMDb Rating'], float),
                    "Runtime": safe_convert(show_info['Runtime (mins)'], int),
                    "Title_Type": str(show_info['Title Type'])
                })
            except (KeyError, ValueError) as e:
                logger.error(f"Error processing row {idx}: {e}")
                continue

        if not results:
            raise HTTPException(
                status_code=500,
                detail="Error processing recommendations data."
            )

        return {
            "status": "success",
            "count": len(results),
            "recommendations": results
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred while processing your request."
        )
