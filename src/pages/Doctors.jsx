import React, { useEffect, useState } from "react";
import "./Doctors.css";
import { useNavigate } from "react-router-dom";  // ⭐ Router navigate

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    image: "",
  });

  const navigate = useNavigate(); // ⭐ Navigation handler

  // ▶️ Fake API se 10 Doctors Load
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users?_limit=10")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((d, index) => ({
          id: d.id,
          name: d.name,
          email: d.email,
          phone: d.phone,
          specialization:
            index % 3 === 0
              ? "Cardiologist"
              : index % 3 === 1
              ? "Dermatologist"
              : "Neurologist",
          image: `https://randomuser.me/api/portraits/men/${index + 10}.jpg`,
        }));
        setDoctors(formatted);
      });
  }, []);

  // ▶️ Add / Edit Function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newDoctor.name || !newDoctor.email || !newDoctor.specialization) {
      alert("Please fill all required fields");
      return;
    }
    let updated = [];
    if (newDoctor.id) {
      updated = doctors.map((d) => (d.id === newDoctor.id ? newDoctor : d));
    } else {
      updated = [...doctors, { id: Date.now(), ...newDoctor }];
    }
    setDoctors(updated);
    setNewDoctor({
      name: "",
      email: "",
      phone: "",
      specialization: "",
      image: "",
    });
    setShowForm(false);
  };

  // ▶️ Remove Doctor
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this doctor?")) {
      setDoctors(doctors.filter((d) => d.id !== id));
    }
  };

  // ▶️ Edit Doctor
  const handleEdit = (doc) => {
    setNewDoctor(doc);
    setShowForm(true);
  };

  return (
    <div className="doctor-container">
      <div className="header-section">
        <h1>Doctors</h1>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Add Doctor
        </button>
      </div>

      {/* ---------------- Popup Form ---------------- */}
      {showForm && (
        <div className="popup-form">
          <div className="form-box">
            <h2>{newDoctor.id ? "Edit Doctor" : "Add New Doctor"}</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={newDoctor.name}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, name: e.target.value })
                }
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={newDoctor.email}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, email: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Phone"
                value={newDoctor.phone}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, phone: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Specialization"
                value={newDoctor.specialization}
                onChange={(e) =>
                  setNewDoctor({
                    ...newDoctor,
                    specialization: e.target.value,
                  })
                }
                required
              />

              <input
                type="text"
                placeholder="Image URL"
                value={newDoctor.image}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, image: e.target.value })
                }
              />

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- Doctors List ---------------- */}
      <div className="doctors-list">
        {doctors.map((d) => (
          <div key={d.id} className="doctor-card">
            <img src={d.image} alt="doctor" className="doctor-img" />

            <h3>{d.name}</h3>
            <p>
              <strong>Email:</strong> {d.email}
            </p>
            <p>
              <strong>Phone:</strong> {d.phone}
            </p>
            <p>
              <strong>Specialization:</strong> {d.specialization}
            </p>

            <div className="card-actions">
              <button className="edit-btn" onClick={() => handleEdit(d)}>
                Edit
              </button>

              <button className="delete-btn" onClick={() => handleDelete(d.id)}>
                Remove
              </button>

              {/* ⭐ New Appointment Button ⭐ */}
              <button
                className="appoint-btn"
                onClick={() => navigate("/appointments")}
              >
                Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
