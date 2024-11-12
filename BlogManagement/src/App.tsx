import "./App.css";
import "./components/shared/Header";
import Header from "./components/shared/Header";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/shared/Footer";
import Registration from "./pages/Registration";
import About from "./pages/About";
function App() {
  return (
    <BrowserRouter>
      <Header></Header>

      <main className="container mt-5 pt-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </main>

      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
