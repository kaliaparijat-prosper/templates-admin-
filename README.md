# Gild Todos

## Installation
Install a local webserver

    npm install -g local-web-server

Run the web server in the root directory (root directory is the one with index.html)

    ws

Point your browser to http://localhost:8000

## Requirements
The provided app is just a skeleton app, with some fake todo items in various state that needs to be transformed in a
real Single Page Application

What needs to be done:
- add to do item
- mark a to do item as completed
- delete a to do item
- update the item of uncompleted task in the footer
- edit a to do item

Acceptance criteria
- Use React

Keep in mind that
- Everything is under /js folder
- The model/collection for storing todo is todoModel.js and is available application wide with "app.store" or as
"store" property inside the app. Id doesn't need to be implemented.
- The complete list of todos is available available in the model "app.store.todos"
- Any changes to the store, automatically triggers a re-render of the React components
