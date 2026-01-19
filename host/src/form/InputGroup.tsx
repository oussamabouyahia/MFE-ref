import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputGroupProps {
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  registration: UseFormRegisterReturn; // The magic prop from RHF
}

export const InputGroup = ({
  label,
  type = "text",
  error,
  registration,
  placeholder,
}: InputGroupProps) => {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`border p-2 rounded transition-colors ${
          error
            ? "border-red-500 bg-red-50"
            : "border-gray-300 focus:border-blue-500"
        }`}
        // Spread the RHF props (onChange, onBlur, name, ref)
        {...registration}
      />
      {/* Accessibility: Only render error if it exists */}
      {error && (
        <span className="text-xs text-red-500 font-medium" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
