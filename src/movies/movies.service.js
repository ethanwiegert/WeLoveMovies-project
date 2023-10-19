const knex = require("../db/connection");

function list(){
    return knex("movies").select("*")
}
function isShowing(){
    return knex("movies_theaters")
    .where({is_showing:true})
    .then((data)=>movies.filter((movie)=>{
        data.includes(movie.movie_id)
    }))
}
function read(movieId){
    return knex("movies")
    .select("*")
    .where({movie_id:movieId})
    .first()
}
module.exports={
    list,
    isShowing,
    read,
}