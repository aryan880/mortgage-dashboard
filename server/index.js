import express from "express";
import cors from "cors";

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

let clients = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    phone: "604-123-4567",
    mortgageType: "First-time buyer",
    status: "New",
    followUpDate: "2026-07-03",
    notes: "Needs pre-approval follow-up"
  },
  {
    id: 2,
    name: "Sarah Lee",
    email: "sarah@example.com",
    phone: "778-555-2233",
    mortgageType: "Refinance",
    status: "In Review",
    followUpDate: "2026-07-05",
    notes: "Missing income documents"
  }
];

app.get("/api/clients", (req, res) => {
  res.json(clients);
});

app.post("/api/clients", (req, res) => {
  const { name, email, phone, mortgageType, status, followUpDate, notes } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: "Name, email, and phone are required."
    });
  }

  const newClient = {
    id: Date.now(),
    name,
    email,
    phone,
    mortgageType,
    status: status || "New",
    followUpDate: followUpDate || "",
    notes: notes || ""
  };

  clients.push(newClient);

  res.status(201).json(newClient);
});

app.patch("/api/clients/:id", (req, res) => {
  const id = Number(req.params.id);
  const clientIndex = clients.findIndex((client) => client.id === id);

  if (clientIndex === -1) {
    return res.status(404).json({
      message: "Client not found."
    });
  }

  clients[clientIndex] = {
    ...clients[clientIndex],
    ...req.body
  };

  res.json(clients[clientIndex]);
});

app.delete("/api/clients/:id", (req, res) => {
  const id = Number(req.params.id);
  clients = clients.filter((client) => client.id !== id);

  res.json({
    message: "Client deleted from demo data."
  });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});