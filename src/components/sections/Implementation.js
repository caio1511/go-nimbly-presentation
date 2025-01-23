import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRocket,
  faChartLine,
  faTriangleExclamation,
  faGears,
  faLink,
  faShieldAlt,
  faVial,
  faBell
} from '@fortawesome/free-solid-svg-icons';

const Implementation = () => {
  const phases = [
    {
      title: "Quick Wins",
      icon: faRocket,
      steps: [
        {
          name: "Lifecycle Dashboard",
          icon: faChartLine,
          description: "Real-time visibility into customer status (`Trial`/`Paid`/`Churned`)",
          deliverables: [
            "Status tracking dashboard",
            "Trial expiration reports",
            "Conversion pipeline metrics"
          ]
        },
        {
          name: "Trial Expiration Alerts",
          icon: faBell,
          description: "Automated notifications for trials nearing expiration",
          deliverables: [
            "Email notification system",
            "Slack integration",
            "Priority scoring rules"
          ]
        }
      ]
    },
    {
      title: "Technical Foundation",
      icon: faGears,
      steps: [
        {
          name: "Error Tracking System",
          icon: faTriangleExclamation,
          description: "Comprehensive error monitoring and logging infrastructure",
          deliverables: [
            "`Error_Log__c` object",
            "Monitoring dashboard",
            "Alert mechanisms"
          ]
        },
        {
          name: "Event Processing Setup",
          icon: faGears,
          description: "Platform Event configuration and processing framework",
          deliverables: [
            "`SelfServeTrialEvent__e` setup",
            "`Event_Cache__c` system",
            "Processing queues"
          ]
        }
      ]
    },
    {
      title: "Core Integration",
      icon: faLink,
      steps: [
        {
          name: "Record Management",
          icon: faGears,
          description: "Automated record creation and relationship management",
          deliverables: [
            "`Workspace__c` automation",
            "`Lead`/`Account` linking",
            "Field mappings"
          ]
        },
        {
          name: "Data Privacy & Compliance",
          icon: faShieldAlt,
          description: "Implementation of data protection measures",
          deliverables: [
            "Field-level security",
            "Audit trails",
            "Compliance checks"
          ]
        }
      ]
    },
    {
      title: "Testing & Rollout",
      icon: faVial,
      steps: [
        {
          name: "Testing Phase",
          icon: faVial,
          description: "Comprehensive testing and validation",
          deliverables: [
            "Integration tests",
            "Load testing",
            "User acceptance"
          ]
        },
        {
          name: "Phased Deployment",
          icon: faRocket,
          description: "Controlled rollout to production",
          deliverables: [
            "Sandbox validation",
            "Production deployment",
            "Monitoring setup"
          ]
        }
      ]
    }
  ];

  return (
    <section id="implementation" className="section">
      <div className="section-content">
        <div className="section-title">
          <span className="section-badge">The Plan</span>
          <h2>Implementation Roadmap</h2>
          <p className="title-description">
            From quick wins to full deployment
          </p>
          <div className="title-underline"></div>
        </div>

        <div className="implementation-timeline">
          {phases.map((phase, index) => (
            <div key={index} className="phase-container">
              <div className="phase-header">
                <FontAwesomeIcon icon={phase.icon} className="phase-icon" />
                <div className="phase-title">
                  <h3>{phase.title}</h3>
                </div>
              </div>

              <div className="steps-container">
                {phase.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="step-card">
                    <div className="step-header">
                      <FontAwesomeIcon icon={step.icon} className="step-icon" />
                      <h4>{step.name}</h4>
                    </div>
                    <p className="step-description" dangerouslySetInnerHTML={{ __html: step.description.replace(/`([^`]+)`/g, '<code>$1</code>') }} />
                    <ul className="deliverables-list">
                      {step.deliverables.map((deliverable, idx) => (
                        <li key={idx} dangerouslySetInnerHTML={{ __html: deliverable.replace(/`([^`]+)`/g, '<code>$1</code>') }} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="implementation-note">
          <h4>Agile Approach</h4>
          <p>
            Each phase delivers immediate value while building towards the complete solution. 
            Regular checkpoints ensure we can adapt to changing requirements and learnings.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Implementation; 