const service = require("./reviews.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");



async function reviewExists(req, res, next){
    const { reviewId } = req.params;
    const review = await service.read(reviewId);
    if (review) {
      res.locals.review = review;
      return next();
    }
    return next({ status: 404, message: "Review cannot be found." });
}

async function update(req, res) {
  const updatedReview = { ...res.locals.review, ...req.body.data };
  await service.update(updatedReview);
  const reviewToReturn = await service.getReviewWithCritic(
    res.locals.review.review_id
  );
  res.json({ data: reviewToReturn });
}

async function destroy(req, res, next){
    const {reviewId}=req.params
    const data = await service.delete(reviewId)
    res.status(204).json({data})
}

module.exports={
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete:[asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}