import React, { useState, useEffect } from 'react';
import './Patients.css';

export default function Patient() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [currentPatient, setCurrentPatient] = useState({
    id: null,
    name: '',
    age: '',
    gender: '',
    contact: '',
  });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users?_limit=5')
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((user, index) => ({
          id: user.id,
          name: user.name,
          age: Math.floor(Math.random() * 40) + 20,
          gender: index % 2 === 0 ? 'Male' : 'Female',
          contact: user.phone,
        }));
        setPatients(formatted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleOpenAdd = () => {
    setModalType('add');
    setCurrentPatient({ id: null, name: '', age: '', gender: '', contact: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (patient) => {
    setModalType('edit');
    setCurrentPatient(patient);
    setShowModal(true);
  };

  const handleSubmit = () => {
    const { name, age, gender, contact } = currentPatient;
    if (!name || !age || !gender || !contact) {
      alert('Please fill all fields!');
      return;
    }

    if (modalType === 'add') {
      const newPatient = { ...currentPatient, id: Date.now() };
      setPatients([...patients, newPatient]);
    } else {
      setPatients(patients.map(p => (p.id === currentPatient.id ? currentPatient : p)));
    }
    setShowModal(false);
  };

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to remove this patient?')) {
      setPatients(patients.filter(p => p.id !== id));
    }
  };

  // 🔥 CSV Download Function
  const downloadCSV = () => {
    if (patients.length === 0) {
      alert("No data to download");
      return;
    }

    const headers = ["ID", "Name", "Age", "Gender", "Contact"];
    const rows = patients.map(p =>
      [p.id, p.name, p.age, p.gender, p.contact].join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "patients.csv";
    link.click();
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading patients...</div>;

  return (
    <div className="patient-dashboard" style={{ marginTop: '2rem', padding: '1rem' }}>
      <div className="pm-header">
        <h2>Patient Management</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="add-patient-btn" onClick={handleOpenAdd}>Add Patient</button>
          <button className="edit-btn" onClick={downloadCSV}>Download CSV</button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.gender}</td>
                <td>{p.contact}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleOpenEdit(p)}>Edit</button>
                  <button className="remove-btn" onClick={() => handleRemove(p.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{modalType === 'add' ? 'Add New Patient' : 'Edit Patient'}</h3>

            <input placeholder="Name"
              value={currentPatient.name}
              onChange={e => setCurrentPatient({ ...currentPatient, name: e.target.value })}
            />

            <input placeholder="Age" type="number"
              value={currentPatient.age}
              onChange={e => setCurrentPatient({ ...currentPatient, age: e.target.value })}
            />

            <select
              value={currentPatient.gender}
              onChange={e => setCurrentPatient({ ...currentPatient, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <input placeholder="Contact"
              value={currentPatient.contact}
              onChange={e => setCurrentPatient({ ...currentPatient, contact: e.target.value })}
            />

            <div className="modal-actions">
              <button className="add-patient-btn" onClick={handleSubmit}>Submit</button>
              <button className="remove-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
