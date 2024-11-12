import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IAuthor } from "../models/IAuthor"; // Remember to define this interface

const Registration = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    document.title = "Registration";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthor>();

  const onSubmit = async (formData: IAuthor) => {
    setImageError(true);
    setIsLoading(true);
    setError(null);
    setIsSaved(false);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users",
        formData
      );
      console.log("Author added:", response.data);
      setIsSaved(true);
      setError(null);
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred.";
      if (error.response) {
        if (error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error;
        } else if (error.response.status === 400) {
          errorMessage = "Bad Request: Please check your input";
        } else {
          errorMessage = `Server error (${error.response.status})`;
        }
      } else if (error.request) {
        errorMessage = "Network error: Please check your internet connection";
      }
      setError(errorMessage);
      console.error("Error adding author:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6">
          <br></br>
          <img
            src="https://thumbs.dreamstime.com/b/d-white-people-writing-registration-notebook-page-renderer-illustration-isolated-background-54642564.jpg" // Replace with your image path
            alt="Registration Image"
            className="img-fluid"
            onError={() => setImageError(true)}
            style={{ maxWidth: "auto", height: "450px" }}
          />
          <br></br>
          {imageError && (
            <p className="text-danger">Error loading image. Please try again later.</p>
          )}
        </div>
        <div className="col-md-6">
          <br></br>
          <h1 className="text-center">Registration</h1>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group row mb-3">
              <label htmlFor="nameInput" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Enter Name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <div className="invalid-feedback">Name is required</div>
                )}
              </div>
            </div>
            <div className="form-group row mb-3">
              <label htmlFor="emailInput" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Enter Email"
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                />
                {errors.email && (
                  <div className="invalid-feedback">
                    {errors.email.type === "required" && "Email is required"}
                    {errors.email.type === "pattern" &&
                      "Email seems to be not valid"}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group row mb-3">
              <label
                htmlFor="passwordInput"
                className="col-sm-2 col-form-label"
              >
                Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])/,
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>
            </div>

            {isLoading && <div className="alert alert-info">Saving...</div>}
            {isSaved && (
              <div className="alert alert-success">Saved Successfully</div>
            )}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="form-group row">
              <div className="col-sm-10 offset-sm-2">
                <button
                  type="submit"
                  className="btn btn-primary submitBtn"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
