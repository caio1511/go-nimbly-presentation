import React from 'react';
import '../../styles/Layout.css';

const Layout = ({ children, sections, activeSection }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="layout">
      <header className="header">
        <nav className="nav-links">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => scrollToSection(section.id)}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </header>

      <main className="main-content">
        {children}
      </main>

      <div className="hire-footer">
        <div className="hire-message">
          <span className="emoji">🚀</span>
          <span className="message">Psst... Go Nimbly, you know you want to hire Caio</span>
          <span className="emoji">✨</span>
        </div>
      </div>
    </div>
  );
};

export default Layout; 