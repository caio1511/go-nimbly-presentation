import React from 'react';
import '../../styles/sections.css';
import frustratedRep from '../../images/frustrated-rep.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine,
  faTriangleExclamation,
  faGears,
  faUserClock,
  faCloud,
  faDatabase
} from '@fortawesome/free-solid-svg-icons';

const ProblemStatement = () => {
  const problems = [
    {
      title: "Manual Lead Processing",
      icon: faUserClock,
      description: "Sales team spends excessive time on **manual data entry** and **lead qualification**",
      impact: "Delays in **customer engagement** and reduced **sales efficiency**"
    },
    {
      title: "Data Synchronization",
      icon: faGears,
      description: "**Inconsistent data** between self-service platform and **Salesforce** due to **timing issues**",
      impact: "**Lost opportunities** and **customer confusion** due to outdated information"
    },
    {
      title: "Process Reliability",
      icon: faTriangleExclamation,
      description: "**System outages** and **network issues** cause **data loss** and **processing delays**",
      impact: "**Missed conversions** and **revenue impact** from processing failures"
    },
    {
      title: "Scalability Concerns",
      icon: faChartLine,
      description: "Current process cannot handle **increasing volume** of self-service customers",
      impact: "**Growing backlog** and **delayed responses** to qualified leads"
    }
  ];

  const currentStack = [
    {
      name: "Marketo",
      role: "**Marketing Automation** for lead creation",
      icon: faChartLine
    },
    {
      name: "Salesforce",
      role: "**CRM** for customer records",
      icon: faCloud
    },
    {
      name: "Salesforce CPQ",
      role: "**Quotes and orders** management",
      icon: faGears
    },
    {
      name: "Stripe",
      role: "**Billing** management system",
      icon: faUserClock
    },
    {
      name: "Snowflake",
      role: "**Data warehouse** for analytics",
      icon: faDatabase
    }
  ];

  return (
    <section id="problem" className="section">
      <div className="section-content">
        <div className="section-title">
          <span className="section-badge">The Challenge</span>
          <h2>Current State & Problems</h2>
          <p className="title-description">
            Understanding the <strong>critical issues</strong> in the current <strong>lead management process</strong>
          </p>
          <div className="title-underline"></div>
        </div>

        <div className="problem-statement">
          <h2>The Problem</h2>
          <p>
            A mid-market SaaS company ($200M ARR) wants to enable their 150 sales reps to prospect and upgrade self-serve customers. However, they face two critical challenges:
          </p>
          <div className="challenges">
            <div className="challenge">
              <h3>1. Data Connectivity Gap</h3>
              <p>
                Self-serve customers lack consistent representation in Salesforce, with no automated ETL process between systems. When customers sign up through the website, their data remains isolated in the product database, creating a disconnect between customer actions (trials, conversions, churn) and Salesforce records (leads, accounts, contacts). This fragmented data architecture prevents sales reps from having a complete view of customer status and history.
              </p>
            </div>
            <div className="challenge">
              <h3>2. Manual Process Burden</h3>
              <p>
                Sales reps spend valuable selling time on administrative tasks instead of customer engagement. They must manually search through the product UI to identify self-serve customers, determine their current status (trial/paid/churned), and create corresponding records in Salesforce. With self-serve customers representing 50% of the $200M ARR, this manual data entry process significantly reduces the team's capacity to identify and act on upgrade opportunities.
              </p>
            </div>
          </div>
        </div>
        
        <div className="problem-note">
          <p>
            These challenges manifest in four critical areas that impact both the sales team's effectiveness and the overall customer experience:
          </p>
        </div>

        <div className="problem-grid">
          {problems.map((problem, index) => (
            <div key={index} className="problem-card">
              <FontAwesomeIcon icon={problem.icon} className="card-icon" />
              <h3>{problem.title}</h3>
              <p dangerouslySetInnerHTML={{ 
                __html: problem.description.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
              }} />
              <div className="impact">
                <strong>Impact:</strong> <span dangerouslySetInnerHTML={{ 
                  __html: problem.impact.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                }} />
              </div>
            </div>
          ))}
        </div>

        <div className="current-stack">
          <h3>Current Technical Stack</h3>
          <div className="stack-items">
            {currentStack.map((item, index) => (
              <div key={index} className="stack-item">
                <FontAwesomeIcon icon={item.icon} className="stack-icon" />
                <div className="stack-name">{item.name}</div>
                <div className="stack-role" dangerouslySetInnerHTML={{ 
                  __html: item.role.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                }} />
              </div>
            ))}
          </div>
        </div>

        <div className="pain-point">
          <img src={frustratedRep} alt="Frustrated Sales Rep" className="pain-point-image" />
          <div className="pain-point-text">
            <h3>Current Sales Rep Experience</h3>
            <p>Sales representatives are struggling to effectively manage self-serve customers, leading to:</p>
            <ul>
              <li>Missed upsell opportunities</li>
              <li>Delayed responses to customer needs</li>
              <li>Inefficient time management</li>
              <li>Decreased team morale</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement; 