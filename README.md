# Movie Recommendation System Backend

## Introduction
This project is the backend development for a Movie Recommendation System where users can browse, rate, and review movies. The system provides personalized movie recommendations based on user preferences and activity, along with detailed movie information, top lists, and trending content.

## Technologies Used
- **Backend Framework**: ExpressJS
- **Database**: MongoDB
- **Authentication**: JWT
- **API Documentation**: Postman 

## Features

### User Authentication and Profiles
- **JWT Authentication**: Secure user registration and login.
- **Profile Management**: Users can create and update profiles, including setting movie preferences like favorite genres and actors.
- **Wishlist**: Users can manage a list of movies they want to watch.

### Movie Database Management
- **Admin Operations**: Admins can add, update, or delete movies in the database.
- **Movie Attributes**: Movies include title, genre, director, cast, release date, runtime, synopsis, average rating, and cover photos.
- **Additional Details**: Trivia, goofs, and soundtrack information enhance movie detail pages.
- **Crew Member Profiles**: Detailed profiles for actors, directors, and crew, with filmography, biography, and awards.
- **Parental Guidance**: Age ratings to indicate if content is suitable for younger viewers.

### Rating and Review Module
- Users can rate movies on a scale of 1 to 5.
- Users can write, update, and view reviews from other users.
- **Review Highlights**: Displays top-rated and most-discussed reviews.

### Recommendation System
- Personalized recommendations based on user ratings and preferences.
- **Similar Titles**: Section on movie pages showing related movies.
- **Home Page Recommendations**: Personalized movies based on user activity.
- **Trending and Top Rated Movies**: Based on community engagement and ratings.

### Watchlist and Custom Lists
- Users can create custom movie lists and share them.
- Users can follow or save lists created by others.

### Search and Filtering
- **Search**: By title, genre, director, or actors.
- **Filters**: By ratings, popularity, and release year.
- **Advanced Filtering**: Options like release decade, language, and keywords.
- **Top Movie Lists**: Curated top lists like "Top Movies of the Month."

### Upcoming Releases and Notifications
- **Upcoming Movies**: Display upcoming releases and set reminders.
- **Notifications**: Email or dashboard alerts for new content.

### News and Industry Updates
- **News Section**: Articles related to movies, actors, and industry updates.

### Box Office Information and Awards
- **Earnings Details**: Opening weekend and total revenue.
- **Awards**: Information on Oscars, Golden Globes, and other achievements.

### User Community
- **Discussion Boards**: Users can share opinions and engage in forums about genres, actors, or movies.

### Admin Operations
- **Moderation**: Manage the movie database and moderate user reviews.
- **Site Statistics**: Insights on popular movies and user activity.
- **Analytics**: Trends in genres, searched actors, and engagement patterns.

## Implementation Details

### File Structure
- Use a modular file structure for easier maintenance and scalability.
- Organize files into appropriate directories, such as `routes`, `controllers`, `models`, and `middleware`.

### Database Schemas
- **User Schema**: Profile details, preferences, and JWT tokens.
- **Movie Schema**: Attributes like title, genre, director, and additional sections.
- **Review Schema**: User reviews and ratings for movies.

### Middleware
- **Authentication Middleware**: To protect routes that require user authentication.
- **Error Handling Middleware**: For consistent and centralized error management.

### Router Implementation
- Use separate route files for user authentication, movie operations, reviews, and admin functionalities.

### Best Practices
- Use proper naming conventions and follow RESTful API standards.
- Implement pagination for all endpoints returning a list of objects to optimize performance.
- Use environment variables for sensitive information (e.g., database credentials, secret keys).

## API Documentation
- API endpoints are documented using **Postman** .
- Each endpoint includes:
  - **Description**: Purpose of the endpoint.
  - **Request Method**: GET, POST, PUT, DELETE.
  - **Request Parameters**: Query, body, or URL parameters.
  - **Sample Requests and Responses**: Examples for success and failure scenarios.
  - **Error Handling**: Descriptions of possible errors and status codes.

## Setup and Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/miralhsn/movie-recommendation-backend

2. Install dependencies
    npm install

3. Set up environment variables in a .env file:
- PORT
- DB_URI
- JWT_SECRET

4. Start the server:
    npm start


## Contributions
Feel free to contribute by opening issues or submitting pull requests. Follow the coding standards and guidelines provided in the contribution document.

## License	
This project is licensed under the MIT License.
