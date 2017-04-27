# UdemyChallenge


Implementation of [Udemys coding challenge](https://github.com/udemy/coding-challenge) in typescript, pug and less.


This application (referred to here as QuizChallenge) attempts to be a webapp where users can attempt a quiz and recieve a result for how they did.
QuizChallenge is a full stack solution, however most of the focus is on the front end, with the backend only responsible for retrieving data and calculating the final result.


QuizChallenge is developed in Typescript, pug and less. The build toolchain is simple and only uses gulp, emphasis was not placed on resolving urls through routing or otherwise
so the app must be run from public/build/html. Typescript acts as an excellent utility to ensure a number of what would be runtime errors are caught at compile time through static typing which is why I used it. 

# Architecture


QuizChallenge is developed in Typescript, pug and less. The build toolchain is simple and only uses gulp, emphasis was not placed on resolving urls through routing or otherwise
so the app must be run from public/build/html. Typescript acts as an excellent utility to ensure a number of what would be runtime errors are caught at compile time through static typing which is why I used it. 


The app itself is built off the [Knockout](http://knockoutjs.com) MVVM framework to simplify the production, and managing of data. Rather than building the page on the back end and
sending it to the user we can create a more fluid system where api calls allow the application to update in real time. To improve performance some, as well as back end complexity
of the database query's, Quiz's are initially downloaded as skeleton objects in JSON format. A skeleton object in this context means only the minimum data required is downloaded when the page is first loaded. Because the sidebar contains a list of all existing Quizes (pagination was not considered necessary for the scope of the project), the Quiz objects contain only their name and id. Once selected, a Quiz will download it's questions and answers in the background before rendering to the page. I believe that beyond reducing memory usage, treating Quiz's this way reduces overall load on the server as well as the client, since data is only loaded as needed. The List of quiz's is searchable, however it is not a fuzzy search. Overall the use of knockout dramatically reduces complexity of development and makes the website smoother and more dynamic.


The Typescript source code is compiled to individual javascript files using amd modules. Originally intended to compile to a single index.js file, it turns out requireJs will not accept a file with more than one module definition and the Typescript compiler does not allow organizing compiled output into a master module. A semi-workaround was used, wherein a bucket file exports modules from their own respective files. As far as I'm aware this doesnt reduce the number of downloaded files as was the original intention of the single file output, but it does carry the benefit of only importing a single master module through require through which the others may be accessed.


The back-end is developed in PHP and is essentially a single file solution (an additional singleton file exists as a database utility). The lack of requirement for a quiz creation system meant the overall objective of the server was fairly simple, so minimal efforts were taken to organize it in any design patterns or OOP. Currently it exists as a simple request handler and 3 functions for use by that handler, organized procedurally.


If I had additional time there would be a number of features I would like to have implemented.

* Routing on the backend to avoid long path to index and generally clean up the api (current I use redundant query strings to identify what action should be taken).
* Restructuring on the database to make it simpler to find the Quiz associated with an answer. Currently answers reference only their question, this turned out to add a degree of complexity in retreiving the result as unanswered questions would not be calculated, when they should be calculated as incorrect. Referencing the quiz would avoid the complex subquery chain used in the calculation. This design was made with the assumption that results would be calculated client side (which is evident from questionAnswersPair.ts containing a reference to whether an answer is the correct one), but I decided later that was a bad idea.
* General UI improvements including disabling the submit button until all questions were answered, and a results page where correct answers are in green and incorrect answers are in red. Currently the app only shows your percentage.
* Optional negative marking.
* A quiz creation interface (this was explicitely not required).


# Building the website

With the challenge folder placed directly in webroot, building should be as simple as running gulp. 





