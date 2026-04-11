"use client";

import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";
import styles from "./Button.module.css";

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'social';

interface CommonProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; isExternal?: boolean };

export default function Button(props: ButtonProps | LinkProps) {
  const { 
    variant = 'primary', 
    children, 
    className = '', 
  } = props;

  const btnClasses = [
    styles.btn || 'btn',
    styles[variant] || variant,
    className
  ].join(' ');

  if ('href' in props) {
    const { isExternal, href, ...linkRest } = props as LinkProps;
    
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

  const { ...buttonRest } = props as ButtonProps;
  return (
    <button className={btnClasses} {...buttonRest}>
      {children}
    </button>
  );
}
