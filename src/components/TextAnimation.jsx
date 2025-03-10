import React, { useEffect, useState } from "react";

const messages = [
  "Analyzing your prompt and crafting the perfect website structure…",
  "Designing your pages with a seamless user experience in mind…",
  "Ensuring everything is perfect for you…",
  "Generating structured content and layouts for your website…",
  "Loading content. Almost there…",
  "Finalizing website structure. Just a moment…",
];

const TextAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation, setAnimation] = useState("slide-in");

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation("slide-out");
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
        setAnimation("slide-in");
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <p className={`loading-message ${animation}`}>{messages[currentIndex]}</p>
    </div>
  );
};

export default TextAnimation;
