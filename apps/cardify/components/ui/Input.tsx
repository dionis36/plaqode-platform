"use client";

import { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  sanitize?: boolean; // XSS prevention
}

export default function Input({
  label,
  error,
  className,
  sanitize = true,
  onChange,
  ...props
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (sanitize) {
      // Basic XSS prevention - remove < and > characters
      e.target.value = e.target.value.replace(/[<>]/g, '');
    }

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {label && <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <input
        className={clsx(
          "border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
        onChange={handleChange}
        {...props}
      />
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
}
