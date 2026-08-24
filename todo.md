* Add <!DOCTYPE html> to all EJS templates.
* Refactor code to use controllers
* Handle invalid message IDs (/message/:id) with a 404 response instead of crashing* Use strict equality when finding messages (msg.id === Number(id)).
* Format dates using toLocaleString() or toDateString().
* Add a "Back to Home" link on form page for better navigation.

