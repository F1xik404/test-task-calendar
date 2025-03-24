import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Navbar from "./components/Navbar/Navbar.tsx";
import Footer from "./components/Footer/Footer.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import DashboardPage from "./pages/DashboardPage/DashboardPage.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import UnauthRoute from "./routes/UnauthRoute.tsx";

function App() {

  return (
    <>

      <BrowserRouter>
          <Navbar/>
        <Routes>
            <Route element={<UnauthRoute/>}>
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>}/>
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
        </Routes>
          <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
