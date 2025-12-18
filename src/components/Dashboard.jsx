import React from "react";
import "./Dashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaUser, FaUserMd, FaBed, FaAmbulance } from "react-icons/fa"

const activityData = [
  { month: "Jan", patients: 35, consult: 45 },
  { month: "Feb", patients: 40, consult: 52 },
  { month: "Mar", patients: 60, consult: 38 },
  { month: "Apr", patients: 42, consult: 25 },
  { month: "May", patients: 55, consult: 58 },
  { month: "Jun", patients: 48, consult: 50 },
];

const Dashboard = () => {
  return (
    <div className="dashboard">


      <div className="header-margin"></div>

      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-content">
            <div>
              <h4>Total Patients</h4>
              <span>2015</span>
            </div>
            <FaUser className="stat-icon" />
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-content">
            <div>
              <h4>Total Staffs</h4>
              <span>550</span>
            </div>
            <FaUserMd className="stat-icon" />
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-content">
            <div>
              <h4>Total Rooms</h4>
              <span>2000</span>
            </div>
            <FaBed className="stat-icon" />
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-content">
            <div>
              <h4>Total Cars</h4>
              <span>50</span>
            </div>
            <FaAmbulance className="stat-icon" />
          </div>
        </div>
      </div>


      <div className="chart-card">
        <h3>Activity</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={activityData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="consult" stroke="#3bb9b3" strokeWidth={3} />
            <Line type="monotone" dataKey="patients" stroke="#4a90e2" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>


      <div className="bottom-grid">


        <div className="doctor-list">
          <h3>Doctor List</h3>
          <ul>
            {["Dr. Jaylon Stanton", "Dr. Carla Schleifer", "Dr. Hanna Geidt", "Dr. Roger George", "Dr. Natalie Doe"].map((doc, i) => (
              <li key={i}>
                <img src={`https://i.pravatar.cc/40?img=${i + 3}`} alt="" />
                <div>
                  <h4>{doc}</h4>
                  <span>Specialist</span>
                </div>
              </li>
            ))}
          </ul>
        </div>


        <div className="appointment">
          <h3>Online Appointment</h3>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Date & Time</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Appoint For</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["01", "Natiya", "20 May 5:30pm", 50, "Female", "Dr. Lee"],
                ["02", "Vision", "20 May 6:30pm", 70, "Male", "Dr. Gregory"],
                ["03", "Miranda", "20 May 7:00pm", 54, "Male", "Dr. Bernard"],
                ["04", "Olive", "20 May 8:00pm", 45, "Female", "Dr. Mitchell"],
                ["05", "Mishel", "20 May 8:30pm", 40, "Male", "Dr. Randall"],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((col, id) => (
                    <td key={id}>{col}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
