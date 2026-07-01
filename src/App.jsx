import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const API_URL = "http://localhost:5001/api/clients";

  const [clients, setClients] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    mortgageType: "",
    status: "New",
    followUpDate: "",
    notes: ""
  })
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error loading clients:", error);
      }
    }

    fetchClients();
  }, []);


  const filteredClients =
    statusFilter === "All"
      ? clients
      : clients.filter((client) => client.status === statusFilter);

  async function updateStatus(id, newStatus) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
      });

      const updatedClient = await response.json();

      const updatedClients = clients.map((client) => {
        if (client.id === id) {
          return updatedClient;
        }

        return client;
      });

      setClients(updatedClients);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }

  async function deleteClient(id) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const remainingClients = clients.filter((client) => client.id !== id);
      setClients(remainingClients);
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  }


  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const missingFields = [];

    if (!form.name) {
      missingFields.push("Client name");
    }

    if (!form.email) {
      missingFields.push("Email");
    }

    if (!form.phone) {
      missingFields.push("Phone number");
    }

    if (missingFields.length > 0) {
      alert(`Please enter: ${missingFields.join(", ")}`);
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const newClient = await response.json();

      setClients([...clients, newClient]);

      setForm({
        name: "",
        email: "",
        phone: "",
        mortgageType: "",
        status: "New",
        followUpDate: "",
        notes: ""
      });
    } catch (error) {
      console.error("Error adding client:", error);
    }
  }

  const totalClients = clients.length;
  const newCount = clients.filter((client) => client.status === "New").length;
  const inReviewCount = clients.filter((client) => client.status === "In Review").length;
  const approvedCount = clients.filter((client) => client.status === "Approved").length;

  function getStatusClass(status) {
    if (status === "New") return "status-badge status-new";
    if (status === "In Review") return "status-badge status-review";
    if (status === "Approved") return "status-badge status-approved";
    if (status === "Declined") return "status-badge status-declined";
    return "status-badge";
  }

  return (
    <div className="app">
      <div className="topbar">
        <div className="brand-block">
          <div className="logo-mark">BP</div>

          <header className="header">
            <h1>Mortgage Operations Dashboard</h1>
            <p>
              Internal prototype for client intake, application tracking,
              reporting, and administrative follow-up.
            </p>
          </header>
        </div>

        <div className="topbar-badge">Internal Tools Prototype</div>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <p>Total Applications</p>
          <h3>{totalClients}</h3>
        </div>

        <div className="summary-card">
          <p>New Intake</p>
          <h3>{newCount}</h3>
        </div>

        <div className="summary-card">
          <p>In Review</p>
          <h3>{inReviewCount}</h3>
        </div>

        <div className="summary-card">
          <p>Approved</p>
          <h3>{approvedCount}</h3>
        </div>
      </div>

      <div className="page-grid">
        <section className="panel">
          <div className="panel-header">
            <h2>New Client Intake</h2>
            <p>Capture client details and create a new application record.</p>
          </div>

          <div className="panel-body">
            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-field">
                <label>Client Name</label>
                <input
                  name="name"
                  placeholder="e.g. Aryan Sawhney"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label>Email Address</label>
                <input
                  name="email"
                  placeholder="client@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label>Phone Number</label>
                <input
                  name="phone"
                  placeholder="604-123-4567"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label>Mortgage Type</label>
                <input
                  name="mortgageType"
                  placeholder="First-time buyer, refinance, renewal"
                  value={form.mortgageType}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label>Follow-up Date</label>
                <input
                  type="date"
                  name="followUpDate"
                  value={form.followUpDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label>Internal Notes</label>
                <textarea
                  name="notes"
                  placeholder="Add missing documents, next steps, or follow-up notes"
                  value={form.notes}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="primary-button">
                Add Client Application
              </button>
            </form>
          </div>
        </section>

        <div className="content-stack">
          <section className="panel">
            <div className="panel-body toolbar">
              <div className="toolbar-left">
                <h2>Application Pipeline</h2>
                <p>Filter active client files by current workflow status.</p>
              </div>

              <div className="filter-box">
                <label>Status Filter</label>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  <option>All</option>
                  <option>New</option>
                  <option>In Review</option>
                  <option>Approved</option>
                  <option>Declined</option>
                </select>
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-header">
              <h2>Client Applications</h2>
              <p>
                Review client details, update workflow status, or remove records
                from the prototype list.
              </p>
            </div>

            <div className="panel-body">
              {filteredClients.length === 0 ? (
                <div className="empty-state">
                  <strong>No applications found</strong>
                  No clients match the selected status.
                </div>
              ) : (
                <div className="client-list">
                  {filteredClients.map((client) => (
                    <div className="client-card" key={client.id}>
                      <div className="client-card-header">
                        <div className="client-title">
                          <h3>{client.name}</h3>
                          <p>{client.mortgageType || "Mortgage application"}</p>
                        </div>

                        <span className={getStatusClass(client.status)}>
                          {client.status}
                        </span>
                      </div>

                      <div className="info-grid">
                        <div className="info-item">
                          <span>Email</span>
                          <strong>{client.email}</strong>
                        </div>

                        <div className="info-item">
                          <span>Phone</span>
                          <strong>{client.phone}</strong>
                        </div>
                      </div>

                      <div className="info-item">
                        <span>Follow-up</span>
                        <strong>{client.followUpDate || "Not scheduled"}</strong>
                      </div>

                      <div className="notes-box">
                        {client.notes || "No internal notes added."}
                      </div>

                      <div className="card-actions">
                        <div>
                          <label>Update Status</label>
                          <select
                            value={client.status}
                            onChange={(event) =>
                              updateStatus(client.id, event.target.value)
                            }
                          >
                            <option>New</option>
                            <option>In Review</option>
                            <option>Approved</option>
                            <option>Declined</option>
                          </select>
                        </div>

                        <button
                          className="danger-button"
                          onClick={() => deleteClient(client.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      <section className="panel">
        <div className="panel-body">
          <p style={{ margin: 0, color: "#667085", fontSize: "14px" }}>
            Prototype note: this version uses a React frontend connected to a lightweight Express API.
            The demo API stores records in server memory. In production, client records would be stored
            in a secure database and managed through authenticated API routes with role-based access.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;