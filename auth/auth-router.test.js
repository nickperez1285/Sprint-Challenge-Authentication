const request = require('supertest');
const auth = require('./auth-router')
const db = require('../database/dbConfig')


 // let token;

 //  beforeEach(async () => {
 //    await db("users").truncate();
 //      request(auth)
 //        .post('/login')
 //        .send({
 //          username: "test",
 //         password: "test"
 //        } 
 //        )
 //        .end((err, response) => {
 //          token = response.body.token; // save the token!
 //          console.log('token',token)
 //          done();
 //        });
 //    });

describe('auth-router', () => {
	   describe('post /register', () => {
        it('should return 201 ', async () => {
            return request(auth)
                .post('/register')
             	 .then(res => {
                    expect(res.status).toBe(201);
                })
        })
	})
	//    describe('post /register', () => {
 //        it('should return 201 if logeed in',  () => {
 //            return request(auth)
 //                .post('/resister')
 //                .then(res => {
 //                    expect(res.status).toBe(201);
 //                      // expect(response.type).toBe('application/json');

 //                })
 //        })

	// }),
	//     describe('GET api/jokes', () => {
 //        it('Should require login ', () => {
 //            return request(server)
 //                .get('/')
 //                .then(res => {
 //                    expect(res.status).toBe(404);
 //                })
 //        })

	// })
	
	 


 //        it('should return all data in JSON', () => {
 //            return request(server)
 //                .get('/users')
 //                .then(res => {
 //                    expect(res.type).toMatch(/json/)
 //                    expect(res.type).toBe('application/json');
 //                })
 //        })

})