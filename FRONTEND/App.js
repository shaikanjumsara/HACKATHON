import './App.css';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Appbar from './components/Appbar';
import { Home, Error } from './components/Home';
import Show from './components/Show';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import Contact from './components/Contact'; 
import AssignmentSubmission from './components/AssignmentSubmission'; // Import AssignmentSubmission component

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App({ store }) {
  function Page() {
    switch (store.getState()) {
      case "Signin":
        return (
          <div>
            <Appbar store={store} />
            <Signin store={store} />
          </div>
        );
      case "Signup":
        return (
          <div>
            <Appbar store={store} />
            <Signup />
          </div>
        );
      case "Home":
        if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2" || localStorage.getItem("role") === "0")
          return (
            <div>
              <Appbar store={store} />
              <Home />
            </div>
          );
        else
          return (
            <div>
              <Appbar store={store} />
              <Error />
            </div>
          );
      case "Show":
        if (localStorage.getItem("role") === "2")
          return (
            <div>
              <Appbar store={store} />
              <Show />
            </div>
          );
        else
          return (
            <div>
              <Appbar store={store} />
              <Error />
            </div>
          );
      case "Courses":
        if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2" || localStorage.getItem("role") === "0")
          return (
            <div>
              <Appbar store={store} />
              <Courses />
            </div>
          );
        else
          return (
            <div>
              <Appbar store={store} />
              <Error />
            </div>
          );

      case "CourseDetails":
        if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2" || localStorage.getItem("role") === "0")
          return (
            <div>
              <Appbar store={store} />
              <CourseDetails />
            </div>
          );
        else
          return (
            <div>
              <Appbar store={store} />
              <Error />
            </div>
          );

      case "Dashboard":
        if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2" || localStorage.getItem("role") === "0")
          return (
            <div>
              <Appbar store={store} />
              <Dashboard />
            </div>
          );
        else
          return (
            <div>
              <Appbar store={store} />
              <Error />
            </div>
          );

      case "Contact":
        if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2" || localStorage.getItem("role") === "0") 
          return (
            <div>
              <Appbar store={store} />
              <Contact />
            </div>
          );
        else
          return (
            <div>
              <Appbar store={store} />
              <Error />
            </div>
          );

      case "AssignmentSubmission":
        if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2") // Only roles 1 and 2 can access this
          return (
            <div>
              <Appbar store={store} />
              <AssignmentSubmission />
            </div>
          );
        else
          return (
            <div>
              <Appbar store={store} />
              <Error />
            </div>
          );

      default:
        return (
          <div>
            <Appbar store={store} />
            <Error />
          </div>
        );
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src="/images/lmslogo-removebg-preview.png" className="App-logo" alt="logo" />
        <p>Learning Management System</p>
      </header>
      <div className="App-body">
        <Router>
          <Routes>
            <Route path="/" element={<Page />} />
            <Route path="/course-details" element={<CourseDetails />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/show" element={<Show />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/error" element={<Error />} />
            <Route path="/contact" element={<Contact />} /> 
            <Route path="/assignment-submission" element={<AssignmentSubmission />} /> {/* New AssignmentSubmission route */}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
