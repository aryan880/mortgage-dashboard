import { supabase } from "../supabaseClient.js";

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
  const { id } = req.query;

  if (req.method === "PATCH") {
    const updateData = {};

    if (req.body.status !== undefined) updateData.status = req.body.status;
    if (req.body.notes !== undefined) updateData.notes = req.body.notes;
    if (req.body.followUpDate !== undefined) {
      updateData.follow_up_date = req.body.followUpDate || null;
    }

    const { data, error } = await supabase
      .from("clients")
      .update(updateData)
      .eq("id", Number(id))
      .select()
      .single();

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(200).json(formatClient(data));
  }

  if (req.method === "DELETE") {
    const { error } = await supabase
      .from("clients")
      .delete()
      .eq("id", Number(id));

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(200).json({
      message: "Client deleted from database."
    });
  }

  return res.status(405).json({ message: "Method not allowed" });
}