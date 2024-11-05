// tests/integration/backend.test.js
const request = require('supertest');
const app = require('../../backend/app'); // Adjust the path as necessary
const User = require('../../backend/models/User'); // Adjust the path as necessary

describe('Backend Integration Tests', () => {
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

    it('should get user profile', async () => {
        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'password123',
            });
        const token = loginRes.body.token;

        const profileRes = await request(app)
            .get('/api/user/profile')
            .set('Authorization', `Bearer ${token}`);
        expect(profileRes.statusCode).toEqual(200);
        expect(profileRes.body.username).toBe('testuser');
    });

    // Add more integration tests as needed
});
