Create a client-side web application for myFlix using React, interacting with the existing server-side API and database.

**Context:**

Client-side development has become crucial for modern web applications. Using React, you will build the interface for myFlix, enabling users to interact with the server-side and access movie information.

**Project Goals:**

- Develop a responsive, user-friendly interface for myFlix.
- Integrate with the existing server-side API and database.
- Ensure the application is well-structured, maintainable, and adheres to best practices.
- Showcase your mastery of full-stack JavaScript development.

**The 5 Ws**
1. Who: The users of your myFlix app—movie enthusiasts who enjoy reading information about
different movies.
2. What: A single-page, responsive app with routing, rich interactions, several interface views,
and a polished user experience. The client-side developed in this Achievement will support
the existing server-side (from Achievement 2) by facilitating user requests and rendering the
response from the server-side via a number of different interface views.
3. When: myFlix users will be able to use it whenever they want to read and save information
about different movies.
4. Where: The app will be hosted online. The myFlix app itself is responsive and can therefore be
used anywhere and on any device, giving all users the same experience.
5. Why: Movie enthusiasts like to be able to access information about different movies,
whenever they want to. Having the ability to save a list of their favorite movies will ensure
users always have access to the films they want to watch or recommend to their peers.
**Design Criteria**

**User Stories**
● As a user, I want to be able to access information about movies so that I can learn more
about movies I’ve watched or am interested in.
● As a user, I want to be able to create a profile so I can save data about my favorite movies.
Features & Requirements

The following feature requirements were extracted from the user stories just listed. Please note, your
project will only be approved if the following essential feature requirements are implemented in your
Achievement project.

**Essential Views & Features:**

**Main view**
● Returns ALL movies to the user (each movie item with an image, title, and description)
● Filtering the list of movies with a “search” feature
● Ability to select a movie for more details
● Ability to log out
● Ability to navigate to Profile view

**Single Movie view**
● Returns data (description, genre, director, image) about a single movie to the user
● Allows users to add a movie to their list of favorites
**Login view**
● Allows users to log in with a username and password**
Signup view**
● Allows new users to register (username, password, email, date of birth)
**Profile view**
● Displays user registration details
● Allows users to update their info (username, password, email, date of birth)
● Displays favorite movies
● Allows users to remove a movie from their list of favorites
● Allows existing users to deregister
**Optional Views & Features:**
**Actors view**
● Allows users to view information about different actors
**Genre view**
● Returns data about a genre, with a name and description
● Displays example movies
**Director view**
● Returns data about a director (name, bio, birth year, death year)
● Displays example movies from the director
**Single Movie view (optional features)**
● Allow users to see which actors star in which movies
● Allow users to view more information about different movies, such as the release date and
the movie rating
● Allow users to access different movie information, such as genre description and director bio,
without leaving the view (e.g., tooltips)
● Allow users to share a movie
● Display a list of related or similar movies
**Main view (optional features)**
● Allow users to sort movies based on different criteria
**Profile, Single Movie, and Main views (optional features)**
● Allow users to create a “To Watch” list in addition to their “Favorite Movies” list

**Technical Requirements**
● The application must be a single-page application (SPA)
● The application must use state routing to navigate between views and share URLs
● The application must give users the option to filter movies using a “search” feature
● The application must use Parcel as its build tool
● The application must be written using the React library and in ES2015+
● The application must use Bootstrap as a UI library for styling and responsiveness
● The application must contain function components
● The application must be hosted online
● The application may use React Redux for state management of at least one feature (i.e.,
filtering movies)
