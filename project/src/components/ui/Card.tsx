import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = 'md',
  border = true,
  shadow = 'md' 
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7'
  };

  const shadowStyles = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg'
  };

  return (
    <div className={`
      bg-white rounded-lg
      ${border ? 'border border-gray-200' : ''}
      ${paddingStyles[padding]}
      ${shadowStyles[shadow]}
      ${className}
    `}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`mb-4 pb-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

export const CardTitle: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-gray-800 ${className}`}>
    {children}
  </h3>
);

export const CardContent: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>
    {children}
  </div>
);

export default Card;