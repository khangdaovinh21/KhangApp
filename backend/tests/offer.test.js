const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); 
const Offer = require('../models/Offer');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/offerapp-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {

  await mongoose.connection.close();
});

beforeEach(async () => {

  await Offer.deleteMany({});
});

describe('Offers API', () => {
  test('should fetch all offers', async () => {
    await Offer.create({ title: 'Summer Sale', description: 'Discount on summer clothing', discountPercentage: 20, originalPrice: 100, discountedPrice: 80 });

    const response = await request(app).get('/api/offers');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].title).toBe('Summer Sale');
  });

  test('should create a new offer', async () => {
    const newOffer = { title: 'Winter Sale', description: 'Discount on winter clothing', discountPercentage: 30, originalPrice: 200, discountedPrice: 140 };

    const response = await request(app)
      .post('/api/offers')
      .send(newOffer)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Winter Sale');
  });

  test('should update an offer', async () => {
    const offer = await Offer.create({ title: 'Spring Sale', description: 'Discount on spring clothing', discountPercentage: 15, originalPrice: 150, discountedPrice: 127.5 });

    const updatedOffer = { title: 'Spring Sale Updated', description: 'Updated description', discountPercentage: 20, originalPrice: 150, discountedPrice: 120 };

    const response = await request(app)
      .put(`/api/offers/${offer._id}`)
      .send(updatedOffer)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Spring Sale Updated');
  });

  test('should delete an offer', async () => {
    const offer = await Offer.create({ title: 'Autumn Sale', description: 'Discount on autumn clothing', discountPercentage: 25, originalPrice: 180, discountedPrice: 135 });

    const response = await request(app)
      .delete(`/api/offers/${offer._id}`)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(204); 
  });
});
