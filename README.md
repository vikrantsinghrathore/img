# IMG Arena

## Instructions to run test

### Prerequisite:

1. Node.js should be installed

### Steps:

1. Install dependencies

   > `npm install`

2. Run tests in chrome

   > `npm run chrome`

### Other Commands:

1. For opening cypress

   > `npx cypress open`

## Test Cases written during pairing exercise

- Page should always be up
- Text box should be present for adding new ToDos
- Text Box for adding ToDos should be enabled
- Any text can be added to text box
- Filters should be present to for different status (All, Pending, Completed)
- ToDo can be marked as completed
- ToDo can be edited by double-click
- Button to clear/remove all completed task
- All ToDos can be marked as completed/pending from the toggle-all button beside the text box
- Remove button should be there against each ToDos.
- Count for all pending ToDos should be present
- ToDos should be maintained in the session of browser (can be LocalStorage, Cookie, SessionStorage)
- Cross-broswer
