import React, { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import ProblemStatement from './components/sections/ProblemStatement';
import Assumptions from './components/sections/Assumptions';
import PackersAnalogy from './components/sections/PackersAnalogy';
import Solution from './components/sections/Solution';
import Architecture from './components/sections/Architecture';
import Implementation from './components/sections/Implementation';
import Integration from './components/sections/Integration';
import Testing from './components/sections/Testing';
import FAQ from './components/sections/FAQ';
import './App.css';

const SECTIONS = [
  { id: 'problem', title: 'Problem Statement' },
  { id: 'assumptions', title: 'Key Assumptions' },
  {
    id: 'packers',
    title: 'The Green Bay Packers Problem',
    description: 'What NFL playoff woes can teach us about system architecture'
  },
  { id: 'solution', title: 'Solution' },
  { id: 'architecture', title: 'Architecture' },
  { id: 'implementation', title: 'Implementation Plan' },
  { id: 'integration', title: 'Integration' },
  { id: 'testing', title: 'Testing & Rollout' },
  { id: 'faq', title: 'FAQ' }
];

const App = () => {
  const [activeSection, setActiveSection] = useState('problem');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section');
      let currentSection = 'problem';
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = section.id;
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout
      sections={SECTIONS}
      activeSection={activeSection}
    >
      <div className="app-content">
        <div className="hero-section">
          <div className="gradient-badge">ARCHITECTURE PROPOSAL</div>
          <h1>
            <span className="title-highlight">Self-Serve Lead</span>
            <br />
            <span className="title-secondary">& Customer Intake</span>
          </h1>
          <p className="subtitle">Seamlessly connecting self-service journeys with your sales process</p>
        </div>
        
        <ProblemStatement />
        <Assumptions />
        <PackersAnalogy />
        <Solution />
        <Architecture />
        <Implementation />
        <Integration />
        <Testing />
        <FAQ />
      </div>
    </Layout>
  );
};

export default App;
