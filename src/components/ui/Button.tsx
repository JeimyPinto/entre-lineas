"use client";

import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";
import styles from "./Button.module.css";

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'social' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; isExternal?: boolean };

export default function Button(props: ButtonProps | LinkProps) {
  const { 
    variant = 'primary', 
    size = 'medium',
    children, 
    className = '',
    fullWidth = false,
  } = props;

  const btnClasses = [
    styles.btn || 'btn',
    styles[variant] || variant,
    styles[size] || size,
    fullWidth ? styles.fullWidth : '',
    className
  ].join(' ');

  if ('href' in props) {
    const { isExternal, href, fullWidth: _, size: _s, variant: _v, ...linkRest } = props as LinkProps;
    
    if (isExternal || href.startsWith('http')) {
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={btnClasses} 
          {...linkRest}
        >
          {children}
        </a>
      );
    }
    
    return (
      <Link href={href} className={btnClasses} {...linkRest}>
        {children}
      </Link>
    );
  }

  const { fullWidth: _, ...buttonRest } = props as ButtonProps;
  return (
    <button className={btnClasses} {...buttonRest}>
      {children}
    </button>
  );
}
