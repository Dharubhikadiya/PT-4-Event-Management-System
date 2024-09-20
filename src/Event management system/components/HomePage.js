import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css"; 
import { Link } from "react-router-dom"; 

function HomePage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    location: "",
    type: "",
  });
  const navigate = useNavigate();

  const defaultEvent = {
    id: 1,
    title: "Sample Event",
    description: "This is default event add.",
    date: "2024-12-31",
    location: "New York",
    type: "Conference",
    maxAttendees: 100,
    image: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F831260479%2F2194700540003%2F1%2Foriginal.20240821-072459?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C26%2C1200%2C600&s=72c3ab20beadddc091786a678cc72dae", 
  };

  useEffect(() => {
    let storedEvents = JSON.parse(localStorage.getItem("events")) || [];

    // Add default event if no events exist
    if (storedEvents.length === 0) {
      storedEvents = [defaultEvent];
      localStorage.setItem("events", JSON.stringify(storedEvents));
    }

    setEvents(storedEvents);
    setFilteredEvents(storedEvents);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, events]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const applyFilters = () => {
    let filtered = events;

    if (filters.date) {
      filtered = filtered.filter((event) => event.date === filters.date);
    }

    if (filters.location) {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.type) {
      filtered = filtered.filter((event) =>
        event.type.toLowerCase().includes(filters.type.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  const handleRSVP = (eventId) => {
    const currentRSVPs = JSON.parse(localStorage.getItem("rsvps")) || {};
    const eventRSVPs = currentRSVPs[eventId] || [];

    const event = events.find((e) => e.id === eventId);
    if (eventRSVPs.length < event.maxAttendees) {
      eventRSVPs.push("User"); 
      currentRSVPs[eventId] = eventRSVPs;
      localStorage.setItem("rsvps", JSON.stringify(currentRSVPs));
      alert("RSVP successful!");
    } else {
      alert("RSVP limit reached for this event.");
    }
  };

  const handleDelete = (eventId) => {
    const updatedEvents = events.filter((e) => e.id !== eventId);
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    alert("Event deleted successfully!");
  };

  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-light border-bottom shadow-sm p-3" style={{zIndex: 1000000, position: 'sticky', top: 0, backgroundColor: '#fff'}}>
        <div className="container-fluid">
          <Link className="navbar-brand lato-bold fs-4" to="/">
            Event Manager
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link text-dark lato-normal mx-4" to="/create-event">
                  Create Event
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark lato-normal" to="/notifications">
                  Notifications
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link text-dark lato-normal" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <img src="https://cdn.evbstatic.com/s3-build/fe/build/images/5fe808e647422b815b98b73c28ecf405-3_tablet_1067x470.webp" class="img-fluid" alt="..."/>
      <div className="container my-4 text-left">
        <h2 className="text-left lato-bold d-flex justify-content-start lato-bold fs-4 mb-4">Filter Events</h2>
        <div className="row g-3">
          <div className="col-md-4">
            <span className="lato-normal d-flex justify-content-start mb-2">Event Date</span>
            <input
              type="date"
              name="date"
              className="form-control"
              value={filters.date}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-4">
            <span className="lato-normal d-flex justify-content-start mb-2">Location</span>
            <input
              type="text"
              name="location"
              className="form-control"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Enter location"
            />
          </div>
          <div className="col-md-4">
            <span className="lato-normal d-flex justify-content-start mb-2">Event Type</span>
            <input
              type="text"
              name="type"
              className="form-control"
              value={filters.type}
              onChange={handleFilterChange}
              placeholder="Enter type"
            />
          </div>
        </div>
      </div>

      <div className="container">
        <h2 className="text-center mb-4 lato-bold d-flex justify-content-start lato-bold fs-4">Upcoming Events</h2>
        <div className="row">
          {filteredEvents.length === 0 ? (
            <p className="text-center">No events found with the applied filters.</p>
          ) : (
            filteredEvents.map((event) => (
              <div key={event.id} className="col-md-3 col-sm-6 mb-4">
                <div className="card event-card h-100 shadow-sm bg-white rounded">
                  <img src={event.image} className="card-img-top" alt="Event" />
                  <div className="card-body bg-white text-dark">
                    <h4 className="lato-bold d-flex justify-content-start my-3">{event.title}</h4>
                    <p className="card-text lato-normal d-flex justify-content-start"><strong className="text-dark me-2">Description :</strong>{event.description}</p>
                    <p className="card-text lato-normal d-flex justify-content-start"><strong className="text-dark me-2">Date :</strong> {event.date}</p>
                    <p className="card-text lato-normal d-flex justify-content-start"><strong className="text-dark me-2">Location :</strong> {event.location}</p>
                    <p className="card-text lato-normal d-flex justify-content-start"><strong className="text-dark me-2">Max Attendees :</strong> {event.maxAttendees}</p>
                   <div className="d-flex justify-content-between">
                   <button
                   className="btn btn-light mb-2 w-50 border border-success"
                   onClick={() => handleRSVP(event.id)}
                 >
                   RSVP
                 </button>
                 <button
                   className="btn mb-2 w-25 mx-2 lato-normal border border-success"
                   onClick={() => navigate(`/edit/${event.id}`)}
                 >
                   Edit
                 </button>
                 <button
                   className="btn mb-2 border border-danger"
                   onClick={() => handleDelete(event.id)}
                 >
                   Delete
                 </button>
                   </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
