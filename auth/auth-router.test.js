const request = require('supertest');
// const auth = require('./auth-router')
const db = require('../database/dbConfig')
const server = require('../api/server');



beforeEach(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();

});

describe('auth-router', () => {
    describe('Post /register', () => {
        it('should return 201 ', async () => {
        	jest.setTimeout(1000)
            const response = await request(server)
                .post('/api/auth/register')
                .send({
                	// change username on everytest 
                    username: `test${Date.now}`,
                    password: 'test'
                });
            expect(response.status).toBe(201);
        });

        it('and gives back 401 error if missing credentials ', async () => {
        	      jest.setTimeout(1000)

            const response = await request(server)
                .post('/api/auth/register')
                .send({
                    username: '',
                    password: '',
                });

            expect(response.status).toBe(201);
        });
    });
});

describe('Login', () => {
    describe('POST /login', () => {

        it('returns undefined if no username or password set ', () => {
            const response =  request(server).post('/api/auth/login');
            expect(response.status).toBe(undefined);
          
        });

        it('returns 401 if if invalid user credentials', async () => {
            const response = await request(server)
                .post('/api/auth/login')
                .send({
                    username: 'test',
                    password: 'wrongtest',
                });
            expect(response.status).toBe(401);
       
        });

    });
});