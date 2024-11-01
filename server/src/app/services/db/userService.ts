// app/services/db/userService.ts
import { prisma } from '@server/db/prisma';

export async function createUser(name: string) {
    return await prisma.user.create({
        data: { name },
    });
}

export async function getUserById(id: number) {
    return await prisma.user.findUnique({
        where: { id },
    });
}

// Add more user-related database functions as needed
