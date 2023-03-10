# Example REST-api

### REST API

-   An example REST api for an online Cinema booking system [can be found here](https://cinema-rest.nodehill.se).
-   We have turned off POST, PUT and DELETE functionality (except for the route _/api/login_) in order to protect the db… - thus POST, PUT and DELETE routes are marked _not available_ in the documentation below.

#### GET /api/table

Get all records from a table or view.

#### GET /api/table/:id

Write an id after the table name and _/_. to retrieve a record with a specific id. (Works for those tables and views that have **id** column.)

#### POST /api/table - _not available_

Creates a new record in the table, send with all properties in your data/JSON except **id**, which the database itself sets.

#### PUT /api/table/:id - _not available_

Replacing data in an existing record, just send the properties you want to replace in your data/JSON. (Works for those tables and views that have **id** column.)

#### DELETE /api/table/:id - _not available_

Removes a record from the table. (Works for those tables and views that have **id** column.)

_Note:_ For views only **GET** routes work.

### Search/Filter

A shortcoming of many REST APIs is that the above is about all that can be done. But how can you then ask the database to search, filter and sort via the REST API? Therefore, I have added some functionality for this.

#### What is a search parameter?

You can add search parameters after routes. The first you write with a “?” before and next with “&” before.

For example. had the following

```
GET /api/ticketTypes?name=Child&price=65
```

returned all records where **name** is “Child” and **price** is 65.

##### Various operators, in addition to =

You are _NOT_ limited to writing ‘=’ (equal to), other operators you can use are:

**!=, >=, <=, =, >, <** and **≈**.

Most of these are self-explanatory, but **≈** is meant to be followed by a regular expression, eg you can get all movies that have “un” in their title by typing:

```
GET /api/movies?title≈un
```

### Sort and limit

You can also submit parameter arrays with the names **sort**, **limit** and **offset**

Sort all movies from a-z by title

```
GET /api/movies/?sort=title
```

Sort all movies from z-a by title (notice the minus sign):

```
GET /api/movies/?sort=-title
```

You can choose to limit how many results you want to get back with **limit**, here the first 3 in the result:

```
GET /api/movies/?limit=3
```

You can skip a number of entries at the beginning of the result, here 4 (starting with the 5th):

```
GET /api/movies/?offset=4
```

And you can combine **sort**, **limit** and **offset**. Here we sort so that the films that are last in the alphabet are shown first, skipping the very first one and then showing the 3 following, but no more:

```
GET /api/movies?sort=-title&limit=3&offset=1
```

_You can always combine all searches, sorting and. limitations by using several search parameters together._

### Login functionality

In addition to routes that go directly to tables and views in the database, there are 3 special routes for logging in and out.

(How they work is also demonstrated in the example, from the front end.)

Note that nothing is created or deleted in the users table. Login/logout this only affects whether a user is currently logged in or not:

#### Sign in

```
POST /api/login
```

```
Request body: {email, password}
```

### Check if someone is logged in

```
GET /api/login
```

returns the logged in user if one exists.

### Log out

```
DELETE /api/login
```