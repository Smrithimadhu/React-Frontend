import { useEffect, useState } from "react";
import { IBlog } from "../../models/IBlog";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet-async";

const MyBlogs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [myBlogList, setMyBlogList] = useState<IBlog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  const { userId } = useParams();
  useEffect(() => {
    document.title = "My Blogs";
  }, []);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/blogs/user/${userId}`
        );
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

  const handleDelete = async (blogId: number) => {
    if (
      window.confirm(
        "Are you sure you want to delete this author? This action cannot be undone."
      )
    ) {
      setIsLoading(true);
      setError(null);
      setDeleteSuccess(false);
      setMyBlogList((prevBlogs) =>
        prevBlogs.filter((blog) => blog.blogId !== blogId)
      ); // Remove the deleted blog from the list

      try {
        await axios.delete(`http://localhost:8080/api/blogs/delete/${blogId}`);
        setDeleteSuccess(true);
        setTimeout(() => {
          navigate(`/blogs/user/${userId}`);
        }, 2000);
      } catch (error: any) {
        setError(error.message);
        console.error("Error deleting blog:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Blog deleted successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [deleteSuccess]);

  return (
    <>
      <Helmet>
        <title>My Blogs</title>
      </Helmet>
      <ToastContainer />
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
              <h3>
                <strong>No blogs have been posted yet.</strong>
              </h3>
            </div>
          )}
          {myBlogList.map((blog) => (
            <div className="col-md-4 mb-4" key={blog.blogId}>
              <div
                className="card shadow-sm"
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
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-center pb-4">
                    <Link
                      to={`/blogs/view/${blog.blogId}`}
                      className="text-decoration-none text-black"
                    >
                      {blog.title}
                    </Link>
                  </h5>
                  <p className="card-text">
                    <strong>Category: {blog.category}</strong>
                  </p>
                  <p className="card-text">
                    <strong>
                      Published: {new Date(blog.createdAt).toLocaleDateString()}
                    </strong>
                  </p>
                  <Link
                    to={`/blogs/edit/${blog.blogId}`}
                    className="btn btn-success me-4"
                  >
                    Edit
                  </Link>{" "}
                  {/* Updated Edit Link */}
                  <button
                    className="btn btn-danger ms-4 pe-3 ps-3"
                    onClick={() => handleDelete(blog.blogId)}
                  >
                    Delete
                  </button>
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
