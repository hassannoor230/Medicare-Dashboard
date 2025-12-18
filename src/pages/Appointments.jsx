import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./Appointments.css";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
    status: "pending",
  });

  useEffect(() => {
    const saved = localStorage.getItem("appointments");
    if (saved) {
      setAppointments(JSON.parse(saved));
    } 
  }, []);

  const saveAppointments = (list) => {
    setAppointments(list);
    localStorage.setItem("appointments", JSON.stringify(list));
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (!newAppointment.name || !newAppointment.email || !newAppointment.phone) {
      alert("Please fill Name, Email, and Phone");
      return;
    }

    const appointment = newAppointment.id
      ? { ...newAppointment }
      : { ...newAppointment, id: Date.now() };

    const updated = appointments.filter(a => a.id !== appointment.id).concat(appointment);
    saveAppointments(updated);
    setShowForm(false);
    setNewAppointment({
      id: null,
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      notes: "",
      status: "pending",
    });
  };

  const handleDelete = (id) => {
    saveAppointments(appointments.filter(a => a.id !== id));
  };

  const handleEdit = (appointment) => {
    setNewAppointment(appointment);
    setShowForm(true);
  };

  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const updated = [...appointments];
    const moved = updated.find(a => a.id === parseInt(draggableId));
    moved.status = destination.droppableId; // pending or completed
    saveAppointments(updated);
  };

  const pendingAppointments = appointments.filter(a => a.status === "pending");
  const completedAppointments = appointments.filter(a => a.status === "completed");

  return (
    <div className="vip-appointments-container">
      <div className="vip-header-section">
        <h1>Appointments</h1>
        <button className="vip-add-btn" onClick={() => setShowForm(true)}>+ Add Appointment</button>
      </div>

      {showForm && (
        <div className="vip-popup-form">
          <div className="vip-form-box">
            <h2>{newAppointment.id ? "Edit Appointment" : "Add New Appointment"}</h2>
            <form onSubmit={handleAddAppointment}>
              <input
                type="text"
                placeholder="Patient Name"
                value={newAppointment.name}
                onChange={e => setNewAppointment({ ...newAppointment, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newAppointment.email}
                onChange={e => setNewAppointment({ ...newAppointment, email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={newAppointment.phone}
                onChange={e => setNewAppointment({ ...newAppointment, phone: e.target.value })}
                required
              />
              <input
                type="date"
                value={newAppointment.date}
                onChange={e => setNewAppointment({ ...newAppointment, date: e.target.value })}
              />
              <input
                type="time"
                value={newAppointment.time}
                onChange={e => setNewAppointment({ ...newAppointment, time: e.target.value })}
              />
              <textarea
                placeholder="Notes"
                value={newAppointment.notes}
                onChange={e => setNewAppointment({ ...newAppointment, notes: e.target.value })}
              />
              <div className="vip-form-actions">
                <button type="submit" className="vip-save-btn">Save</button>
                <button type="button" className="vip-cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="vip-appointments-board">
          
          <Droppable droppableId="pending">
            {(provided) => (
              <div
                className="vip-appointment-section"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2>Pending</h2>
                {pendingAppointments.map((a, index) => (
                  <Draggable key={a.id} draggableId={a.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        className="vip-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <h3>{a.name}</h3>
                        <p><strong>Email:</strong> {a.email}</p>
                        <p><strong>Phone:</strong> {a.phone}</p>
                        {a.date && <p><strong>Date:</strong> {a.date}</p>}
                        {a.time && <p><strong>Time:</strong> {a.time}</p>}
                        {a.notes && <p><strong>Notes:</strong> {a.notes}</p>}
                        <div className="vip-card-actions">
                          <button className="vip-edit-btn" onClick={() => handleEdit(a)}>Edit</button>
                          <button className="vip-delete-btn" onClick={() => handleDelete(a.id)}>Remove</button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          
          <Droppable droppableId="completed">
            {(provided) => (
              <div
                className="vip-appointment-section"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2>Completed</h2>
                {completedAppointments.map((a, index) => (
                  <Draggable key={a.id} draggableId={a.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        className="vip-card vip-completed-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <h3>{a.name}</h3>
                        <p><strong>Email:</strong> {a.email}</p>
                        <p><strong>Phone:</strong> {a.phone}</p>
                        {a.date && <p><strong>Date:</strong> {a.date}</p>}
                        {a.time && <p><strong>Time:</strong> {a.time}</p>}
                        {a.notes && <p><strong>Notes:</strong> {a.notes}</p>}
                        <div className="vip-card-actions">
                          <button className="vip-edit-btn" onClick={() => handleEdit(a)}>Edit</button>
                          <button className="vip-delete-btn" onClick={() => handleDelete(a.id)}>Remove</button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}
