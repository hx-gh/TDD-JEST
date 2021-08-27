const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factory');
const jwt = require('jsonwebtoken');

describe("Authentication", () => {
    beforeEach(async () => {
        await truncate();
    })
    it('Should create new account',  async () => {
        const response = await request(app)
            .post('/user_api/create')
            .send({
                name: 'Gustavo Oliveira',
                email: 'gustavo.oliveira@silkendevelopment.com.br',
                password: '123456'
            })
        expect(response.status).toBe(200);
    })
    it('Should not authenticate with invalid credentials', async () => {
        const user = await factory.create('User');
        const response = await request(app)
            .post('/user_api/authenticate')
            .send({
                email: user.email,
                password: '123456'
            })
        expect(response.status).toBe(401);
    })
    it('Should return jwt token when authenticated', async() => {
        const user = await factory.create('User');
        const response = await request(app)
            .post('/user_api/authenticate')
            .send({
                email: user.email,
                password: user.password
            })
        expect(response.body).toHaveProperty("token");
    })
    it('Should be able to access private routes when authenticated', async() => {
        const user = await factory.create('User');
        const response = await request(app)
            .get('/dashboard/main')
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
    });
    it('Should not be able to access private routes without JWT token', async() => {
        const response = await request(app)
            .get('/dashboard/main');
        expect(response.status).toBe(401);
    })
    it('Should not be able to access private routes with invalid JWT Token', async() => {
        const user = await factory.create('User');
        const response = await request(app)
            .get('/dashboard/main')
            .set('Authorization', `Bearer ` + jwt.sign({id: user.id}, 'WRONG_SECRET'));
        expect(response.status).toBe(401);
    })
})