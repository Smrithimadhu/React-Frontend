import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IAuthor } from "../models/IAuthor";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
// import { HelmetProvider } from "react-helmet-async";
//import { Helmet } from "react-helmet-async";

const Registration = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   document.title = "Registration";
  // }, []);

  // <HelmetProvider>
  //   <title>Registration</title>
  // </HelmetProvider>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAuthor>();

  const onSubmit = async (formData: IAuthor) => {
    setIsLoading(true);
    setError(null);
    setIsSaved(false);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users",
        formData
      );
      console.log("Author added:", response.data);
      toast.success("Registration successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/authors"); // Redirect to authors page
      }, 2000);
      reset();
    } catch (error: any) {
      setError(
        error.response?.data?.error ||
          error.message ||
          "An unexpected error occurred."
      );
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Error adding author:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    {/* <HelmetProvider>
      <title>Registration</title>
    </HelmetProvider> */}
    <div className="container">
      <ToastContainer />
      <div className="row">
        <div className="col-md-12">
          <br></br>
          <h1 className="text-center">REGISTRATION</h1>
          <br></br>
          <br></br>
        </div>
        <form
          className="col-md-6 offset-md-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group row mb-3">
            <label htmlFor="nameInput" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                placeholder="Enter Name"
                {...register("username", {
                  required: "Name is required",
                  minLength: {
                    value: 5,
                    message: "Name must be at least 5 characters",
                  },
                })}
              />
              {errors.username && (
                <div className="invalid-feedback">
                  {errors.username.message}
                </div>
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
            <label htmlFor="passwordInput" className="col-sm-2 col-form-label">
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
    </>
    
  );
};

export default Registration;
