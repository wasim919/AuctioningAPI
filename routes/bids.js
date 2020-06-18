const express = require('express');
const {
  getBids,
  createBid,
  getBid,
  updateBid,
  deleteBid,
} = require('../controllers/bids');
const { protect } = require('../middleware/auth');

const Bid = require('../models/Bid');

const advancedResults = require('../middleware/advancedResults');

// You must pass {mergeParams: true} to the child router
// if you want to access the params of the parent router.

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResults(Bid, {
      path: 'auctionitem',
      select: 'name description',
    }),
    getPosts
  )
  .post(protect, createPost);

router
  .route('/:id')
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
