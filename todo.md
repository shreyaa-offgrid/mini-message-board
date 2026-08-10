* Add <!DOCTYPE html> to all EJS templates.
* Handle invalid message IDs (/message/:id) with a 404 response instead of crashing* Use strict equality when finding messages (msg.id === Number(id)).
* Format dates using toLocaleString() or toDateString().
* Validate form inputs (prevent empty author/message submissions).
* Add a "Back to Home" link on form page for better navigation.
