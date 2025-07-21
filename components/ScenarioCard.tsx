
import React from 'react';

interface ScenarioCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ title, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-left hover:border-cyan-500 hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-cyan-500"
    >
      <h3 className="font-bold text-lg text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </button>
  );
};

export default ScenarioCard;
