import React, { useState } from 'react';
import '../../styles/sections.css';

const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const architecturalQuestions = [
    {
      id: "arch1",
      question: "How does the solution ensure near-real-time updates from the provisioning system?",
      answer: "The solution uses Salesforce Platform Events for real-time event processing. As shown in the Architecture section, events are immediately published when status changes occur, and our Event Cache system ensures reliable delivery and processing."
    },
    {
      id: "arch2",
      question: "What happens if the provisioning system sends incomplete or malformed data?",
      answer: "The solution includes comprehensive error handling through the Error_Log__c object, as detailed in the Architecture section. Invalid data is logged, administrators are notified, and the system attempts to recover or request retransmission of the data."
    },
    {
      id: "arch3",
      question: "How do we handle event sequencing if events arrive out of order (e.g., Paid event before Trial)?",
      answer: "Our Event Cache system, highlighted in the Integration section, handles out-of-order events by maintaining event sequence information and processing rules. Events are processed in the correct logical order, regardless of arrival time."
    },
    {
      id: "arch4",
      question: "How does the solution prevent duplicate Workspace records?",
      answer: "The system uses unique external IDs and lookup relationships to ensure each Workspace is created only once. The Event Cache system also helps prevent duplicate processing of events."
    },
    {
      id: "arch5",
      question: "What if there's no Lead or Account to associate with a Workspace?",
      answer: "As shown in the Implementation Plan, the system automatically creates necessary records. If no Lead exists, it creates one using the email from the trial event. If no Account exists, it creates one when appropriate based on domain matching."
    },
    {
      id: "arch6",
      question: "How do you ensure lifecycle stages (Trial, Paid, Churned) are accurately reflected?",
      answer: "Platform Events trigger immediate updates to Workspace status. The Event Cache system ensures all status changes are processed in the correct order, maintaining accurate lifecycle stage tracking."
    },
    {
      id: "arch7",
      question: "What happens if Salesforce goes down temporarily?",
      answer: "The Event Cache system, detailed in the Architecture section, stores events until they can be processed. When Salesforce becomes available, the system processes cached events in the correct order."
    },
    {
      id: "arch8",
      question: "How do you handle errors during record creation or updates?",
      answer: "The Error_Log__c system, shown in the Architecture section, captures all errors with full context. It includes retry logic, admin notifications, and a dashboard for monitoring and resolution."
    },
    {
      id: "arch9",
      question: "How are sales reps notified of issues with customer data?",
      answer: "The solution includes automated notifications for data issues, trial expirations, and status changes. Sales reps also have access to real-time dashboards showing customer status and any pending issues."
    },
    {
      id: "arch10",
      question: "Can the solution handle high volumes of trial provisioning events?",
      answer: "Yes, the architecture is designed for scalability. Platform Events handle high volumes efficiently, and the Event Cache system ensures reliable processing even during peak loads."
    },
    {
      id: "arch11",
      question: "What measures are in place to optimize Flow and Trigger performance?",
      answer: "The solution uses Platform Events and bulkified processes to handle multiple records efficiently. The Event Cache system also helps manage processing loads and prevent performance issues."
    },
    {
      id: "arch12",
      question: "How do sales reps track self-serve customers by lifecycle stage?",
      answer: "The Solution section shows custom dashboards and reports that provide real-time visibility into customer lifecycle stages, including trial status, usage metrics, and conversion indicators."
    },
    {
      id: "arch13",
      question: "How do admins monitor errors and system performance?",
      answer: "Admins have access to the Error Monitoring Dashboard, which shows error logs, retry counts, and system health metrics. This is detailed in the Architecture section under Error Management."
    },
    {
      id: "arch14",
      question: "How do you ensure data security in the integration?",
      answer: "The solution follows Salesforce security best practices, including field-level security, sharing rules, and encrypted communications. All integrations use secure API endpoints and proper authentication."
    },
    {
      id: "arch15",
      question: "Who has access to the Error Log and dashboards?",
      answer: "Access is controlled through Salesforce permissions. Admins have full access to Error Logs and monitoring tools, while sales reps have access to relevant dashboards for customer tracking."
    },
    {
      id: "arch16",
      question: "How will the solution be tested before deployment?",
      answer: "The Implementation Plan includes comprehensive testing phases covering unit tests, integration tests, and user acceptance testing. We also plan a phased rollout to minimize risks."
    },
    {
      id: "arch17",
      question: "What's the fallback plan if the rollout encounters issues?",
      answer: "The solution includes rollback procedures and the Event Cache system ensures no data is lost. The Error Management System helps quickly identify and resolve any issues during rollout."
    }
  ];

  const stakeholderQuestions = [
    {
      id: "stake1",
      question: "What does Marketo do in this process? How is it different from the Workspace integration?",
      answer: "As shown in the Current Go-To-Market Stack section, Marketo handles initial lead creation from marketing activities, while the Workspace integration manages the product trial and usage data. They work together to provide a complete view of the customer journey."
    },
    {
      id: "stake2",
      question: "Why do we need both Marketo and the Workspace integration to create Leads? Isn't that redundant?",
      answer: "No, it's not redundant. Marketo creates leads from marketing activities (like form fills), while the Workspace integration creates or updates leads based on actual product usage. This ensures we capture both marketing and product engagement."
    },
    {
      id: "stake3",
      question: "What happens if a Lead isn't created by Marketo?",
      answer: "The Workspace integration automatically creates a Lead if one doesn't exist, using the email from the trial event. This ensures no self-serve customers are missed, as shown in the Implementation Plan."
    },
    {
      id: "stake4",
      question: "How does Salesforce know when a customer moves from trial to paid or churns?",
      answer: "The system receives real-time Platform Events for all status changes (trial, paid, churned). These events trigger immediate updates in Salesforce, as detailed in the Event Processing Sequence section."
    },
    {
      id: "stake5",
      question: "What's the difference between a Workspace and a Lead?",
      answer: "A Workspace represents the customer's product instance, while a Lead represents the potential customer in Salesforce. The solution automatically links these together to provide a complete view of the customer."
    },
    {
      id: "stake6",
      question: "How will this help sales reps prospect self-serve customers?",
      answer: "The solution provides real-time dashboards showing trial status, usage metrics, and conversion indicators. Sales reps can easily identify and prioritize high-potential trials, as shown in the Solution section."
    },
    {
      id: "stake7",
      question: "What happens if something goes wrong, like missing or incorrect data?",
      answer: "The Error Management System automatically logs issues, attempts to resolve them, and notifies relevant team members. Admins can track and resolve issues through the Error Monitoring Dashboard."
    },
    {
      id: "stake8",
      question: "How do we know if the system is working as expected?",
      answer: "The solution includes comprehensive monitoring through dashboards showing system health, error logs, and KPIs. Regular reports track key metrics like trial conversion rates and data accuracy."
    },
    {
      id: "stake9",
      question: "Why do we need dashboards for sales reps? Can't they just look at the data in Salesforce?",
      answer: "The custom dashboards provide a unified view of customer lifecycle, trial status, and usage metrics in an easy-to-use format. This saves time and helps reps focus on the most promising opportunities."
    },
    {
      id: "stake10",
      question: "How does this solution help us make better decisions?",
      answer: "The solution provides real-time visibility into customer behavior, trial conversion rates, and usage patterns. This data helps sales teams prioritize effectively and enables data-driven decisions about customer engagement."
    }
  ];

  const toggleQuestion = (questionId) => {
    setActiveQuestion(activeQuestion === questionId ? null : questionId);
  };

  return (
    <section id="faq" className="section">
      <div className="section-content">
        <div className="section-title">
          <span className="section-badge">FAQ</span>
          <h2>Frequently Asked Questions</h2>
          <p className="title-description">
            Common questions about the architecture and implementation
          </p>
          <div className="title-underline"></div>
        </div>

        <div className="faq-container">
          <div className="faq-column">
            <h3 className="faq-category">Architectural Questions</h3>
            {architecturalQuestions.map((q) => (
              <div key={q.id} className="faq-item">
                <button
                  className={`faq-question ${activeQuestion === q.id ? "active" : ""}`}
                  onClick={() => toggleQuestion(q.id)}
                >
                  {q.question}
                </button>
                <div className={`faq-answer ${activeQuestion === q.id ? "active" : ""}`}>
                  {q.answer}
                </div>
              </div>
            ))}
          </div>

          <div className="faq-column">
            <h3 className="faq-category">Stakeholder Questions</h3>
            {stakeholderQuestions.map((q) => (
              <div key={q.id} className="faq-item">
                <button
                  className={`faq-question ${activeQuestion === q.id ? "active" : ""}`}
                  onClick={() => toggleQuestion(q.id)}
                >
                  {q.question}
                </button>
                <div className={`faq-answer ${activeQuestion === q.id ? "active" : ""}`}>
                  {q.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="technical-plan-note">
          <p>
            If you've made it this far and want to see a more detailed technical plan,
            check out the complete implementation documentation at{" "}
            <a 
              href="https://caio1511.github.io/go-nimbly-presentation/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              go-nimbly-presentation
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 