import React, { useState, useEffect } from "react";

function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);
  }, []);

  return (
    <div className="notification-container card p-3 ">
      <h2 className="lato-normal mt-5 mb-4">Your Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notification;
