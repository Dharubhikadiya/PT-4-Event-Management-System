import React, { useState, useEffect } from 'react';

const RSVP = ({ eventId }) => {
  const [event, setEvent] = useState(null);
  const [rsvps, setRsvps] = useState([]);

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const selectedEvent =
events.find(event => event.id === eventId); setEvent(selectedEvent);

const storedRsvps = JSON.parse(localStorage.getItem('rsvps')) || [];
const rsvpsForEvent = storedRsvps.filter(rsvp => rsvp.eventId === eventId);
setRsvps(rsvpsForEvent);
}, [eventId]);

const handleRSVP = () => { if (rsvps.length < event.maxAttendees) { const newRSVP = { userId: Date.now(), eventId }; const updatedRsvps = [...rsvps, newRSVP];

  localStorage.setItem('rsvps', JSON.stringify(updatedRsvps));
  setRsvps(updatedRsvps);
  alert('RSVP successful');
} else {
  alert('Sorry, this event is fully booked.');
}
};

return event ? ( <div> <h3>{event.title}</h3> <button onClick={handleRSVP} className="btn btn-primary">RSVP</button> </div> ) : ( <p>Loading event...</p> ); };

export default RSVP;