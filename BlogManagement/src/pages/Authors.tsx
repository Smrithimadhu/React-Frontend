import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IAuthor } from "../models/IAuthor";
import { Helmet } from "react-helmet-async";

const Authors = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [authorList, setAuthorList] = useState<IAuthor[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Authors";
  }, []);

  useEffect(() => {
    async function fetchAllAuthors() {
      try {
        const response = await axios.get("http://localhost:8080/api/users");
        console.log(response.data);
        setAuthorList(response.data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
        console.error("Error fetching authors:", error);
      }
    }

    fetchAllAuthors();
  }, []);

  return (
    <>
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
      <Helmet>
        <title>Authors</title>
      </Helmet>
      <h2 style={{ textAlign: "center" }}>AUTHORS</h2>
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

          {authorList.map((author) => (
            <div className="col-md-4 mb-4 p-4" key={author.userId}>
              <div className="card shadow-sm ">
                <div
                  className="card-body"
                  style={{
                    textAlign: "center",
                    backgroundImage:
                      "url('https://thumbs.dreamstime.com/b/abstract-blurred-orange-color-peach-background-blur-festival-lights-outdoor-pink-bubble-focus-texture-decoration-244967691.jpg?w=360')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    width: "100%",
                  }}
                >
                  <h5 className="card-title">
                    <Link
                      to={`/authors/${author.userId}`}
                      className="text-decoration-none"
                    >
                      {author.username}
                    </Link>
                  </h5>
                  <p className="card-text">Email: {author.username}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Authors;
