import React from 'react';
import { useNavigate } from 'react-router-dom';

const DomainsPage = () => {
  const navigate = useNavigate();

  const domains = [
    { id: 'ai-ml', name: 'AI/ML' },
    { id: 'web-dev', name: 'Web Dev' },
    { id: 'cyber-security', name: 'Cyber Security' },
    { id: 'game-dev', name: 'Game Dev' },
    { id: 'devops', name: 'DevOps' },
    { id: 'dsa', name: 'DSA' },
  ];

  const pageStyle = {
    backgroundColor: '#121212',
    color: '#ffffff',
    minHeight: '100vh',
    padding: '2rem',
    fontFamily: 'sans-serif'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '2rem'
  };

  const cardStyle = {
    backgroundColor: '#1e1e1e',
    padding: '2rem',
    borderRadius: '10px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'background-color 0.2s, transform 0.2s',
    border: '1px solid #333'
  };

  return (
    <div style={pageStyle}>
      <h1 style={{ textAlign: 'center' }}>Explore Domains</h1>
      <div style={gridStyle}>
        {domains.map(domain => (
          <div
            key={domain.id}
            style={cardStyle}
            onClick={() => navigate(`/community/${domain.id}`)}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2a2a2a'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1e1e1e'}
          >
            <h2>{domain.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DomainsPage;
