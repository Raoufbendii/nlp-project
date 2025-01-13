import React from "react";
import Card from "./Card";

const CardGallery = ({ genre, onCardClick }) => {
    const cards = [
        {
          id: 1,
          title: "وقت المغامرة",
          description: "مسلسل خيالي أمريكي من إنتاج Pendleton Ward وFrederator Studios...",
          genres: ["خيال", "شونين", "دراما", "فوق الطبيعة"],
          overallScore: 7.72,
          fantasyScore: 9,
          image: "/shows/adventureTime.png",
        },
        {
          id: 2,
          title: "بليتش",
          description: "بعد هجوم عنيف من Quincy King Yhwach، يعاني سكان Soul Society...",
          genres: ["خيال", "شونين", "دراما", "فوق الطبيعة"],
          overallScore: 8.5,
          fantasyScore: 8.5,
          image: "/shows/bleach.png",
        },
        {
          id: 3,
          title: "غامبول",
          description: "مسلسل كوميدي يروي يوميات غامبول وأصدقائه في مدينة Elmore...",
          genres: ["كوميديا", "خيال"],
          overallScore: 8.0,
          fantasyScore: 7.5,
          image: "/shows/gamball.png",
        },
        {
          id: 4,
          title: "أسطورة كورا",
          description: "مسلسل خيالي يحكي مغامرات كورا في عالم الأفاتار...",
          genres: ["خيال", "أكشن", "دراما"],
          overallScore: 8.7,
          fantasyScore: 8.9,
          image: "/shows/kora.png",
        },
        {
          id: 5,
          title: "ناروتو",
          description: "يحكي قصة نينجا شاب يسعى لتحقيق حلمه بأن يصبح الهوكاجي...",
          genres: ["أكشن", "شونين", "دراما"],
          overallScore: 8.8,
          fantasyScore: 8.2,
          image: "/shows/naruto.jpg",
        },
        {
          id: 6,
          title: "ون بيس",
          description: "يحكي مغامرات لوفي وطاقمه في البحث عن كنز ون بيس...",
          genres: ["أكشن", "خيال", "شونين"],
          overallScore: 9.1,
          fantasyScore: 8.8,
          image: "/shows/onePiece.jpg",
        },
        {
          id: 7,
          title: "دراغون بول",
          description: "مغامرات غوكو وأصدقائه في مواجهة الأعداء وإنقاذ العالم...",
          genres: ["أكشن", "شونين", "خيال"],
          overallScore: 8.9,
          fantasyScore: 8.5,
          image: "/shows/dragonBall.jpg",
        },
        {
          id: 8,
          title: "المنزل الصاخب",
          description: "كوميديا عائلية حول مغامرات لينكولن ولونا وأشقائهم العشرة...",
          genres: ["كوميديا", "عائلي"],
          overallScore: 7.5,
          fantasyScore: 6.8,
          image: "/shows/loudHouse.jpg",
        },
        {
          id: 9,
          title: "هجوم العمالقة",
          description: "يحكي صراع البشر للبقاء في عالم تسيطر فيه العمالقة...",
          genres: ["أكشن", "دراما", "خيال"],
          overallScore: 9.3,
          fantasyScore: 8.6,
          image: "/shows/attackOnTitan.jpg",
        },
        {
          id: 10,
          title: "ريغولار شو",
          description: "مغامرات كوميدية مجنونة لموردكاي وريغبي في حديقة المدينة...",
          genres: ["كوميديا", "خيال"],
          overallScore: 8.2,
          fantasyScore: 7.7,
          image: "/shows/rs.png",
        },
      ];
      
  const filteredCards = genre
    ? cards.filter((card) => card.genres.includes(genre))
    : cards;

  return (
    <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-4">
      {filteredCards.map((card, index) => (
        <Card key={index} {...card} onClick={() => onCardClick(card)} />
      ))}
    </div>
  );
};

export default CardGallery;
