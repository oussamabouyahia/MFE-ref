import React from "react";

interface TagProps {
  label: string;
  variant: "primary" | "secondary";
}

export function Tag({ label, variant = "primary" }: TagProps) {
  return (
    <div>
      <p
        className={
          variant === "primary"
            ? "bg-blue-500 text-white"
            : "bg-gray-500 text-white"
        }
      >
        {label}
      </p>
    </div>
  );
}
