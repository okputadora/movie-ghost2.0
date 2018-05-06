# Movie Ghost
## Summary
Movie Ghost is a mobile-first single-page-application built with
React and React-Router (bootstrapped with create-react-app)

## Rules of the game
* The user starts the game by entering the name of a movie.
* The next player then has to name an actor in that movie.
* And then the next player has to name a _different_ movie in which that actor appears.
* The game continues like this until one of the players is unable to name a movie or an actor.
* Failure to name a unique movie or an actor results in that player getting a letter (like the game HORSE, except we're spelling GHOST).

_Note_: Because you'll be playing against robots with a connection to a movie database,
you probably won't ever win. The object of the game then is to see how many rounds you can last.

## Ideas for future development
* Create accounts for users so they can save their high scores
* multiplayer gameplay
* chat box for multiplayer gameplay
* Let the user start with an actor OR movie (Edge cases are hard to handle as some movie titles and actors name are the same)
* Better UI/UX e.g. animating components on entry
* mdb.searchMovie() works by trying really hard to return anything at all. So if we enter "F" we'll get the movie Forrest Gump. We should do some [string comparison](https://www.npmjs.com/package/string-similarity) to make sure the guess is at least close if not an exact match to the movie returned.
* Randomize the robot response
* Better yet make differnet skill level by utilizing popularity ratings to guide robot picks
* Bugs on really obscure movies or single-actor-cast movies
