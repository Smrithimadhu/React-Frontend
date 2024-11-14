import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast, ToastContainer } from "react-toastify";
import { IBlog } from "../../models/IBlog";
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const UpdateBlog: React.FC = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedBlog, setUpdatedBlog] = useState<IBlog | null>(null);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const numericBlogId = parseInt(blogId || "", 10);
        if (isNaN(numericBlogId)) {
          setError("Invalid Blog ID");
          return;
        }
        const response = await axios.get<IBlog>(
          `http://localhost:8080/api/blogs/view/${numericBlogId}`
        );
        setBlog(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (blog) {
      setBlog({ ...blog, [e.target.name]: e.target.value });
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog || !blogId) return;

    const newErrors: { [key: string]: string } = {};
    if (!blog.title) newErrors.title = "Title is required";
    if (!blog.category) newErrors.category = "Category is required";
    if (!blog.content) newErrors.content = "Content is required";

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    try {
      const numericBlogId = parseInt(blogId || "", 10);
      if (isNaN(numericBlogId)) {
        setError("Invalid Blog ID");
        return;
      }
      await axios.put(
        `http://localhost:8080/api/blogs/edit/${numericBlogId}`,
        blog
      );
      setUpdatedBlog(blog);
      if (updatedBlog) {
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
          navigate(`/blogs`);
        }, 2000);
      }
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
  if (!blog) return <p>Blog not found</p>;

  return (
    <>
      <Helmet>
        <title>Update Blog</title>
      </Helmet>
      <div
        className="container mt-5 text-black rounded-5"
        style={{
          backgroundImage:
            "url('https://thumbs.dreamstime.com/b/abstract-blurred-orange-color-peach-background-blur-festival-lights-outdoor-pink-bubble-focus-texture-decoration-244967691.jpg?w=360')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
        }}
      >
        <ToastContainer />
        <h2 className="d-flex justify-content-center pt-4">UPDATE BLOG</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 px-4">
            <label htmlFor="title" className="form-label">
              <strong>Title:</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={blog.title}
              onChange={handleInputChange}
              required
            />
            {formErrors.title && (
              <div className="text-danger">{formErrors.title}</div>
            )}
          </div>
          <div className="mb-3 px-4">
            <label htmlFor="category" className="form-label">
              <strong>Category:</strong>
            </label>
            <select
              id="category"
              className={`form-select ${
                formErrors.category ? "is-invalid" : ""
              }`}
              name="category"
              value={blog.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="TECHNOLOGY">TECHNOLOGY</option>
              <option value="TRAVEL">TRAVEL</option>
              <option value="FOOD">FOOD</option>
              <option value="SPORTS">SPORTS</option>
              <option value="POLITICS">POLITICS</option>
            </select>
            {formErrors.category && (
              <div className="text-danger">{formErrors.category}</div>
            )}
          </div>
          <div className="mb-3 px-4">
            <label htmlFor="content" className="form-label">
              <strong>Content:</strong>
            </label>
            <textarea
              className="form-control"
              id="content"
              name="content"
              value={blog.content}
              onChange={handleInputChange}
              required
            />
            {formErrors.content && (
              <div className="text-danger">{formErrors.content}</div>
            )}
          </div>
          <div className="d-flex justify-content-center pb-4">
            <button type="submit" className="btn btn-primary">
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateBlog;
