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


// import "./components/shared/Header";
// import Header from "./components/shared/Header";
// import "bootstrap/dist/css/bootstrap.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import Footer from "./components/shared/Footer";
// import Registration from "./pages/Registration";
// import Blogs from "./pages/Blogs";
// import Authors from "./pages/Authors";
// import BlogDetails from "./components/BlogDetails";
// import About from "./pages/About";
// import UpdateAuthor from "./components/Author/UpdateAuthor";
// import UpdateBlog from "./components/Blogs/UpdateBlog";


// function App() {
//   return (
//     <BrowserRouter>
//       <Header></Header>


//       <main className="container mt-5 pt-2">
//         <Routes>
        
//           <Route path="/" element={<Home />} />
//           <Route path="/registration" element={<Registration />} />
//           <Route path="/blogs" element={<Blogs />} />
//           <Route path="/blogs/view/:blogId" element={<BlogDetails />} />
//           <Route path="/blogs/edit/:blogId" element={<UpdateBlog />}/>
//           <Route path="/authors" element={<Authors />} />
//           <Route path="/authors/:userId" element={<Authors />} />
//           <Route path="/about" element={<About/>}/>
//           <Route path="/authors/edit/:userId" element={<UpdateAuthor/>}/>
//         </Routes>
//       </main>


//       <Footer></Footer>
//     </BrowserRouter>
//   );
// }


// export default App;