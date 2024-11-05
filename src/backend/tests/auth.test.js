// tests/auth.test.js
const request = require('supertest');
const app = require('../app'); // Assuming app.js exports the Express app
const User = require('../models/User');

describe('Auth API', () => {
    beforeAll(async () => {
        await User.deleteMany(); // Clean up the database before tests
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'password123',
                email: 'test@example.com',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toBe('User registered successfully');
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'password123',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
