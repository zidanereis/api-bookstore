import { z } from "zod";

export const createBookSchema = z.object({
    name: z.string().min(1),
    date: z.string().date(),
    isbn: z.string().min(1).optional(),
    genres: z.string().min(1).array().optional(),
    authorId: z.string(),
});

export const updateBookSchema = createBookSchema.partial();