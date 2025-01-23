import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faServer,
  faBolt,
  faRotateRight,
  faRandom,
  faShieldHalved,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import eventCacheProcessing from '../../images/event-cache-processing.png';

const Integration = () => {
  const approaches = [
    {
      title: "Custom REST APIs",
      icon: faServer,
      pros: [
        "**Direct control** over data flow",
        "**Synchronous** responses",
        "**Familiar** REST patterns"
      ],
      cons: [
        "No built-in **retry mechanism**",
        "**Complex error handling**",
        "**Manual state tracking**",
        "**Higher maintenance** overhead"
      ]
    },
    {
      title: "Platform Events",
      icon: faBolt,
      pros: [
        "**Native event replay** capability",
        "**Built-in retry** mechanisms",
        "**Automatic state tracking**",
        "**Scalable** event processing",
        "**Asynchronous** by design"
      ],
      cons: [
        "Requires **event monitoring**",
        "**Initial setup** complexity"
      ]
    }
  ];

  const features = [
    {
      title: "Event Replay",
      icon: faRotateRight,
      description: "**Automatic recovery** from failures by replaying events from the last **successful state**. Ensures **no data loss** during system interruptions."
    },
    {
      title: "Out-of-Order Processing",
      icon: faRandom,
      description: "**Intelligent handling** of events arriving in different order. The **Event Cache** system maintains **data consistency** regardless of arrival sequence."
    },
    {
      title: "Fault Tolerance",
      icon: faShieldHalved,
      description: "**Built-in resilience** against system failures. **Automatic retries** and **state preservation** ensure reliable event processing."
    },
    {
      title: "Scalability",
      icon: faChartLine,
      description: "**Elastic scaling** to handle varying event volumes. **Efficient processing** of both **high-volume** and **sporadic** events."
    }
  ];

  return (
    <section id="integration" className="section">
      <div className="section-content">
        <div className="section-title">
          <span className="section-badge">Integration Architecture</span>
          <h2>Platform Events vs Custom APIs</h2>
          <p className="title-description">
            Why we chose <strong>Platform Events</strong> for robust and <strong>scalable integration</strong>
          </p>
          <div className="title-underline"></div>
        </div>

        <div className="approaches-comparison">
          {approaches.map((approach, index) => (
            <div key={index} className="approach-card">
              <div className="approach-header">
                <FontAwesomeIcon icon={approach.icon} className="approach-icon" />
                <h3>{approach.title}</h3>
              </div>
              <div className="pros-cons">
                <h4>Advantages</h4>
                <ul>
                  {approach.pros.map((pro, idx) => (
                    <li key={idx} className="pro" dangerouslySetInnerHTML={{ 
                      __html: pro.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                    }} />
                  ))}
                </ul>
                <h4>Limitations</h4>
                <ul>
                  {approach.cons.map((con, idx) => (
                    <li key={idx} className="con" dangerouslySetInnerHTML={{ 
                      __html: con.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                    }} />
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="key-features">
          <h3>Key Capabilities</h3>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <FontAwesomeIcon icon={feature.icon} className="feature-icon" />
                <h4>{feature.title}</h4>
                <p dangerouslySetInnerHTML={{ 
                  __html: feature.description.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                }} />
              </div>
            ))}
          </div>
        </div>

        <div className="event-cache-explanation">
          <h3>Event Cache System</h3>
          <p>
            The <code>Event_Cache__c</code> object acts as a persistent store for all platform events, ensuring that we maintain a complete history of customer interactions. When events like <code>Trial Started</code> or <code>Payment Received</code> are processed, they are stored in this cache, allowing us to track the customer's journey and handle any processing delays or failures.
          </p>
          <p>
            For example, if a <code>Payment Received</code> event arrives before a <code>Trial Started</code> event (out of order), our system can handle this gracefully by caching both events and processing them in the correct sequence, ensuring data consistency.
          </p>
        </div>

        <div className="integration-flows">
          <div className="flow-section">
            <h3>Event Processing Flow</h3>
            <p className="flow-description">
              How our system processes events and maintains order
            </p>
            <img src={eventCacheProcessing} alt="Event Cache Processing Flow" className="flow-image" />
          </div>
        </div>

        <div className="integration-note">
          <h4>Why This Matters</h4>
          <p>
            By leveraging <strong>Platform Events</strong> and our <strong>Event Cache system</strong>, we ensure that your sales team always has <strong>accurate</strong> and <strong>up-to-date</strong> information about customer status, regardless of processing delays or system interruptions. Remember the Packers? We won't make the same mistake. 🏈
          </p>
        </div>
      </div>
    </section>
  );
};

export default Integration; 