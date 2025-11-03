import React, { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // 🎯 Détecte le défilement
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300); // Affiche la flèche après 300px
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🎯 Fonction pour remonter en haut
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // défilement doux
    });
  }

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top ${isVisible ? "show" : ""}`}
      aria-label="Remonter en haut"
    >
      ↑
    </button>
  );
}
