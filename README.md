﻿# WeLoveMovies-project
 This is a backend project using Node.js, Knex, and CORS that attempts to follow a RESTful API design.
 
## Routes

### Movies
- GET "/movies" returns all of the movies
- GET "/movies?is_showing=true" returns a list of movies currently in theaters based on the data
- GET "/movies/:movieId" returns movie with the matching ID
- GET "/movies/:movieId/theaters" returns movie with the matching ID and theaters it is playing in
- GET "/movies/:movieId/reviews" returns movie with the matching ID and reviews associated with that movie

### Reviews
- DELETE "reviews/:reviewId" deletes the review that matches the ID
- PUT "/reviews/:reviewId" updates the review that matches the ID

### Theaters
- GET "/theaters" returns all the theaters as well as what movies are showing in each individual one

## Additional Features
- Deployed and connected to databases associated with production and development
- Error handler to catch errors associated with async/await, invalid HTTP methods, invalid requests.
