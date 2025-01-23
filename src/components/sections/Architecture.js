import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBolt,
  faDatabase,
  faGears,
  faTriangleExclamation,
  faCircleCheck
} from '@fortawesome/free-solid-svg-icons';
import systemArchitecture from '../../images/system-architecture.png';
import sequenceDiagram from '../../images/sequence-diagram.png';
import errorHandlingFlow from '../../images/error-handling-flow.png';

const Architecture = () => {
  const components = [
    {
      icon: faBolt,
      title: "Platform Events Handler",
      description: "Core component for **event processing** and **state management**",
      details: [
        "**Real-time** event capture",
        "**Automatic retries** on failure",
        "**Event validation** and filtering",
        "**Error logging** and monitoring"
      ]
    },
    {
      icon: faDatabase,
      title: "Event Cache System",
      description: "**Intelligent caching** for reliable event processing",
      details: [
        "**State tracking** and validation",
        "**Out-of-order** event handling",
        "**Dependency management**",
        "**Automatic recovery**"
      ]
    },
    {
      icon: faGears,
      title: "Record Management Engine",
      description: "**Automated workflow** for lead and customer data",
      details: [
        "**Smart record creation** and updates",
        "**Duplicate prevention**",
        "**Data validation** rules",
        "**Audit trail** maintenance"
      ]
    },
    {
      icon: faTriangleExclamation,
      title: "Sync Manager",
      description: "**Bi-directional synchronization** of customer data",
      details: [
        "**Real-time updates** to Salesforce",
        "**Conflict resolution**",
        "**Data consistency** checks",
        "**Change tracking**"
      ]
    },
    {
      icon: faCircleCheck,
      title: "Error Management System",
      description: "**Comprehensive error handling** and recovery",
      details: [
        "**Automated recovery** procedures",
        "**Error classification** and routing",
        "**Alert notifications**",
        "**Resolution tracking**"
      ]
    }
  ];

  return (
    <section id="architecture" className="section">
      <div className="section-content">
        <div className="section-title">
          <span className="section-badge">System Design</span>
          <h2>Architecture Components</h2>
          <p className="title-description">
            A <strong>resilient</strong> and <strong>scalable</strong> system designed for <strong>reliability</strong>
          </p>
          <div className="title-underline"></div>
        </div>

        <div className="architecture-overview">
          <p>
            Our solution leverages <strong>Salesforce Platform Events</strong> as the backbone for a <strong>fault-tolerant integration</strong>. 
            The architecture implements an <strong>event-driven system</strong> with a custom <strong>Event Cache</strong> mechanism, ensuring 
            reliable processing even during system interruptions. This approach allows for <strong>automatic record creation</strong> and linking 
            between <code>Workspace</code>, <code>Lead</code>, and <code>Account</code> objects, while maintaining data consistency through 
            intelligent <strong>out-of-order event handling</strong>. The system is designed to scale seamlessly with increasing self-service 
            customer volume while providing real-time visibility through comprehensive dashboards and notifications.
          </p>
        </div>

        <div className="detail-section">
          <h3>High-Level System Architecture</h3>
          <p className="detail-description">
            A robust architecture designed for real-time processing and fault tolerance
          </p>
          <img src={systemArchitecture} alt="System Architecture Diagram" className="detail-image" />
        </div>

        <div className="architecture-components">
          {components.map((component, index) => (
            <div key={index} className="component-card">
              <div className="component-header">
                <FontAwesomeIcon icon={component.icon} className="component-icon" />
                <h3>{component.title}</h3>
              </div>
              <p className="component-description" dangerouslySetInnerHTML={{ 
                __html: component.description.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
              }} />
              <ul className="component-details">
                {component.details.map((detail, idx) => (
                  <li key={idx} dangerouslySetInnerHTML={{ 
                    __html: detail.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                  }} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="architecture-flows">
          <div className="flow-section">
            <h3>Event Processing Flow</h3>
            <p className="flow-description">
              Efficient event processing ensuring data consistency and real-time updates
            </p>
            <img src={sequenceDiagram} alt="Event Processing Flow" className="flow-image" />
          </div>

          <div className="flow-section">
            <h3>Error Handling Strategy</h3>
            <p className="flow-description">
              Comprehensive error handling and recovery process
            </p>
            <img src={errorHandlingFlow} alt="Error Handling Flow" className="flow-image" />
          </div>
        </div>

        <div className="architecture-note">
          <h4>Fault Tolerance</h4>
          <p>
            Our architecture is designed with <strong>multiple layers of redundancy</strong> and <strong>error handling</strong>. 
            The system can <strong>automatically recover</strong> from failures, ensuring that your sales team never misses 
            an opportunity due to technical issues. Remember the Packers? We won't make the same mistake. 🏈
          </p>
        </div>
      </div>
    </section>
  );
};

export default Architecture; 