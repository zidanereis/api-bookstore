import { z } from "zod";

export const CreateAuthorSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    birth: z.string().date()
});

export const updateAuthor = CreateAuthorSchema.partial();