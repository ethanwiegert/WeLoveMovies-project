const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

function list(){
    return knex("movies").select("*")
}

function isShowing(){
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("*")
    .where({ "mt.is_showing": true })
    .groupBy("m.movie_id");
}

function read(movieId){
    return knex("movies")
    .select("*")
    .where({movie_id:movieId})
    .first()
}

function readTheaters(movieId){
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("*")
    .where({ "mt.movie_id": movieId })
    .groupBy("t.theater_id");
}


const addCriticDetails = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
  });

const reduceCritics = reduceProperties("review_id", {
  critic_id: ["critic", "critic_id"],
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],
});

function readReviews(movieId){
    return knex("movies as m")
    .join("reviews as r", "r.movie_id", "m.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ "r.movie_id": movieId })
   
    .then((result) => {
        const updatedReview = reduceCritics(result)
        return updatedReview;
      })
    }



module.exports={
    list,
    isShowing,
    read,
    readTheaters,
    readReviews,
}