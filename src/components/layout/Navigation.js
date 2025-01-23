import React, { useState, useEffect } from 'react';
import '../../styles/Navigation.css';

const Navigation = ({ sections, activeSection, onSectionChange }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navigation ${isSticky ? 'sticky' : ''}`}>
      <div className="nav-content">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => onSectionChange(section.id)}
          >
            {section.title}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation; 