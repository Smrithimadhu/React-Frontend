import { useEffect, useState } from "react";
import { IBlog } from "../../models/IBlog";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


const MyBlogs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [myBlogList, setMyBlogList] = useState<IBlog[]>([]);
  const [error, setError] = useState<string | null>(null);


  const { userId } = useParams();


  useEffect(() => {
    document.title = "My Blogs";
  }, []);


  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/blogs/user/${userId}`);
        setMyBlogList(response.data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
        console.error("Error fetching blogs:", error);
      }
    };


    fetchMyBlogs();
  }, [userId]);


  return (
    <>
      <h2 style={{ textAlign: "center" }}>MY BLOGS</h2>
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
          {myBlogList.length === 0 && !isLoading && !error && (
            <div className="col-12 text-center mt-5">
              <p>No blogs have been posted yet.</p>
            </div>
          )}
          {myBlogList.map((blog) => (
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
                  <p className="card-text">Category: {blog.category}</p>
                  <p className="card-text">
                    Published: {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <Link to={`/blogs/edit/${blog.blogId}`} className="btn btn-success me-4">Edit</Link> {/* Updated Edit Link */}
                  <Link to={`/blogs/delete/${blog.blogId}`} className="btn btn-danger">Delete</Link> {/* Updated Delete Link */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


export default MyBlogs;
