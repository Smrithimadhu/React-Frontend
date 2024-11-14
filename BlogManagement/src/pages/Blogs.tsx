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
    <div>
      {/* <div style={{backgroundImage:"url('https://images.pexels.com/photos/7233099/pexels-photo-7233099.jpeg?auto=compress&cs=tinysrgb&w=800')", backgroundRepeat:"no-repeat",backgroundSize:"cover",width:"100%",height:"100vh"}}> */}
      <style>
        {`
          .card {
            transition: transform 0.3s ease;
          }
          .card:hover {
            transform: scale(1.2);
          }
        `}
      </style>
      <h2 style={{ textAlign: "center" }}>BLOGS</h2>
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
            <div className="col-md-4 mb-4 p-4" key={blog.blogId}>
              <div className="card shadow-sm ">
                <div
                  className="card-body p-4  "
                  style={{
                    backgroundImage:
                      "url('https://images.pexels.com/photos/573130/pexels-photo-573130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    margin: "0%",
                    padding: "0%",
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <h5 className="card-title d-flex justify-content-center pb-4">
                    <Link
                      to={`/blogs/view/${blog.blogId}`}
                      className="text-decoration-none text-black"
                    >
                      {blog.title}
                    </Link>
                  </h5>
                  <p className="card-text">
                    <strong>Author: {blog.user.username}</strong>
                  </p>
                  <p className="card-text">
                    <strong>Category: {blog.category}</strong>
                  </p>
                  <p className="card-text">
                    <strong>
                      Published: {new Date(blog.createdAt).toLocaleDateString()}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
