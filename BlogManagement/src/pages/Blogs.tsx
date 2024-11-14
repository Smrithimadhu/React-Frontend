import { useEffect, useState } from "react";
import { IBlog } from "../models/IBlog";
import axios from "axios";
import { Link } from "react-router-dom";


const Blogs = () => {
  const [isLoading, setIsLoading] = useState(true); 
  const [blogList, setBlogList] = useState<IBlog[]>([]); 
  const [error, setError] = useState<string | null>(null); 


  useEffect(() => {
    document.title = "Blogs";
  }, []);


  useEffect(() => {
    async function fetchAllBlogs() {
      try {
        const response = await axios.get("http://localhost:8080/api/blogs");
        console.log(response.data);
        setBlogList(response.data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
        console.error("Error fetching blogs:", error); //Better error handling
      }
    }


    fetchAllBlogs();
  }, []);


  return (
    <>
    <h2 style={{textAlign:"center"}}>BLOGS</h2>
      <div className="container mt-5 mb-4">
        <div className="row">
          {isLoading && (
            <div className="col-12 text-center mt-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {error && (
            <div className="col-12 alert alert-danger mt-5" role="alert">
              {error}
            </div>
          )}
          {blogList.map((blog) => (
            <div className="col-md-4 mb-4" key={blog.blogId}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
                    <Link
                      to={`/blogs/view/${blog.blogId}`}
                      className="text-decoration-none"
                    >
                      {blog.title}
                    </Link>
                  </h5>
                  <p className="card-text">Author: {blog.user.username}</p>
                  <p className="card-text">Category: {blog.category}</p>
                  <p className="card-text">
                    Published: {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


export default Blogs;
