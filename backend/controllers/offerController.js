const Offer = require('../models/Offer');
const mongoose = require('mongoose');

exports.getOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json(offers);
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({ message: 'Error fetching offers', error: error.message });
  }
};

exports.createOffer = async (req, res) => {
  try {
    const newOffer = new Offer(req.body);
    const savedOffer = await newOffer.save();
    console.log("test:" + savedOffer)
    const responseData = {
      id: savedOffer._id
    }
    res.status(201).json(responseData);
  } catch (error) {
    console.error('Error creating offer:', error);
    res.status(500).json({ message: 'Error creating offer', error: error.message });
  }
};

exports.updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid offer ID' });
    }

    const updatedOffer = await Offer.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedOffer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.status(200).json(updatedOffer);
  } catch (error) {
    console.error('Error updating offer:', error);
    res.status(500).json({ message: 'Error updating offer', error: error.message });
  }
};

exports.deleteOffer = async (req, res) => {
  try {
    const offerId = req.params.id;
    console.log('Received ID:', offerId); // Ghi log giá trị ID nhận được

    if (!offerId) {
      return res.status(400).json({ message: 'Offer ID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(offerId)) {
      return res.status(400).json({ message: 'Invalid offer ID' });
    }

    const result = await Offer.findByIdAndDelete(offerId);
    if (!result) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.status(200).json({ message: 'Offer deleted successfully' });
  } catch (error) {
    console.error('Error deleting offer:', error);
    res.status(500).json({ message: 'Error deleting offer', error: error.message });
  }
};
