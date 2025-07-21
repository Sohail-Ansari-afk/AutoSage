
import React from 'react';
import { CarIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center">
      <div className="flex items-center justify-center gap-4">
        <CarIcon className="w-16 h-16 text-cyan-400" />
        <div>
           <h1 className="text-5xl font-extrabold tracking-tight text-white">
            Auto<span className="text-cyan-400">Sage</span>
          </h1>
          <p className="text-slate-400 mt-1">Your AI Vehicle Expert</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
