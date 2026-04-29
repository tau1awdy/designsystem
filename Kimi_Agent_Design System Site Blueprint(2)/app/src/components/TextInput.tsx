import { useState, type InputHTMLAttributes } from 'react';

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string;
  className?: string;
}

export function TextInput({ label, className = '', ...props }: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [, setHasValue] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label
          className="block font-mono-jet text-xs mb-2 transition-all duration-200"
          style={{
            color: isFocused ? 'var(--text-accent)' : 'var(--text-secondary)',
            transform: isFocused ? 'translateY(-2px)' : 'translateY(0)',
          }}
        >
          {label}
        </label>
      )}
      <input
        {...props}
        className="w-full text-base transition-all duration-200 outline-none"
        style={{
          backgroundColor: 'var(--bg-sidebar)',
          border: `1px solid ${isFocused ? 'var(--accent)' : 'var(--border-subtle)'}`,
          borderRadius: '4px',
          height: '44px',
          padding: '0 16px',
          color: 'var(--text-primary)',
          fontFamily: "'Manrope', sans-serif",
          fontSize: '15px',
          boxShadow: isFocused ? '0 0 0 3px rgba(45,98,255,0.15)' : 'none',
        }}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
          props.onBlur?.(e);
        }}
        onChange={(e) => {
          setHasValue(e.target.value.length > 0);
          props.onChange?.(e);
        }}
      />
    </div>
  );
}
