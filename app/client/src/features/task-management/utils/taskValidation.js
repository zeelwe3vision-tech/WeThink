import { z } from "zod";

export const taskSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Task title must contain at least 3 characters")
      .max(100, "Task title cannot exceed 100 characters"),
    description: z
      .string()
      .trim()
      .min(10, "Description must contain at least 10 characters")
      .max(2000, "Description cannot exceed 2000 characters"),
    project: z.string().trim().min(1, "Project is required"),
    module: z.string().trim().min(1, "Module is required"),
    priority: z.enum(["Low", "Medium", "High", "Critical"], {
      message: "Please select a valid priority",
    }),
    status: z.enum(["To Do", "In Progress", "Review", "Completed"], {
      message: "Please select a valid status",
    }),
    startDate: z.string().min(1, "Starting date is required"),
    dueDate: z.string().min(1, "Due date is required"),
    dependency: z.string().optional(),
    attachment: z.any().nullable().optional(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.dueDate) return true;
      return new Date(data.dueDate) >= new Date(data.startDate);
    },
    {
      message: "Due date cannot be earlier than starting date",
      path: ["dueDate"],
    },
  );

export const validateTask = (taskData) => {
  const result = taskSchema.safeParse(taskData);

  if (result.success) {
    return {};
  }

  const errors = {};

  result.error.issues.forEach((issue) => {
    const field = issue.path[0];

    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  });

  return errors;
};

export const defaultTaskValues = {
  title: "",
  description: "",
  project: "",
  module: "",
  priority: "Medium",
  status: "To Do",
  startDate: "",
  dueDate: "",
  dependency: "",
  attachment: null,
};

export const PRIORITY_OPTIONS = ["Low", "Medium", "High", "Critical"];

export const STATUS_OPTIONS = ["To Do", "In Progress", "Review", "Completed"];
