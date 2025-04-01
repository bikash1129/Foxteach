import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Content from "./pages/Content/Content";
import Services from "./pages/services/Services";
import SocialMedia from "./pages/SocialMedia/SocialMedia";
import Webdev from "./pages/Webdevelopment/Webdev";
import Application from "./pages/Application/Application";
import SeoHanding from "./pages/SeoHanding/SeoHanding";
import Personal from "./pages/Personal/Personal";
import Team from "./pages/Team/Team";
import Contact from "./pages/Contact/Contact";
import Events from "./pages/Events/Events";
import About from "./pages/About/About";
import StickyStackedCards from "./pages/Test";
import Dashboard from "./admin/Dashboard";
import AddUser from "./admin/AddUser";
import Login from "./admin/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UserList from "./admin/UserList";
import Event from "./admin/Event";
import NotFoundPage from "./admin/NotFound";
import Testimonial from "./admin/Testal";
import ProfilePage from "./admin/Profile";
import Faq from "./admin/Faq";
import AdminContact from "./admin/AdminContact";
import Test1 from "./pages/Test1";
import ResetPassword from "./admin/ResetPasswordPage";
import PasswordReset from "./admin/PasswordReset";
import AdminTeam from "./admin/AdminTeam";
import CaseStudy from "./admin/CaseStudy";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Services />} />
        <Route path="/content" element={<Content />} />
        <Route path="/social" element={<SocialMedia />} />
        <Route path="/web" element={<Webdev />} />
        <Route path="/application" element={<Application />} />
        <Route path="/seo" element={<SeoHanding />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/event" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/test" element={<StickyStackedCards />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-new-password" element={<PasswordReset />} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-event" element={<Event />} />
        <Route path="/add-test" element={<Testimonial />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact-list" element={<AdminContact />} />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/add-team" element={<AdminTeam />} />
        <Route path="/add-case" element={<CaseStudy />} />
     
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
