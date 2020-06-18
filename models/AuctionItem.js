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
    required: [True, 'Please add a start time'],
  },
  endTime: {
    type: Date,
    required: [True, 'Pleaseadd an end time'],
  },
  startingAmount: {
    type: Number,
    required: [True, 'Please add a starting amount'],
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  imageUrl: {
    type: String,
  },
});

// // Cascade delete courses when a bootcamp is deleted
// ChannelSchema.pre('remove', async function (next) {
//   await this.model('Course').deleteMany({ channel: this._id });
// });

module.exports = mongoose.model('AuctionItemSchema', AuctionItemSchema);
