// import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./Event management system/components/HomePage";
// import EventDetails from "./Event management system/components/EventDetails";
// import CreateEvent from "./Event management system/components/CreateEvent";
// import EditEvent from "./Event management system/components/EditEvent";
// import Login from "./Event management system/components/Login";
// import Notifications from "./Event management system/components/Notifications";
// import Navbar from "./Event management system/components/Navbar";
// import './App.css';

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/events/create" element={<CreateEvent />} />
//           <Route path="/events/:eventId" element={<EventDetails />} />
//           <Route path="/events/:eventId/edit" element={<EditEvent />} />
//           <Route path="/notifications" element={<Notifications />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;


import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./Event management system/components/Register";
import Login from "./Event management system/components/Login";
import HomePage from "./Event management system/components/HomePage";
import CreateEvent from "./Event management system/components/CreateEvent";
import EditEvent from "./Event management system/components/EditEvent";
import Notification from "./Event management system/components/Notifications";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/edit/:id" element={<EditEvent />} />
          <Route path="/notifications" element={<Notification />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
