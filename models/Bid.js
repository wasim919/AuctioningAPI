const mongoose = require('mongoose');
const colors = require('colors');

const BidSchema = new mongoose.Schema({
  auctionitem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AuctionItem',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// // Static method to get avg of course tuitions
// CourseSchema.statics.getAverageCost = async function (bootcampId) {
//   const obj = await this.aggregate([
//     {
//       $match: { bootcamp: bootcampId },
//     },
//     {
//       $group: {
//         _id: '$bootcamp',
//         averageCost: { $avg: '$tuition' },
//       },
//     },
//   ]);

//   try {
//     await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
//       averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

// // Call getAverageCost after save
// CourseSchema.post('save', function () {
//   this.constructor.getAverageCost(this.bootcamp);
// });

// // Call getAverageCost before remove
// CourseSchema.pre('remove', function () {
//   this.constructor.getAverageCost(this.bootcamp);
// });

module.exports = mongoose.model('Bid', BidSchema);
