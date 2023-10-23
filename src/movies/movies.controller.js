const service = require("./movies.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function idExists(req, res, next){
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if (movie) {
      res.locals.movie = movie;
      return next();
    }
    return next({ status: 404, message: `Movie ID: ${movieId} cannot be found.` });
}

async function list(req, res, next){
    if (req.query.is_showing) {
    res.send({ data: await service.isShowing() });
  } else {
    res.send({ data: await service.list() });
  }
}

async function read(req, res, next) {
    const knexInstance = req.app.get("db");
    const { movie } = res.locals;
    res.json({ data: movie });
  }

async function readTheaters(req, res, next){
    const { movieId } = req.params;
    const data=await service.readTheaters(movieId)
    res.json({data})
}

async function readReviews(req, res, next){
    const { movieId } = req.params;
    const data=await service.readReviews(movieId)
    res.send({data})
}

module.exports={
    list,
    read: [asyncErrorBoundary(idExists), asyncErrorBoundary(read)],
    readTheaters: [asyncErrorBoundary(idExists), asyncErrorBoundary(readTheaters)],
    readReviews: [asyncErrorBoundary(idExists), asyncErrorBoundary(readReviews)],
}