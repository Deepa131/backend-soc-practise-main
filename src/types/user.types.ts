import { email, z } from 'zod';
export const UserSchema = z.object({
    id: z.string().min(1, "User ID is required"),
    username: z.string().min(1, "Username is required"),
    email: z.string().min(1, "Email is required"),
    name: z.string().min(1, " Name is required"),
    age: z.int().optional(),
});
export type User = z.infer<typeof UserSchema>;