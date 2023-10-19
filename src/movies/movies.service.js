const knex = require("../db/connection");

function list(){
    return knex("movies").select("*")
}

function isShowing(){
    return knex("movies_theaters")
    .where({is_showing:true})
    .then((data)=>movies.map((movie)=>{
        data.includes(movie.movie_id)
    }))
}

function read(movieId){
    return knex("movies")
    .select("*")
    .where({movie_id:movieId})
    .first()
}

function readTheaters(movieId){
    return knex("movies_theaters")
    .where({movie_id:movieId})
    .then((data)=>theaters.map((theater)=>{
        data.includes(theater.theater_id)
    }))
}



module.exports={
    list,
    isShowing,
    read,
    readTheaters,
}