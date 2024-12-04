import { z } from "zod";


export const CreateUserSchema = z.object({
    name: z.string().min(1),
    email: z.string().min(1),
    birth: z.string(),
    password: z.string().min(4).max(6)
});


export const UpdateUserSchema = CreateUserSchema.partial();
