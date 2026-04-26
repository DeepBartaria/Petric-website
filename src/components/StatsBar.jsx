import React, { useState, useEffect } from 'react';
import statsbg from '../assets/statbg.png';
import clinic from '../assets/clinics.png';
import vet from '../assets/vets.png';
import experience from '../assets/experience.png';
import grooming from '../assets/grooming.png';

const Counter = ({ target, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };

    animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
};

const StatsBar = () => {
  const stats = [
    { icon: experience, count: 1800, suffix: '+', label: 'Pet Products' },
    { icon: clinic, count: 200, suffix: '+', label: 'Pet Brands' },
    { icon: vet, count: 1, suffix: 'K+', label: 'App Downloads' }
  ];

  return (
    <div className="flex flex-wrap justify-center md:justify-evenly gap-6 py-6 px-4 text-white z-10 bg-cover" style={{ backgroundImage: `url(${statsbg})` }}>
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-row gap-3 items-center">
          <img src={stat.icon} alt={stat.label} className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 object-contain" />
          <div className="flex flex-col items-start">
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold">
              <Counter target={stat.count} suffix={stat.suffix} />
            </span>
            <span className="text-xs sm:text-sm lg:text-base mt-1 text-left">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;