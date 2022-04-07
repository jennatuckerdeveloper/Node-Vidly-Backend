# Node Express Video Rental App Backend

This application was built by Jenna Tucker as a learning/practice exercise in fullstack JavaScript. [The frontend app connected to this backend app is currently deployed on Heroku.](https://gentle-ravine-70551.herokuapp.com/)

This backend app is based on [Mosh Hamedani's Node course](https://codewithmosh.com/p/the-complete-node-js-course). Please note that Mosh's course is several years old, so some significant changes will be necessary that may impede early learners. This version has many distinctions.

Some key changes to this version include:

- Use of updated libraries and dependencies and relevant code changes throughout code base.
- Use of `mongoose` for `MongoDB` transactions to replace deprecated `fawn` library.
- Requires a `MongoDB` replica set for transactions.
- Significant additional Jest tests for higher test coverage.
- Use of GitHub Actions for CI (continuous integration with PR's triggering Jest tests).
- Use of Heroku for CD (changes to `main` on GitHub deploys to `main` on `Heroku`).

The focus in this application was to:

- Use modern Node features and libraries
- Use contemporary Express features and best practices to build the API
- Make good use of middleware to simplify code and minimize duplication
- Establish a maintainable, clean code base
- Write enough tests to get good code coverage and encourage ongoing refactoring
- Practice TDD to gain intuitive sense of advantages in code-first and test-first workflows
- Keep learning practices as close to real-world development work as possible

This version of the application does not focus on or include:

- Jest test design that allows a pool of workers to run tests concurrently (tests are slow)

The [frontend React application](https://github.com/jennatuckerdeveloper/React-Video-Rentals-App) can also be viewed on GitHub.

## Application Context Overview

The mock context for this application was a video rental shop.

Two distinct user groups would be using the website.

1. Employees wanting to assist customers in renting and returning movies.

2. Managers wanting to manage inventory and customer profiles.

## Context to Concept Mapping Auth And Admin

The app meets an early set of necessary functionality. Based on the assumption that future features would likely be added, the following conceptual points would be useful for developers:

1. Regular employees can register as users and sign in to gain authenticated status.

2. Managers must have both registered / logged in auth status and further authorization status. This change gets made when someone with database access adds `isAdmin: true` to the employee's user document.

## Key Features By Auth & Admin Status

This backend application enforces the following levels of access, which are reflected by the React frontend application.

### 1. No Auth & No Admin status

A site visitor who has not registered / logged in can:

- See genres
- See movies
- Register as a user
- Login as a user

### 2. Auth & No Admin status

A logged in user who is not admin can also:

- Logout and return to not logged in UI state
- See all customers
- See all rentals
- Search rentals
- Create new rentals
- Check in rentals

Future features might include:

- See their own account information
- Like and unlike movies (manage their own favorites list
- Change their account information, includes reset pw workflow

### 3. Auth & Admin status

A logged in user who is an admin can:

- Add / update genres
- Add / update / delete movies
- Add / update / delete customers

Future features might include:

- Allow managers to grant access for users to register, so general site can be public.

## Local development

To run this app in a local development environment:

- Check that a recent version of Node is installed.
- Clone the [GitHub repo](https://github.com/jennatuckerdeveloper/Node-Vidly-Backend).
- Run `npm install`.
- Set an environment variable `vidly_db` to a MongoDB database in MongoDB Atlas or on local.
- Run with `node index.js` or `nodemon index.js` with global `nodemon` install.
- Use [Thunder Client in VS Code](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) or another `http client` to make calls to `http://localhost:3900/api/genres` and other endpoints.

### Important Note:

The backend application uses `mongoose` for `MongoDB` transactions, which require a replica set. The easiest way to get this set up for dev is to use [Mongo DB Atlas](https://www.mongodb.com/atlas/database) free tier, but good instructions for setting up a replica set on a local machine can be found online.

## Local development with local, development backend Node application

### For the frontend:

- Check that a recent version of Node is installed.
- Clone the GitHub repo.
- Run `npm install` at the level of the `package.json` file to install dependencies.
- Run `npm start`.
- The `.env.development` file should include: `REACT_APP_API_URL=http://localhost:3900/api`.

## Developer Contact Info

You are welcome to contact me regarding:

- Jobs
- Alternative learning and self-learning to code
- Women and LGBTQ+ folks in tech

LinkedIn: https://www.linkedin.com/in/jenna-tucker/

Gmail: jennatuckerdeveloper[at]gmail.com
