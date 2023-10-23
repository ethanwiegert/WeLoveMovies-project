const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function read(reviewId){
    return knex("reviews")
    .select("*")
    .where({review_id:reviewId})
    .first()
}

/*const update = updatedReview => {
     return knex("reviews")
    .select("*")
    .where({ re: updatedReview.review_id })
   
};*/
function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview);
}

// returnUpdate function is used to send back the updated review with nested critic object.
// mapProperties is used to nest critic under the property, "critic".

const addCriticDetails = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});



function getReviewWithCritic(reviewId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .first()
    .then((result) => {
      const updatedReview = addCriticDetails(result)
      return updatedReview;
    });
}

function destroy( reviewId){
    return knex("reviews")
    .where({review_id:reviewId})
    .del()
}

module.exports={
    read,
    update,
    getReviewWithCritic,
    delete: destroy,
}