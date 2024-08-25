"use client";

import React, { useEffect, useState } from "react";
import "./FloatingEmojis.css";

const FloatingEmojis = () => {
  const [emojis, setEmojis] = useState<any[]>([]);

  useEffect(() => {
    // Generate 100 emoji elements
    const emojiArray = Array.from({ length: 50 }, (_, index) => (
      <div
        key={index}
        className="emoji"
        style={{
          left: `${Math.random() * 100}vw`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${5 + Math.random() * 5}s`,
        }}
      >
        🦜🔗
        {/* 🌲 */}
        {/* 🌴 */}
      </div>
    ));
    setEmojis(emojiArray);
  }, []);

  return <div className="emoji-container">{emojis}</div>;
};

export default FloatingEmojis;
