import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Blogs from "./pages/Blogs";
import UpdateAuthor from "./components/authors/UpdateAuthor";
import BlogDetails from "./components/blogs/BlogDetails";
import MyBlogs from "./components/blogs/MyBlogs.tsx";
import UpdateBlog from "./components/blogs/UpdateBlog";
import Authors from "./pages/Authors";
import About from "./pages/About";
import AuthorDetails from "./components/authors/AuthorDetails";
import CreateBlog from "./components/authors/CreateBlog";
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container mt-5 pt-2 text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/blogs/*" element={<BlogRoutes/>}/>
          <Route path="/authors/*" element={<AuthorRoutes/>}/>
          <Route path="/about" element={<About/>}/>
          
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

const BlogRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Blogs />} />
      <Route path="create/:userId" element={<CreateBlog />} />
      <Route path="view/:blogId" element={<BlogDetails />} />
      <Route path="edit/:blogId" element={<UpdateBlog />} />
      <Route path="user/:userId" element={<MyBlogs/>} />
    </Routes>
  );
};

const AuthorRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Authors />} />
      <Route path=":userId" element={<AuthorDetails />} />
      <Route path="edit/:userId" element={<UpdateAuthor />} />
    </Routes>
  );
};

export default App;


