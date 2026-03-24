import React from 'react';

type ButtonVariant = 'primary' | 'secondary';
type ButtonType = 'submit' | 'reset' | 'button';

interface ButtonProps {
  text: string;
  variant?: ButtonVariant;
  type: ButtonType;
  disabled?: boolean;
}

export default function Button({ text, variant, type, disabled }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="px-6 py-3.5 bg-accent w-full md:w-auto font-mono uppercase text-sm text-bg font-semibold"
    >
      {text}
    </button>
  );
}
