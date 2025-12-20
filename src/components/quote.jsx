import React from "react";

const quotes = [
  "Discipline today builds the success you dream of tomorrow.",
  "Study while others sleep. Your future self will thank you.",
  "Every hour you study is an investment in your goals.",
  "Success is nothing more than daily effort repeated consistently.",
  "Your goals don’t care about excuses—only actions.",
  "Focus now, celebrate later.",
  "Small progress each day leads to big achievements.",
  "Hard work beats talent when talent doesn’t work hard.",
  "The pain of studying is temporary, the pride of success is permanent.",
  "Dream big, study smart, and stay consistent.",
  "Your future depends on what you do today, not tomorrow.",
  "One focused session can change your entire future.",
  "Study with purpose, not pressure.",
  "Great achievements begin with disciplined preparation."
];

export default function Quote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  return (
    <div className="text-center italic text-gray-700">
      “{randomQuote}”
    </div>
  );
}
