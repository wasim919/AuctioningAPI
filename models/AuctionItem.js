const mongoose = require('mongoose');

const AuctionItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  startTime: {
    type: Date,
    required: [true, 'Please add a start time'],
  },
  endTime: {
    type: Date,
    required: [true, 'Pleaseadd an end time'],
  },
  startingAmount: {
    type: Number,
    required: [true, 'Please add a starting amount'],
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model('AuctionItemSchema', AuctionItemSchema);
