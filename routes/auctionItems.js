const express = require('express');
const router = express.Router();
const {
  getAuctionItems,
  getAuctionItem,
  createAuctionItem,
  updateAuctionItem,
  deleteAuctionItem,
} = require('../controllers/auctionitems');

const AuctionItem = require('../models/AuctionItem');

const { protect } = require('../middleware/auth');

const advancedResults = require('../middleware/advancedResults');

// // Include other resource router
const bidsRouter = require('./bids');

// // Re-route to other resource router
router.use('/:auctionItemId/bids', bidsRouter);

router
  .route('/')
  .get(advancedResults(AuctionItem, 'posts'), getAuctionItems)
  .post(protect, createAuctionItem);

router
  .route('/:id')
  .get(getAuctionItem)
  .put(protect, updateAuctionItem)
  .delete(protect, deleteAuctionItem);

module.exports = router;
