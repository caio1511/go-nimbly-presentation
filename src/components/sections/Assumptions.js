import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle,
  faServer,
  faShieldAlt,
  faDatabase,
  faUsersCog
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/sections.css';

const Assumptions = () => {
  const assumptions = [
    {
      category: "Salesforce Configuration",
      icon: faServer,
      items: [
        "Workspace custom object is configured",
        "User permissions and sharing rules are set up",
        "Standard objects (Lead, Account, Contact) are configured",
        "Platform Events feature is enabled"
      ]
    },
    {
      category: "Integration Infrastructure",
      icon: faShieldAlt,
      items: [
        "Marketo is connected to Salesforce",
        "Stripe integration exists with provisioning",
        "API limits are sufficient for real-time events",
        "CPQ is configured for self-serve to sales-led conversion"
      ]
    },
    {
      category: "Data Quality",
      icon: faDatabase,
      items: [
        "Email addresses are valid and standardized",
        "Workspace IDs are unique and consistent",
        "Trial duration rules are standardized (30 days)"
      ]
    },
    {
      category: "Business Process",
      icon: faUsersCog,
      items: [
        "Sales territory rules exist",
        "Lead assignment logic is defined",
        "Lead conversion process is documented",
        "SLA requirements for data sync are defined"
      ]
    }
  ];

  return (
    <section id="assumptions" className="section">
      <div className="section-content">
        <div className="section-title">
          <span className="section-badge">Foundation</span>
          <h2>Key Assumptions</h2>
          <p className="title-description">
            Our solution builds upon these existing capabilities and configurations
          </p>
          <div className="title-underline"></div>
        </div>

        <div className="assumptions-grid">
          {assumptions.map((category, idx) => (
            <div key={idx} className="assumption-card">
              <div className="assumption-icon">
                <FontAwesomeIcon icon={category.icon} />
              </div>
              <h3>{category.category}</h3>
              <ul className="assumption-list">
                {category.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="assumptions-note">
          <p>
            <strong>Note:</strong> If any of these assumptions don't align with your current setup, 
            we can adjust our approach accordingly during implementation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Assumptions; 