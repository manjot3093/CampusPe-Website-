'use client';

import React, { useRef, useState } from 'react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  magnetic?: boolean;
}

export default function MagneticButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  magnetic = true,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Magnetic pull factor (clamped for subtlety)
    const deltaX = (clientX - centerX) * 0.28;
    const deltaY = (clientY - centerY) * 0.28;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-sans uppercase font-bold tracking-[0.14em] transition-all duration-300 ease-out select-none active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-electric group';

  const sizeStyles = {
    sm: 'text-[10px] px-4 py-2.5 rounded-full',
    md: 'text-[11px] px-6 py-3.5 rounded-full',
    lg: 'text-[12px] px-8 py-4 rounded-full',
  };

  const variantStyles = {
    primary:
      'bg-ink text-paper hover:bg-electric hover:text-white shadow-[0_10px_25px_rgba(7,9,14,0.12)] hover:shadow-[0_16px_36px_rgba(0,98,255,0.28)] border border-transparent',
    secondary:
      'bg-white text-ink hover:text-electric border border-paper-border hover:border-electric/30 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,98,255,0.08)]',
    ghost:
      'bg-transparent text-ink/75 hover:text-ink hover:bg-paper-tint/60 border border-transparent',
    dark:
      'bg-white text-ink hover:bg-electric hover:text-white border border-white/20 shadow-[0_8px_30px_rgba(255,255,255,0.08)]',
    outline:
      'bg-transparent text-white border border-white/25 hover:border-white hover:bg-white/10',
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 ? 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
      }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
