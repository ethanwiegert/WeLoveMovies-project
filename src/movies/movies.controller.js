const service = require("./movies.service.js");

async function list(req, res, next){
    const active = req.query.is_showing;
    const data=await service.list()
    res.json({data})
}

module.exports={
    list,
}