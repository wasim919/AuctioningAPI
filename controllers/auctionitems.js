const AuctionItem = require('../models/AuctionItem');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc            Get all auctionitems
// @route           GET /api/v1/auctionitems
// @access          Public
exports.getAuctionItems = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc            Get auctionitem
// @route           GET /api/v1/auctionitems/:id
// @access          Public
exports.getAuctionItem = asyncHandler(async (req, res, next) => {
  const auctionitem = await AuctionItem.findById(req.params.id);
  if (!auctionitem) {
    return next(
      new ErrorResponse(
        `AuctionItem not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: auctionitem });
});

// @desc            Post auctionitem
// @route           POST /api/v1/auctionitems
// @access          Private
exports.createAuctionItem = asyncHandler(async (req, res, next) => {
  req.body.user = req.user;
  const auctionitem = await AuctionItem.create(req.body);
  res.status(201).json({ success: true, data: auctionitem });
});

// @desc            Update AuctionItem
// @route           PUT /api/v1/auctionitems/:id
// @access          Private
exports.updateAuctionItem = asyncHandler(async (req, res, next) => {
  let auctionitem = await AuctionItem.findById(req.params.id);
  if (!auctionitem) {
    return next(
      new ErrorResponse(
        `AuctionItem not found with id of ${req.params.id}`,
        404
      )
    );
  }
  if (auctionitem.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User with id ${req.user.id} is not authorized to update auctionitem`,
        401
      )
    );
  }
  auctionitem = await AuctionItem.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: auctionitem });
});

// @desc            Delete AuctionItem
// @route           DELETE /api/v1/auctionitems/:id
// @access          Private
exports.deleteAuctionItem = asyncHandler(async (req, res, next) => {
  const auctionitem = await AuctionItem.findById(req.params.id);
  // Check if auctionitem exists
  if (!auctionitem) {
    return res.status(400).json({ success: false });
  }
  // Make sure the auctionitem is created by the current user
  if (auctionitem.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User with id ${req.user.id} is not authorized to delete auctionitem`,
        401
      )
    );
  }
  auctionitem.remove();
  res.status(200).json({ success: true, data: {} });
});
