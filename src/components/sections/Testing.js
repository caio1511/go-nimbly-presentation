import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVial,
  faRocket,
  faUserCheck,
  faGears,
  faChartLine,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

const Testing = () => {
  const testingPhases = [
    {
      icon: faVial,
      title: "Integration Testing",
      description: "Comprehensive testing of all system integrations",
      items: [
        "**Platform Event** handling and **retry mechanisms**",
        "**Event Cache** processing and **state transitions**",
        "`Workspace__c` creation and updates",
        "`Lead`/`Account` **linking flows**",
        "**Error handling** and **recovery**"
      ]
    },
    {
      icon: faGears,
      title: "System Testing",
      description: "End-to-end validation of system behavior",
      items: [
        "**Out-of-order** event processing",
        "**Concurrent** event handling",
        "**Data validation** rules",
        "**Field-level security**",
        "**Error logging** and **monitoring**"
      ]
    },
    {
      icon: faChartLine,
      title: "Performance Testing",
      description: "Validation of system performance under load",
      items: [
        "**High-volume** event processing",
        "**Concurrent** user operations",
        "**Response time** monitoring",
        "**Resource utilization**",
        "**Scalability** validation"
      ]
    },
    {
      icon: faUserCheck,
      title: "User Acceptance",
      description: "Validation with real users and scenarios",
      items: [
        "**Sales team** workflow testing",
        "**Dashboard** functionality",
        "**Notification** systems",
        "**Report** generation",
        "**User interface** feedback"
      ]
    }
  ];

  const rolloutSteps = [
    {
      icon: faVial,
      title: "Sandbox Validation",
      description: "Final validation in **production-like** environment",
      details: [
        "**End-to-end** testing",
        "**Data migration** validation",
        "**Integration** verification",
        "**Performance** benchmarking"
      ]
    },
    {
      icon: faShieldAlt,
      title: "Security Review",
      description: "Comprehensive security assessment",
      details: [
        "**Permission sets** validation",
        "**Field-level security** check",
        "**API security** review",
        "**Data privacy** compliance"
      ]
    },
    {
      icon: faRocket,
      title: "Production Deployment",
      description: "Controlled rollout to production",
      details: [
        "**Phased deployment** approach",
        "**Monitoring** setup",
        "**Backup** procedures",
        "**Rollback** plan"
      ]
    }
  ];

  return (
    <section id="testing" className="section">
      <div className="section-content">
        <div className="section-title">
          <span className="section-badge">Quality Assurance</span>
          <h2>Testing & Rollout Strategy</h2>
          <p className="title-description">
            Ensuring <strong>reliability</strong> through <strong>comprehensive testing</strong> and <strong>controlled deployment</strong>
          </p>
          <div className="title-underline"></div>
        </div>

        <div className="testing-phases">
          <h3>Testing Approach</h3>
          <div className="phases-grid">
            {testingPhases.map((phase, index) => (
              <div key={index} className="phase-card">
                <FontAwesomeIcon icon={phase.icon} className="phase-icon" />
                <h4>{phase.title}</h4>
                <p className="phase-description">{phase.description}</p>
                <ul className="phase-items">
                  {phase.items.map((item, idx) => (
                    <li key={idx} dangerouslySetInnerHTML={{ 
                      __html: item
                        .replace(/`([^`]+)`/g, '<code>$1</code>')
                        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                    }} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rollout-steps">
          <h3>Deployment Strategy</h3>
          <div className="steps-timeline">
            {rolloutSteps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-header">
                  <FontAwesomeIcon icon={step.icon} className="step-icon" />
                  <div className="step-title">
                    <h4>{step.title}</h4>
                    <p dangerouslySetInnerHTML={{ 
                      __html: step.description.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                    }} />
                  </div>
                </div>
                <ul className="step-details">
                  {step.details.map((detail, idx) => (
                    <li key={idx} dangerouslySetInnerHTML={{ 
                      __html: detail.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                    }} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="testing-note">
          <h4>Commitment to Quality</h4>
          <p>
            Every aspect of the system undergoes <strong>rigorous testing</strong> to ensure <strong>reliability</strong>, 
            <strong>performance</strong>, and <strong>security</strong>. Our <strong>phased deployment</strong> approach minimizes risk and 
            ensures a <strong>smooth transition</strong> to production. Touchdown!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testing; 