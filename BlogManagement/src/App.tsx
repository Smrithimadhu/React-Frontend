// App.tsx
import "./App.css";
import "./components/shared/Header";
import Header from "./components/shared/Header";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/shared/Footer";
import Registration from "./pages/Registration";
import Blogs from "./pages/Blogs";
import Authors from "./pages/Authors";
import BlogDetails from "./components/BlogDetails";
import About from "./pages/About";
import AuthorDetails from "./components/AuthorDetails";
import BlogList from "./components/shared/BlogList"; // Import BlogList

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="container mt-5 pt-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/view/:blogId" element={<BlogDetails />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/authors/:userId" element={<AuthorDetails />} />
          <Route path="/authors/:userId/blogs" element={<BlogList />} /> {/* Route for BlogList */}
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
