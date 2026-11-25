import { z } from "zod";
import { CourseCategory } from "../../../enums/Enums";

export const courseUpdateSchema = z.object({
    id: z.string().min(1, "Course ID is required"),
    title: z.string()
        .min(1, "Course title is required")
        .max(150, "Course title cannot exceed 150 characters"),
    description: z.string().optional(),
    category: z.nativeEnum(CourseCategory),
    price: z.number().min(0, "Price cannot be negative"),
    badgeLabel: z.string().optional()
});