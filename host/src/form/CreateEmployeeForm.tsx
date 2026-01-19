import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema, EmployeeFormValues } from "./employeeSchema";
import { InputGroup } from "../../components/InputGroup";

export const CreateEmployeeForm = () => {
  // 1. Initialize Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }, // "isSubmitting" is automatic!
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema), // Connects Zod to React Hook Form
    defaultValues: {
      isRemote: false, // Always set defaults to avoid "uncontrolled to controlled" warnings
    },
  });

  // 2. The Submit Handler (Only runs if validation passes)
  const onSubmit: SubmitHandler<EmployeeFormValues> = async (data) => {
    try {
      console.log("Submitting:", data);

      // Simulate API Call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("Employee Created!");
      reset(); // Clear form on success
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 border rounded-lg shadow-md max-w-md bg-white"
    >
      <h2 className="text-xl font-bold mb-6">New Resource</h2>

      {/* REUSABLE INPUTS */}
      <InputGroup
        label="First Name"
        error={errors.firstName?.message}
        registration={register("firstName")}
      />

      <InputGroup
        label="Email"
        type="email"
        error={errors.email?.message}
        registration={register("email")}
      />

      <InputGroup
        label="Weekly Capacity (Hours)"
        type="number"
        error={errors.capacityHours?.message}
        registration={register("capacityHours")}
      />

      {/* SELECT (Manual Handling example) */}
      <div className="flex flex-col gap-1 mb-6">
        <label className="text-sm font-semibold text-gray-700">Role</label>
        <select
          {...register("role")}
          className="border p-2 rounded border-gray-300"
        >
          <option value="">Select a role...</option>
          <option value="developer">Developer</option>
          <option value="manager">Manager</option>
          <option value="designer">Designer</option>
        </select>
        {errors.role && (
          <span className="text-xs text-red-500">{errors.role.message}</span>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center"
      >
        {isSubmitting ? (
          <span>Loading...</span> // In real interview, use a Spinner component
        ) : (
          "Create Employee"
        )}
      </button>
    </form>
  );
};
