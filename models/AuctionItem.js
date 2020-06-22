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
  startDateTime: {
    type: Date,
    default: Date.now,
  },
  endingBidDateTime: {
    type: Date,
    required: [true, 'Please add an end time'],
  },
  startingBidAmount: {
    type: Number,
    required: [true, 'Please add a starting bid amount'],
  },
  finalBidAmount: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  winnerBid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bid',
  },
  imageUrl: {
    type: String,
  },
});

AuctionItemSchema.pre('save', function () {
  this.startingBidDateTime = new Date();
  this.endingBidDateTime = new Date(this.endDateTime);
  console.log(this.endingBidDateTime);
  next();
});

module.exports = mongoose.model('AuctionItem', AuctionItemSchema);
