import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { IAuthor } from "../../models/IAuthor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

const AuthorDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [authorDetail, setAuthorDetail] = useState<IAuthor | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  const { userId } = useParams();

  // useEffect(() => {
  //   document.title = "Author Details";
  // }, []);

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${userId}`
        );
        setAuthorDetail(response.data);
      } catch (error: any) {
        setError(error.message);
        console.error("Error fetching author:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchAuthorDetails();
    }
  }, [userId]);

  const handleEdit = () => {
    navigate(`/authors/edit/${userId}`);
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this author? This action cannot be undone."
      )
    ) {
      setIsLoading(true);
      setError(null);
      setDeleteSuccess(false);

      try {
        await axios.delete(`http://localhost:8080/api/users/delete/${userId}`);
        setDeleteSuccess(true);
        setTimeout(() => {
          navigate("/authors");
        }, 2000);
      } catch (error: any) {
        setError(error.message);
        console.error("Error deleting author:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCreateBlog = () => {
    navigate(`/blogs/create/${userId}`);
  };

  const handleViewBlogs = () => {
    navigate(`/blogs/user/${userId}`);
  };

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Author deleted successfully!", {
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
    <div className="container mt-5">
      <Helmet>
        <title>Author Details</title>
      </Helmet>
      <ToastContainer /> {/* Add ToastContainer here */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          {isLoading && (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}

          {authorDetail && (
            <div className="card">
              <div
                className="card-body p-4"
                style={{
                  backgroundImage:
                    "url('https://thumbs.dreamstime.com/b/abstract-blurred-orange-color-peach-background-blur-festival-lights-outdoor-pink-bubble-focus-texture-decoration-244967691.jpg?w=360')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  margin: "0%",
                  padding: "0%",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
                  textAlign: "center",
                }}
              >
                <p className="card-text">
                  <strong>Name: </strong> {authorDetail.username}
                </p>
                <p className="card-text">
                  <strong>Email: </strong> {authorDetail.email}
                </p>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <button
                    className="btn btn-primary pe-4 ps-4"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ms-4 pe-3 ps-3"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="row mt-3 d-flex justify-content-center">
        <div className="col-md-4">
          <button
            className="btn btn-success btn-block pe-4 ps-4 ms-4"
            style={{ marginLeft: "50px" }}
            onClick={handleCreateBlog}
          >
            Create Blog
          </button>
          <button
            className="btn btn-info btn-block ms-4 pe-3 ps-3"
            style={{ marginLeft: "50px" }}
            onClick={handleViewBlogs}
          >
            View My Blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetails;
