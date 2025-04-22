require('dotenv').config({ path: './.env' });
const request = require('supertest');
const app = require('../app');

describe('Auth flow', () => {
  it('registers a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'pass123', role: 'user' });
    expect(res.statusCode).toBe(201);
  });

  it('logs in the user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'pass123' });
    expect(res.statusCode).toBe(200);
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('gets current user', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'pass123' });
  
      console.log(loginRes.headers)
    const cookie = loginRes.headers['set-cookie'][0]; 
  
    const res = await request(app)
      .get('/api/auth/me')
      .set('Cookie', cookie); 
  
    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty('username', 'testuser');
  });

  it('accesses protected dashboard', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'pass123' });
    
    const res = await request(app)
      .get('/api/dashboard')
      .set('Cookie', loginRes.headers['set-cookie']);
    expect(res.statusCode).toBe(200);
  });

  it('denies access to admin route for non-admin users', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'pass123' });
    
    const res = await request(app)
      .get('/api/admin')
      .set('Cookie', loginRes.headers['set-cookie']);
    expect(res.statusCode).toBe(403); // Forbidden
  });
});