
myFlix React App
This is a React client-side web application for myFlix, interacting with the existing server-side API and database.

Context

Client-side development plays a crucial role in modern web applications. Built with React, this interface allows users to interact with the server-side and access movie information on myFlix.

Project Goals

Develop a responsive and user-friendly interface for myFlix.
Integrate seamlessly with the existing server-side API and database.
Ensure the application is well-structured, maintainable, and adheres to best practices.
Showcase your full-stack JavaScript development expertise.
The 5 Ws

Who: Movie enthusiasts who enjoy exploring information about different movies.
What: A responsive single-page application with routing, rich interactions, multiple interface views, and a polished user experience. This client-side application supports the existing server-side (from Achievement 2) by facilitating user requests and rendering responses from the server-side through various interface views.
When: myFlix users can access and save movie information anytime.
Where: The application is hosted online, ensuring a responsive and accessible experience for all users on any device.
Why: Movie enthusiasts can readily access information about different movies and save their favorites for future reference or recommendations.
Design Criteria

User Stories

As a user, I want to be able to access information about movies so that I can learn more about movies I've watched or am interested in.
As a user, I want to be able to create a profile so I can save data about my favorite movies.   
Features & Requirements

Essential Views & Features:

Main view:
Returns all movies to the user (each movie item with an image, title, and description).
Filters the list of movies with a "search" feature.   
Allows users to select a movie for more details.
Provides logout functionality.
Enables navigation to the Profile view.
Single Movie view:
Returns data (description, genre, director, image) about a single movie to the user.
Allows users to add a movie to their list of favorites.
Login view:
Allows users to log in with a username and password.
Signup view:
Allows new users to register (username, password, email, date of birth).
Profile view:
Displays user registration details.
Allows users to update their info (username, password, email, date of birth).   
Displays favorite movies.
Allows users to remove a movie from their list of favorites.
Allows existing users to deregister.
Optional Views & Features:

Actors view: Allows users to view information about different actors.
Genre view: Returns data about a genre, with a name and description and example movies.   
Director view: Returns data about a director (name, bio, birth year, death year) and displays example movies from the director.
Single Movie view (optional features):
Allows users to see which actors star in which movies.
Allows users to view more information about different movies, such as the release date and movie rating.
Allows users to access different movie information, such as genre description and director bio, without leaving the view (e.g., tooltips).   
Allows users to share a movie.
Displays a list of related or similar movies.
Main view (optional features):
Allows users to sort movies based on different criteria.
Profile, Single Movie, and Main views (optional features):
Allows users to create a "To Watch" list in addition to their "Favorite Movies" list.
Technical Requirements

Single-page application (SPA)   
State routing for navigation and URL sharing
User-friendly movie search and filtering functionality
Parcel as the build tool
React library with ES2015+ syntax
Bootstrap UI library for styling and responsiveness
Function components
Online hosting
Optional: React Redux for state management (e.g., movie filtering)
