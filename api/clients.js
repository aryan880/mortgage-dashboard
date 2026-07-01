import { supabase } from "./supabaseClient.js";

function formatClient(client) {
  return {
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    mortgageType: client.mortgage_type,
    status: client.status,
    followUpDate: client.follow_up_date,
    notes: client.notes
  };
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(200).json(data.map(formatClient));
  }

  if (req.method === "POST") {
    const { name, email, phone, mortgageType, status, followUpDate, notes } =
      req.body;

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

    return res.status(201).json(formatClient(data));
  }

  return res.status(405).json({ message: "Method not allowed" });
}