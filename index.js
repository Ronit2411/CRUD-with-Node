import express from "express";
const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" },
];

// CREATE: Add a new product
app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// READ: Get all products
app.get("/products", (req, res) => {
  res.status(200).json(products);
});

// READ: Get an product by ID
app.get("/products/:id", (req, res) => {
  const product = products.find((i) => i.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.status(200).json(product);
});

// UPDATE: Update an product by ID
app.put("/products/:id", (req, res) => {
  const product = products.find((i) => i.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });

  product.name = req.body.name || product.name;
  res.status(200).json(product);
});

// DELETE: Delete an product by ID
app.delete("/products/:id", (req, res) => {
  const index = products.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Product not found" });

  const deletedProduct = products.splice(index, 1);
  res.status(200).json(deletedProduct);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
