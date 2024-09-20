import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./form.css"; 

function EditEvent() {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    type: "",
    maxAttendees: "",
    image: null,
  });
  
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const existingEvent = events.find((e) => e.id === id);
    
    if (existingEvent) {
      setEvent(existingEvent);
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEvent({
        ...event,
        image: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!event.title || !event.description || !event.date || !event.location || !event.type || !event.maxAttendees || !event.image) {
      setError("All fields are required!");
      return;
    }

    const events = JSON.parse(localStorage.getItem("events")) || [];
    const eventIndex = events.findIndex((e) => e.id === id);
    if (eventIndex !== -1) {
      events[eventIndex] = { ...event }; 
      localStorage.setItem("events", JSON.stringify(events));
      alert("Event updated successfully!");

      navigate("/"); 
    }
  };

  const handleDelete = () => {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const updatedEvents = events.filter((e) => e.id !== id);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    alert("Event deleted successfully!");
    navigate("/"); 
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Event</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={event.title}
            onChange={handleInputChange}
            placeholder="Enter event title"
          />
        </div>
        <div className="form-group">
          <label>Event Description</label>
          <textarea
            className="form-control"
            name="description"
            value={event.description}
            onChange={handleInputChange}
            placeholder="Enter event description"
          />
        </div>
        <div className="form-group">
          <label>Event Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={event.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Event Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={event.location}
            onChange={handleInputChange}
            placeholder="Enter event location"
          />
        </div>
        <div className="form-group">
          <label>Event Type</label>
          <input
            type="text"
            className="form-control"
            name="type"
            value={event.type}
            onChange={handleInputChange}
            placeholder="Enter event type"
          />
        </div>
        <div className="form-group">
          <label>Max Attendees</label>
          <input
            type="number"
            className="form-control"
            name="maxAttendees"
            value={event.maxAttendees}
            onChange={handleInputChange}
            placeholder="Enter max attendees"
          />
        </div>
        <div className="form-group">
          <label>Upload Event Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageUpload}
            accept="image/*"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Update Event
        </button>
        <button type="button" className="btn btn-danger btn-block" onClick={handleDelete}>
          Delete Event
        </button>
      </form>
    </div>
  );
}

export default EditEvent;
