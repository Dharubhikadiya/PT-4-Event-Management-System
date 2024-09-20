


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css"; 

function CreateEvent() {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    maxAttendees: "",
    image: null,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

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

    if (!event.title || !event.description || !event.date || !event.location || !event.maxAttendees || !event.image) {
      setError("All fields are required!");
      return;
    }

    const eventId = new Date().getTime().toString();

    const events = JSON.parse(localStorage.getItem("events")) || [];
    events.push({
      id: eventId,
      ...event,
    });

    localStorage.setItem("events", JSON.stringify(events));
    alert("Event created successfully!");

    navigate("/");
  };

  return (
    <div className="form-container card p-4 bg-light">
      <h2 className="lato-normal mb-4 d-flex justify-content-start">Create Event</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="lato-normal"> 
        <div className="form-group">
          <label className="d-flex justify-content-start lato-normal mb-2">Event Title</label>
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
          <label className="d-flex justify-content-start lato-normal mb-2">Event Description</label>
          <textarea
            className="form-control"
            name="description"
            value={event.description}
            onChange={handleInputChange}
            placeholder="Enter event description"
          />
        </div>
        <div className="form-group">
          <label className="d-flex justify-content-start lato-normal mb-2">Event Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={event.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="d-flex justify-content-start lato-normal mb-2">Event Location</label>
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
          <label className="d-flex justify-content-start lato-normal mb-2">Max Attendees</label>
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
          <label className="d-flex justify-content-start lato-normal mb-2">Upload Event Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageUpload}
            accept="image/*"
          />
        </div>
        <button type="submit" className="btn btn-light mb-2 w-50 border border-success my-3">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;

