const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Authentication middleware
app.use((req, res, next) => {
  req.headers.authorization = 'Bearer <dummy-auth-token>';
  next();
});

const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
];

// GET endpoint to retrieve all items
app.get('/items', (req, res) => {
  console.log(req.headers.authorization);
  res.json(items);
});

// GET endpoint to retrieve a single item by ID
app.get('/items/:id', (req, res) => {
  console.log(req.headers.authorization);
  const item = items.find(item => item.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  res.json(item);
});

// POST endpoint to create a new item
app.post('/items', (req, res) => {
  console.log(req.headers.authorization);
  const item = { id: items.length + 1, name: req.body.name };
  items.push(item);
  res.sendStatus(201);
});

// PUT endpoint to update an existing item by ID
app.put('/items/:id', (req, res) => {
  console.log(req.headers.authorization);
  const item = items.find(item => item.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  item.name = req.body.name;
  res.json(item);
});

// DELETE endpoint to delete an existing item by ID
app.delete('/items/:id', (req, res) => {
  console.log(req.headers.authorization);
  const index = items.findIndex(item => item.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Item not found');
  items.splice(index, 1);
  res.sendStatus(204);
});

// PATCH endpoint to partially update an existing item by ID
app.patch('/items/:id', (req, res) => {
  console.log(req.headers.authorization);
  const item = items.find(item => item.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  item.name = req.body.name || item.name;
  res.json(item);
});

// OPTIONS endpoint to return allowed HTTP methods for a resource
app.options('/items/:id', (req, res) => {
  console.log(req.headers.authorization);
  res.setHeader('Allow', 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD');
  res.sendStatus(200);
});

// HEAD endpoint to retrieve resource metadata without a response body
app.head('/items/:id', (req, res) => {
  console.log(req.headers.authorization);
  const item = items.find(item => item.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', JSON.stringify(item).length);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
