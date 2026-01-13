# Technical Notes

###   Component Structure

React components could be further broken down into smaller, more reusable components.

Due to the size of the project, I chose not to use Redux.

### Data Fetching & Caching

I explored useQuery and, based on my understanding, it provides built-in caching.

Given the small size of the project and the limited query size, this felt like an appropriate solution.

### Type Safety (GraphQL & TypeScript)

I would have liked to spend more time researching best practices for combining GraphQL types with TypeScript.

In a larger-scale project, I would focus on:

Better alignment between GraphQL schema types and frontend TypeScript types

Reducing duplication and therefore improving maintainability as the project grows

## #   Errors / Bugs

I believe I resolved bugs that mainly appeared to be in Mutations and Queries on the server.

###  Tech Stack

MUI (Material UI)

MUI was the only external UI library added.

I use it regularly in my day-to-day work, so it was the most efficient choice for this me.

### Future Improvements

If this project were to be expanded further, I would:

Create seed data for courses

Implement a many-to-many relationship between:

Users

Courses

Course results

Improve overall data modeling to better support scalability

Add tests, focusing with unit tests on logic around modals as this is where the majority of the create/update/delete logic happens 

Add pagination to GraphQl so it's not handled on the client. 

Make mobile friendly and depending on the application develop in a mobile-first fashion. 