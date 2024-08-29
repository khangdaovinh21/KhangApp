
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const Offer = require('../models/Offer');

describe('Offer Controller', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/offerapp-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('should fetch all offers', async () => {
    const response = await request(app).get('/api/offers');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

});
