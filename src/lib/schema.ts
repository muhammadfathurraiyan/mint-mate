import { z } from "zod";

export const FormSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be no more than 50 characters"),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(100, "Description must be no more than 100 characters"),
  image: z.any().refine((file) => file !== null, "Image not found"),
});
