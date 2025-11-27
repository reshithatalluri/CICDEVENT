import React, { useState } from 'react';
import './dashboard.css';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('Upcoming Events');

  const upcomingEvents = [
    { title: 'Beach Party', date: '2025-12-05', image: 'beach.jpg', location: 'Miami' },
    { title: 'Music Festival', date: '2025-12-10', image: 'music festival.jpg', location: 'Los Angeles' },
    { title: 'Cultural Night', date: '2025-12-15', image: 'cultural.jpg', location: 'New York' },
  ];

 const hotels = [
  { name: 'Grand Plaza', location: 'Miami', image: 'img1.jpg', bookedRooms: 12 },
  { name: 'Seaside Resort', location: 'Los Angeles', image: 'img2.jpg', bookedRooms: 8 },
  { name: 'Daspalla', location: 'Hyderabad', image: 'img3.jpg', bookedRooms: 5 },
  { name: 'Novotel', location: 'Bangalore', image: 'img4.jpg', bookedRooms: 7 },
  { name: 'Radisson', location: 'Delhi', image: 'img5.jpg', bookedRooms: 10 },
  { name: 'Hilton Garden', location: 'Mumbai', image: 'img6.jpg', bookedRooms: 9 },
];


  const eventRegistrations = [
    { event: 'Beach Party', attendee: 'John Doe', status: 'Confirmed' },
    { event: 'Music Festival', attendee: 'Alice Smith', status: 'Pending' },
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'Upcoming Events':
        return (
          <div className="image-grid">
            {upcomingEvents.map((e,i) => (
              <div key={i} className="card">
                <img src={e.image} alt={e.title} className="card-image" />
                <h4>{e.title}</h4>
                <p>{e.date} - {e.location}</p>
              </div>
            ))}
          </div>
        );

     case 'Hotels':
  return (
    <div className="image-grid">
      {hotels.map((h,i) => (
        <div key={i} className="card">
          <img src={h.image} alt={h.name} className="card-image" />
          <h4>{h.name}</h4>
          <p>{h.location}</p>
          <p>Booked Rooms: {h.bookedRooms}</p>
        </div>
      ))}
    </div>
  );


      case 'Event Registrations':
        return (
          <div className="table-section">
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Attendee</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {eventRegistrations.map((e,i) => (
                  <tr key={i}>
                    <td>{e.event}</td>
                    <td>{e.attendee}</td>
                    <td>{e.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'Other Events':
        return (
          <div className="image-grid">
            {[
              { title: 'Food Festival', image: 'food.jpg' },
              { title: 'Tech Conference', image: 'tech.jpg' }
            ].map((e,i) => (
              <div key={i} className="card">
                <img src={e.image} alt={e.title} className="card-image" />
                <h4>{e.title}</h4>
              </div>
            ))}
          </div>
        );

      default:
        return <h2>Section coming soon...</h2>;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>EventManager</h2>
          <small>User Dashboard</small>
        </div>
        <nav className="sidebar-menu">
          <ul>
            {['Upcoming Events', 'Hotels', 'Event Registrations', 'Other Events'].map(item => (
              <li
                key={item}
                className={activeSection === item ? 'active' : ''}
                onClick={() => setActiveSection(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <h1>{activeSection}</h1>
          <div className="user-info"><span>Welcome, User</span></div>
        </header>
        <section className="content-area">
          {renderContent()}
        </section>
      </main>
    </div>
  );
}
