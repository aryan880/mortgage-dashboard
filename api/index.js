import express from "express";
import cors from "cors";
import { supabase } from "./supabaseClient.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/clients", async (req, res) => {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  const formattedClients = data.map((client) => ({
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    mortgageType: client.mortgage_type,
    status: client.status,
    followUpDate: client.follow_up_date,
    notes: client.notes
  }));

  res.json(formattedClients);
}); 

app.post("/api/clients", async (req, res) => {
  const { name, email, phone, mortgageType, status, followUpDate, notes } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: "Name, email, and phone are required."
    });
  }

  const { data, error } = await supabase
    .from("clients")
    .insert([
      {
        name,
        email,
        phone,
        mortgage_type: mortgageType,
        status: status || "New",
        follow_up_date: followUpDate || null,
        notes: notes || ""
      }
    ])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(201).json({
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    mortgageType: data.mortgage_type,
    status: data.status,
    followUpDate: data.follow_up_date,
    notes: data.notes
  });
});

app.patch("/api/clients/:id", async (req, res) => {
  const id = Number(req.params.id);

  const updateData = {};

  if (req.body.status !== undefined) updateData.status = req.body.status;
  if (req.body.notes !== undefined) updateData.notes = req.body.notes;
  if (req.body.followUpDate !== undefined) {
    updateData.follow_up_date = req.body.followUpDate || null;
  }

  const { data, error } = await supabase
    .from("clients")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json({
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    mortgageType: data.mortgage_type,
    status: data.status,
    followUpDate: data.follow_up_date,
    notes: data.notes
  });
});

app.delete("/api/clients/:id", async (req, res) => {
  const id = Number(req.params.id);

  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json({
    message: "Client deleted from database."
  });
});

export default app;