const express = require('express');
const { randomUUID } = require('crypto');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

// In-memory user store
const users = [];

// Create a User
app.post('/users', (req, res) => {
	const { name, email } = req.body || {};
	if (!name || !email) {
		return res.status(400).json({ error: 'name and email are required' });
	}
	const newUser = { id: randomUUID(), name, email };
	users.push(newUser);
	return res.status(201).json(newUser);
});

// Retrieve a User by ID
app.get('/users/:id', (req, res) => {
	const user = users.find(u => u.id === req.params.id);
	if (!user) {
		return res.sendStatus(404);
	}
	return res.status(200).json(user);
});

// Update a User by ID
app.put('/users/:id', (req, res) => {
	const { name, email } = req.body || {};
	if (!name || !email) {
		return res.status(400).json({ error: 'name and email are required' });
	}
	const userIndex = users.findIndex(u => u.id === req.params.id);
	if (userIndex === -1) {
		return res.sendStatus(404);
	}
	users[userIndex] = { id: users[userIndex].id, name, email };
	return res.status(200).json(users[userIndex]);
});

// Delete a User by ID
app.delete('/users/:id', (req, res) => {
	const userIndex = users.findIndex(u => u.id === req.params.id);
	if (userIndex === -1) {
		return res.sendStatus(404);
	}
	users.splice(userIndex, 1);
	return res.sendStatus(204);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing