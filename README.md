# Frontend-Project-React

A complete frontend system for a Cinema backend, written in React using React-Bootstrap, FontAwesome and Node.js

## How to run

```zsh
npm install
npm run dev
```

 In case the page doesn't load immediately try running the backend on a local server

## Division Of Components

The frontend project can be split into two parts:

- The movie selection part
- The movie booking part

### Movie Selection Components

Each movie is stored within a `MovieCard` component, A `MovieCard` can either be displayed with or without screening information.
This feature is mostly used when booking a card, due to the user being able to use multiple screening times.
Clicking on a `MovieCard` will open the booking page for that movie.

#### MoviesAll Component

This component contains every movie available, not grouped by any parameter.
Initially, all movies are displayed sorted by their screening date. The user can change the sorting method by clicking on the sorting widgets at the bottom of the screen.
The user can also filter the movies by clicking on the filter widgets, again at the bottom of the screen.
For the user to access this component, they can click on the `All Movies` button on the top navigation bar.
If the user wants to book a movie, they can click on the `MovieCard` component.

#### MoviesCategories Component

This is the first component the user will see when they open the website.
It contains all the movies grouped by their category.
Every category is displayed within a carousel, which can be scrolled through by clicking on the arrows at the sides of the screen.

#### Sorting & Filtering Widgets

The sorting and filtering widgets are located at the bottom of the screen, and are used to sort and filter the movies displayed on the screen.
The sorting widgets are used to sort the movies by their title, screening date, or category.
The filtering widgets are used to filter the movies by their genre/category.

### Movie Booking Components

The movie booking components are used to book a movie for a specific screening time.
The user can select the number of tickets they want to book, and the seats they want to book.
The user can also select the type of ticket they want to book, and the type of payment they want to use.

#### BookMovie Component

This component is used to book a movie for a specific screening time.
The user can select the number of tickets they want to book, and the seats they want to book.
The user can also select the type of ticket they want to book.
If the user makes a mistake, they can click on the `Trash` button to reset the booking.

#### DisplayChairs Component

This component is used to display the seats available for a specific screening time.

#### Receipt Component

Once the user has booked their tickets, they will be redirected to the receipt page.
This page will display the details of the booking, and the user can click on the `Continue` button to go back to the main page.
