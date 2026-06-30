import { useState } from "react";
import "./App.css";

const initialClients = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    phone: "604-123-4567",
    mortgageType: "First-time buyer",
    status: "New",
    notes: "Needs pre-approval follow-up"
  },
  {
    id: 2,
    name: "Sarah Lee",
    email: "sarah@example.com",
    phone: "778-555-2233",
    mortgageType: "Refinance",
    status: "In Review",
    notes: "Missing income documents"
  },
  {
    id: 3,
    name: "Mike Patel",
    email: "mike@example.com",
    phone: "604-555-8899",
    mortgageType: "Investment property",
    status: "Approved",
    notes: "Application approved"
  }
];

function App() {
  const [clients, setClients] = useState(initialClients);
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

  const filteredClients =
    statusFilter === "All"
      ? clients
      : clients.filter((client) => client.status === statusFilter);

  function updateStatus(id, newStatus) {
    const updatedClients = clients.map((client) => {
      if (client.id === id) {
        return {
          ...client,
          status: newStatus
        };
      }

      return client;
    });

    setClients(updatedClients);
  }

  function deleteClient(id) {
    const remainingClients = clients.filter((client) => client.id !== id);
    setClients(remainingClients);
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name) {
      setError("Client name is required.");
      return;
    }

    if (!form.email) {
      setError("Email is required.");
      return;
    }

    if (!form.phone) {
      setError("Phone number is required.");
      return;
    }

    const newClient = {
      id: Date.now(),
      ...form
    };

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

    setError("");
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
            Prototype note: this version uses React state for demonstration.
            In production, client records would be stored in a secure database and
            managed through authenticated API routes with role-based access.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;