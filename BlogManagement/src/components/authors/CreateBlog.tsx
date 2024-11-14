import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { IAuthor } from "../../models/IAuthor";
import { IBlogCreation } from "../../models/IBlogCreation";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet-async";

const CreateBlog = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState<IAuthor | null>(null); // Added to hold user data

  const { userId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IBlogCreation>();

  useEffect(() => {
    // Fetching user details using the userId from useParams
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${userId}`
        );
        setUser(response.data);
      } catch (err) {
        setError(`Failed to fetch user data for user ID ${userId}.`);
        console.error("Error fetching user:", err);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const onSubmit = async (formData: IBlogCreation) => {
    setIsLoading(true);
    setError(null);
    setIsSaved(false);

    try {
      // Checking if user data was fetched successfully
      if (!user) {
        throw new Error("User data not loaded. Please try again later.");
      }

      // Including user data in the formData
      const completeFormData = { ...formData, user };

      const response = await axios.post(
        `http://localhost:8080/api/blogs/create/${userId}`,
        completeFormData
      );
      console.log("Blog created:", response.data);
      toast.success("Blog added successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/blogs");
      }, 2000);
      reset();
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          err.message ||w
          "An unexpected error occurred. See console for details."
      );
      toast.error(err.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Error creating blog:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>Create Blog</title>
      </Helmet>
      <ToastContainer />
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center">CREATE NEW BLOG</h1>
        </div>
        <form
          className="col-md-8 offset-md-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <label htmlFor="title">
              <strong>Title</strong>
            </label>
            <input
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              <strong>Category</strong>
            </label>
            <select
              id="category"
              className={`form-select ${errors.category ? "is-invalid" : ""}`}
              {...register("category", { required: "Category is required" })}
            >
              <option value="">Select Category</option>
              <option value="TECHNOLOGY">TECHNOLOGY</option>
              <option value="TRAVEL">TRAVEL</option>
              <option value="FOOD">FOOD</option>
              <option value="SPORTS">SPORTS</option>
              <option value="POLITICS">POLITICS</option>
            </select>
            {errors.category && (
              <div className="invalid-feedback">{errors.category.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="content">
              <strong>Content</strong>
            </label>
            <textarea
              id="content"
              className={`form-control ${errors.content ? "is-invalid" : ""}`}
              rows={8}
              {...register("content", {
                required: "Content is required",
                minLength: {
                  value: 50,
                  message: "Content must be at least 50 characters",
                },
              })}
            />
            {errors.content && (
              <div className="invalid-feedback">{errors.content.message}</div>
            )}
          </div>

          {isLoading && <p>Saving...</p>}
          {isSaved && <p>Blog created successfully!</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? "Saving..." : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
