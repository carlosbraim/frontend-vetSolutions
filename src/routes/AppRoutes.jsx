import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home"
import { Setting } from "../pages/Setting";
import  Consultation  from "../pages/Home/components/Consultation";
import  NewConsultation from "../pages/Home/components/NewConsultation"
import PageHome from "../pages/Home/components/pageHome";
import EditConsultation from "../pages/Home/components/Consultation/editConsultation"
import  NewPet from "../pages/Home/components/NewPet"
import Exercise from "../pages/Home/components/exercise"
import Nutrition from "../pages/Home/components/Nutrition";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/pageHome" element={<PageHome/>} />
        <Route path="/consultation" element={<Consultation/>} />
        <Route path="/editconsultation" element={<EditConsultation/>} />
        <Route path="/newconsultation" element={<NewConsultation/>} />
        <Route path="/newpet" element={<NewPet/>} />
        <Route path="/setting" element={<Setting/>} />
        <Route path="/exercise" element={<Exercise/>} />
        <Route path="/nutrition" element={<Nutrition/>} />
      </Routes>
    </BrowserRouter>
  );
}