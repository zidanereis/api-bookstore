import { string, z } from "zod";

export const CreateReviewSchema = z.object({
    userId: z.string(),
    bookId: z.string(),
    text: z.string().min(1),
    rating: z.number(),
});

export const updatereview = CreateReviewSchema.partial();