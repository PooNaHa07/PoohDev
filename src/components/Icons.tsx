import React from "react";
import { Facebook, Mail } from "lucide-react";

export const LineIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.119.303.079.811.038 1.14l-.164 1.028c-.05.303-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.967C23.235 14.35 24 12.43 24 10.304z" />
  </svg>
);

export const FacebookIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <Facebook size={size} className={className} fill="currentColor" stroke="none" />
);

export const GmailIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <Mail size={size} className={className} />
);
