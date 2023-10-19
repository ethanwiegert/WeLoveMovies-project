const service = require("./movies.service.js");

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
    const active=req.query.is_showing
    const data=await service.list()
    if(active===true){
        data = await service.isShowing()
    }
    res.json({data})
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

module.exports={
    list,
    read: [idExists, read],
    readTheaters: [idExists, readTheaters],
}