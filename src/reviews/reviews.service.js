const knex = require("../db/connection");

function read(reviewId){
    return knex("reviews")
    .select("*")
    .where({review_id:reviewId})
    .first()
}

function update(updatedReview, reviewId){
    return knex("reviews")
    .where({review_id:reviewId})
    .update(updatedReview)
    .returning("*")
    .then((updatedRecord)=>updatedRecord[0])
}

function destroy( reviewId){
    return knex("reviews")
    .where({review_id:reviewId})
    .del()
}

module.exports={
    read,
    update,
    delete: destroy,
}