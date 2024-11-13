import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { IAuthor } from "../../models/IAuthor";
import { IBlogCreation } from "../../models/IBlogCreation";
 // Adjust path as needed

const CreateBlog = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IAuthor | null>(null); //Added to hold user data

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
        const response = await axios.get(`http://localhost:8080/api/users/${userId}`); 
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
      //Checking if user data was fetched successfully
      if (!user) {
        throw new Error("User data not loaded. Please try again later.");
      }

      // including user data in the formData
      const completeFormData = {...formData, user};

      const response = await axios.post(`http://localhost:8080/api/blogs/create/${userId}`, completeFormData); //removed hardcoded url
      console.log("Blog created:", response.data);
      setIsSaved(true);
      setError(null);
      reset();
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          err.message ||
          "An unexpected error occurred. See console for details."
      );
      console.error("Error creating blog:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>Create New Blog</h1>
        </div>
        <form className="col-md-8 offset-md-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="title">Title</label>
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
            <label htmlFor="category">Category</label>
            <input
              type="text"
              className={`form-control ${errors.category ? "is-invalid" : ""}`}
              {...register("category", { required: "Category is required" })}
            />
            {errors.category && (
              <div className="invalid-feedback">{errors.category.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              className={`form-control ${errors.content ? "is-invalid" : ""}`}
              rows={8}
              {...register("content", {
                required: "Content is required",
                minLength: { value: 50, message: "Content must be at least 50 characters" },
              })}
            />
            {errors.content && (
              <div className="invalid-feedback">{errors.content.message}</div>
            )}
          </div>

          {isLoading && <p>Saving...</p>}
          {isSaved && <p>Blog created successfully!</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;

