import { Routes, Route } from "react-router-dom";
import Gigs from "../pages/Gigs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateGig from "../pages/CreateGig";
import GigDetails from "../pages/GigDetails";
import NotFound from "../pages/NotFound";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Gigs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-gig" element={<CreateGig />} />
      <Route path="/gigs/:id" element={<GigDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
