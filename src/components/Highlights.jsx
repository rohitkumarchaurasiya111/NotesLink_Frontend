import React, { useMemo } from "react";

const ALL_HIGHLIGHTS = [
  "Specially crafted notes tailored to your college syllabus",
  "Exam-focused content to help you score better",
  "All subjects and semesters in one organized platform",
  "Trusted materials curated by toppers and mentors",
  "Perfect for quick revision and last-minute preparation",
  "Premium handwritten notes for deep understanding",
  "Save time with structured and distraction-free learning",
  "Learn smarter with concise and relevant explanations",
  "Designed to support your academic goals",
  "Study once, revise faster, perform better",
  "No unnecessary content — only what matters for exams",
  "Built by students, tested in real exams",
];

const Highlights = () => {
  const highlights = useMemo(() => {
    const shuffled = [...ALL_HIGHLIGHTS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-900">
        <u>Highlights</u>
      </h3>

      <ul role="list" className="list-disc space-y-2 pl-4 text-sm mt-4">
        {highlights.map((highlight) => (
          <li key={highlight} className="text-gray-600">
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Highlights;
