# usecure Technical Test
This test is split in to folders, client and server.

Client will serve all of the front end react based components and the server will serve as a GraphQL endpoint.

For this test you must create a page listing all of the users in the database with full CRUD operations.

Demo code has been provided where needed to show you how to use GraphQL queries and mutations. You can find more information via [their docs](https://www.apollographql.com/docs/react/data/queries/).

There are various bugs scattered around that you are expected to find and fix yourself.

Use of a UI library is fine. Internally we use a component library built on Tailwind but you're welcome to use whatever you prefer.

For the sake of this demo, we use [lowdb](https://github.com/typicode/lowdb) for storing our data, so you don't get stuck setting up a proper database. 

You should have:
* A way to display all users
* A way to display all of a specific users information and course results
    * On this page you should be able to view all course results for a user
    * Create/Edit/Delete course results for a user
* A page/modal to edit a user
* A page/modal to create a user
* A modal/confirmation to delete a user

