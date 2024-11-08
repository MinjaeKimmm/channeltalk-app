import { prisma } from '@server/db/prisma'; // Import your Prisma client

export async function createUser(name: string) {
    try {
        const user = await prisma.user.create({
            data: { name },
        });
        return user;
    } catch (error) {
        console.error('Error in createUser:', error);
        throw new Error('Failed to create user');
    }
}
