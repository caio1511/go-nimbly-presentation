import React from 'react';
import gbLogo from '../../images/gb.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faGears,
  faTriangleExclamation,
  faBolt
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/sections.css';

const PackersAnalogy = () => {
  return (
    <section id="packers" className="section">
      <div className="section-content">
        <div className="section-title">
          <span className="section-badge">The Analogy</span>
          <h2>The Green Bay Packers Problem</h2>
          <p className="title-description">
            What NFL playoff woes can teach us about system architecture
          </p>
          <div className="title-underline"></div>
        </div>

        <div className="packers-story">
          <div className="packers-header">
            <img src={gbLogo} alt="Green Bay Packers Logo" className="packers-logo" />
            <div className="story-intro">
              <h3>A Tale of Poor Observability</h3>
              <p className="fun-fact">
                <span className="fun-badge">Fun Fact</span> I witnessed the first Eagles defeat in São Paulo! Sad.
              </p>
            </div>
          </div>

          <div className="story-timeline">
            <div className="timeline-item">
              <div className="timeline-icon">
                <FontAwesomeIcon icon={faTriangleExclamation} />
              </div>
              <div className="timeline-content">
                <h4>The Warning Signs</h4>
                <p>As the season progressed, Green Bay kept losing key players. Like a system losing critical services, 
                the warning signs were there, but no proactive measures were taken.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-icon">
                <FontAwesomeIcon icon={faBolt} />
              </div>
              <div className="timeline-content">
                <h4>The Breaking Point</h4>
                <p>Wild Card round: 4 top receivers out. Imagine trying to run a microservice architecture with 4 key 
                services down. The result? Predictable routes, just like predictable system failures.</p>
              </div>
            </div>
          </div>

          <div className="lessons-learned">
            <h3>What Can We Learn From This Subpar Season? 🥲</h3>
            <div className="lessons-grid">
              <div className="lesson-card">
                <FontAwesomeIcon icon={faEye} className="lesson-icon" />
                <h4>Observability</h4>
                <p>Just as the Packers needed better player management insights, our architecture needs deep 
                monitoring through error logs, reports, and real-time dashboards.</p>
              </div>

              <div className="lesson-card">
                <FontAwesomeIcon icon={faGears} className="lesson-icon" />
                <h4>Adaptability</h4>
                <p>The Packers' inability to adapt their game plan shows the importance of building fault-tolerant 
                systems that can respond to changes and provide data-driven decisions.</p>
              </div>
            </div>
          </div>

          <div className="packers-conclusion">
            <p>
              <strong>The Bottom Line:</strong> Whether you're managing an NFL team or a software architecture, 
              you need visibility into what's happening and the ability to respond to changes. Unlike the Packers, 
              our solution is designed to keep you in the game! 🏈
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackersAnalogy; 