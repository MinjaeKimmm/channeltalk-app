import express from 'express';
import { createUser } from '@server/app/services/db/userService';

const router = express.Router();

router.post('/createUser', async (req, res) => {
    try {
        const { name } = req.body;
        const user = await createUser(name);
        res.json({ result: { message: `Hello ${user.name}, your account has been created!` } });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

export default router;
