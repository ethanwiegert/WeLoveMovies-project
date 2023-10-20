const service = require("./reviews.service.js");

async function reviewExists(req, res, next){
    const { reviewId } = req.params;
    const review = await service.read(reviewId);
    if (review) {
      res.locals.review = review;
      return next();
    }
    return next({ status: 404, message: "Review cannot be found." });
}

async function update(req, res, next){
    const {reviewId}=req.params
    const data = await service.update(req.body.data, reviewId)
    res.json({data})
}

async function destroy(req, res, next){
    const {reviewId}=req.params
    const data = await service.delete(reviewId)
    res.status(204).json({data})
}

module.exports={
    update:[reviewExists, update],
    delete:[reviewExists, destroy],
}