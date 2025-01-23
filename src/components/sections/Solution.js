import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRocket,
  faGears,
  faChartLine,
  faShieldAlt,
  faArrowsRotate
} from '@fortawesome/free-solid-svg-icons';
import happyRep from '../../images/happy-rep.webp';

const Solution = () => {
  const benefits = [
    {
      icon: faRocket,
      title: "Automated Record Management",
      description: "Instant creation and linking of Workspaces, Leads, and Accounts - no manual intervention needed."
    },
    {
      icon: faArrowsRotate,
      title: "Real-Time Sync",
      description: "Product lifecycle events instantly reflected in Salesforce using Platform Events technology."
    },
    {
      icon: faChartLine,
      title: "360° Visibility",
      description: "Real-time dashboards and smart notifications keep sales teams informed and proactive."
    },
    {
      icon: faGears,
      title: "Seamless Upgrades",
      description: "Smooth transition path from self-serve to sales-led with automated billing transitions."
    },
    {
      icon: faShieldAlt,
      title: "Enterprise-Grade Reliability",
      description: "Built-in data validation, privacy controls, and comprehensive error handling."
    }
  ];

  return (
    <section id="solution" className="section">
      <div className="section-content">
        <div className="section-title">
          <span className="section-badge">The Solution</span>
          <h2>A Fault-Tolerant Self-Serve Engine</h2>
          <p className="title-description">
            Automating the entire customer lifecycle while maintaining data integrity
          </p>
          <div className="title-underline"></div>
        </div>

        <div className="solution-benefits">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <FontAwesomeIcon icon={benefit.icon} className="benefit-icon" />
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="solution-outcome">
          <div className="outcome-text">
            <h3>The Result?</h3>
            <p>Happy sales reps with complete visibility and control over their self-serve customers</p>
          </div>
          <img src={happyRep} alt="Happy Sales Representative" className="outcome-image" />
        </div>
      </div>
    </section>
  );
};

export default Solution; 