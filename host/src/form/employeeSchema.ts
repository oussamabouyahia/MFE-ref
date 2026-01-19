import { z } from "zod";

// 1. Define the Validation Rules (The "Business Logic")
export const employeeSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["developer", "manager", "designer"], {
    errorMap: () => ({ message: "Please select a valid role" }),
  }),
  // Handling Numbers: HTML inputs return strings, so we coerce them
  capacityHours: z.coerce
    .number()
    .min(1, "Capacity must be at least 1 hour")
    .max(40, "Capacity cannot exceed 40 hours"),
  isRemote: z.boolean().optional(),
});

// 2. Derive the Type from the Schema (The "Single Source of Truth")
// No need to manually write interface EmployeeFormValues { ... }
export type EmployeeFormValues = z.infer<typeof employeeSchema>;
