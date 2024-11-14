// Authors.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IAuthor } from "../models/IAuthor";

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
      <h2 style={{textAlign:"center"}}>AUTHORS</h2>
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
            <div className="col-md-4 mb-4" key={author.userId}>
              <div className="card shadow-sm">
                <div className="card-body" style={{textAlign:"center"}}>
                  <h5 className="card-title">
                    <Link
                      to={`/authors/${author.userId}`} // Ensure this points to the AuthorDetails
                      className="text-decoration-none"
                    >
                      {author.username}
                    </Link>
                  </h5>
                  <p className="card-text">Email: {author.email}</p> {/* Updated to show email */}
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

