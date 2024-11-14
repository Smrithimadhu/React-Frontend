import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import { Helmet } from "react-helmet-async";
import { IAuthor } from "../../models/IAuthor";

const UpdateAuthor: React.FC = () => {
  const { userId } = useParams();
  const [author, setAuthor] = useState<IAuthor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAuthor, setUpdatedAuthor] = useState<IAuthor | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const numericUserId = parseInt(userId || "", 10);
        if (isNaN(numericUserId)) {
          setError("Invalid User ID");
          return;
        }
        const response = await axios.get<IAuthor>(
          `http://localhost:8080/api/users/${numericUserId}`
        );
        setAuthor(response.data);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to fetch author");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchAuthor();
    }
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (author) {
      setAuthor({ ...author, [e.target.name]: e.target.value });
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !userId) return;

    const newErrors: { [key: string]: string } = {};
    if (!author.username) newErrors.username = "Username is required";
    if (!author.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(author.email))
      newErrors.email = "Valid email is required";

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/users/edit/${userId}`, author);
      setUpdatedAuthor(author);
      setUpdateSuccess(true);
      toast.success("Updated successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate(`/authors/${author.userId}`);
      }, 2000);
    } catch (err: any) {
      toast.error("Update failed", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!author) return <p>Author not found</p>;

  return (
    <>
      <Helmet>
        <title>Update Author</title>
      </Helmet>
      <div
        className="container mt-5  text-black rounded-5"
        style={{
          backgroundImage:
            "url('https://thumbs.dreamstime.com/b/abstract-blurred-orange-color-peach-background-blur-festival-lights-outdoor-pink-bubble-focus-texture-decoration-244967691.jpg?w=360')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
        }}
      >
        <ToastContainer />
        <h2 className="d-flex justify-content-center pt-4">UPDATE AUTHOR</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 px-4">
            <label htmlFor="username" className="form-label">
              <strong>Username:</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={author?.username || ""} //Handle potential null
              onChange={handleInputChange}
              required
            />
            {formErrors.username && (
              <div className="text-danger">{formErrors.username}</div>
            )}
          </div>
          <div className="mb-3 px-4 ">
            <label htmlFor="email" className="form-label">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={author?.email || ""} //Handle potential null
              onChange={handleInputChange}
              required
            />
            {formErrors.email && (
              <div className="text-danger">{formErrors.email}</div>
            )}
          </div>
          <div className="d-flex justify-content-center pb-4">
            <button type="submit" className="btn btn-primary">
              Update Author
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateAuthor;
