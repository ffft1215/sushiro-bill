import React from 'react';

const Footer: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex gap-[10px] items-center font-ibm-thai text-dark-white text-[20px] text-center whitespace-nowrap ${className}`}>
      <span>© 2026</span>
      <a
        href="https://www.linkedin.com/in/fataepa/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-solid cursor-pointer hover:text-white transition-colors"
      >
        Fa Tae
      </a>
    </div>
  );
};

export default Footer;