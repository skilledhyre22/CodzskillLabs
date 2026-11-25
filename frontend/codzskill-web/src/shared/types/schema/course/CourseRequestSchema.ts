import { z } from "zod";
import { CourseCategory } from "../../../enums/Enums";

export const courseSchema = z.object({
    title: z.string().min(1, "Course title is required"),

    description: z.string().optional(),

    category: z.nativeEnum(CourseCategory),

    price: z.number().min(0, "Price cannot be negative"),

    badgeLabel: z.string().optional()
});