// src/components/ui/cards/StatsCard.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StatsCard = ({ icon, title, value, text, color }) => {
  return (
    <div className="stats-card">
      <div className={`stats-icon ${color}`}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="stats-info">
        <h3>{title}</h3>
        <p className="stats-number">{value}</p>
        <p className="stats-text">{text}</p>
      </div>
    </div>
  );
};

export default StatsCard;