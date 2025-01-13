# NoonToon: Culturally Sensitive Recommendation System for Arabic Children's Content

The increasing exposure of children in Arabic-speaking societies to global media content has raised significant concerns among parents and educators about the potential misalignment of such content with Arabic and Islamic cultural values. Western media often introduces themes that may conflict with traditional values, including sexualized content and gender ideologies. To address this challenge, the NoonToon project aims to develop a culturally sensitive recommendation system for Arabic children's TV shows, movies, and anime. 

Leveraging Natural Language Processing (NLP), deep learning models, and a manually curated Islamic values lexicon, the system analyzes textual content, such as scripts and subtitles, to ensure recommendations align with Islamic ethics and Arabic traditions. The solution provides personalized and age-appropriate content suggestions that nurture ethical values, emotional intelligence, and social development while avoiding inappropriate themes. This project contributes to creating a safe digital space for Arabic-speaking children by offering culturally relevant and ethically sound entertainment options.

## Demo

Watch the demo of the NoonToon project: [YouTube Demo Link](https://www.youtube.com/watch?v=5k6CHh9H58I)

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) to set up the frontend for the application.

## Available Scripts

In the project directory, you can run the following scripts:

### `npm start`
- Runs the app in development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- The page will automatically reload when changes are made.
- Any lint errors will appear in the console.

### `npm test`
- Launches the test runner in interactive watch mode.
- You can learn more about running tests in [Create React App Docs](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`
- Builds the app for production in the `build` folder.
- Optimizes the app for the best performance, ensuring it is minified.
- Prepares the app for deployment. You can learn more about deployment in the [Create React App Docs](https://facebook.github.io/create-react-app/docs/deployment).

### `npm run eject`
- **Note**: This is a one-way operation. Once you `eject`, you can't go back!
- Ejecting removes the single build dependency and gives full control over the configurations (webpack, Babel, ESLint, etc.). This can be useful if you want to customize your build tool, but it's generally not necessary for smaller projects.
- You don't have to use this unless you need deep customization.

## Learn More

You can explore the following resources to deepen your understanding of the tools used:

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)

## Backend API Endpoint

The backend for this project is built using FastAPI. The API endpoints are defined in the `Endpoint` branch, specifically in the `endpoint.py` file, or wherever the FastAPI app is configured. This API listens for requests from the frontend and provides necessary data.

To get started with the backend:

1. Navigate to the [Endpoint Branch](https://github.com/Raoufbendii/nlp-project/tree/Endpoint).
2. Install the required packages for the backend by running:
   ```bash
   pip install -r requirements.txt
