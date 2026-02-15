import "../App.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* HEADER */}
      <header className="about-header">
        <h2>About Us</h2>
        <p>
          We build student-first solutions that make learning simpler, faster,
          and more accessible.
        </p>
      </header>

      {/* MISSION / VISION / VALUES */}
      <section className="about-grid">
        <div className="about-card">
          <h3>Our Mission</h3>
          <p>
            Our mission is to empower students by providing well-structured,
            high-quality learning resources that save time and improve academic
            understanding.
          </p>
        </div>

        <div className="about-card">
          <h3>Our Vision</h3>
          <p>
            We envision a future where every learner has easy access to reliable
            educational tools that support growth, confidence, and success.
          </p>
        </div>

        <div className="about-card">
          <h3>Our Values</h3>
          <ul>
            <li>Student-first approach</li>
            <li>Quality & reliability</li>
            <li>Simplicity in design</li>
            <li>Continuous improvement</li>
          </ul>
        </div>
      </section>

      {/* TEAM */}
      <section className="team-section">
        <h3>Our Team</h3>
        <p className="team-subtitle">
          A passionate group of learners, builders, and problem-solvers.
        </p>

        <div className="team-grid">
          <div className="team-card">
            <div className="team-avatar">RC</div>
            <h4>Rohit Kumar Chaurasiya</h4>
            <span>Founder & Developer</span>
          </div>

          <div className="team-card">
            <div className="team-avatar">AK</div>
            <h4>Arya Karn</h4>
            <span>Frontend Developer</span>
          </div>

          <div className="team-card">
            <div className="team-avatar">S</div>
            <h4>Support Team</h4>
            <span>Content & Research</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
