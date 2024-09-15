import { z } from "zod";
import { zValidator } from '@hono/zod-validator'

export default class ValidationService {
    static inputSchema = z.object({
        id: z.string().regex(/^[1-9]\d{7}$/, { message: "ID must be an 8-digit number not starting with 0" })
    });

    static validateInput(input: any) {
        return this.inputSchema.safeParse(input);
    }
}