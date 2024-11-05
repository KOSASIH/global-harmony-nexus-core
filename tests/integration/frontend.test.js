// tests/integration/frontend.test.js
const request = require('supertest');
const app = require('../../frontend/app'); // Adjust the path as necessary

describe('Frontend Integration Tests', () => {
    it('should load the homepage', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Welcome to the DApp');
    });

    // Add more integration tests as needed
});
