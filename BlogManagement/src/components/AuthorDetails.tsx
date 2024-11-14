// AuthorDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { IAuthor } from '../models/IAuthor'; // Import your IAuthor interface

const AuthorDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // Get the userId from URL params
  const [author, setAuthor] = useState<IAuthor | null>(null); // Define author type
  const [error, setError] = useState<string | null>(null); // Define error type

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${userId}`); // Fetch author details by userId
        setAuthor(response.data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching author details."); // Handle error message
      }
    };
    fetchAuthorDetails();
  }, [userId]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this author?")) {
      try {
        await axios.delete(`http://localhost:8080/api/users/delete/${userId}`); // Delete author by userId
        alert("Author deleted successfully.");
        window.location.href = "/"; // Redirect to the authors list or homepage
      } catch (err: any) {
        setError(err.message || "An error occurred while deleting the author.");
      }
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>; // Display error
  if (!author) return <div>Loading...</div>; // Show loading state

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <h2>{author.username}</h2>
              <p>Email: {author.email}</p>
              <button className="btn btn-danger" onClick={handleDelete}>Delete Author</button>
              <Link to={`/authors/${userId}/edit`} className="btn btn-warning ms-2">Edit Author</Link>
            </div>
          </div>
          <div className="mt-3 text-center">
            <Link to={`/authors/${userId}/create-blog`} className="btn btn-primary me-2">Create Blog</Link>
            <Link to={`/authors/${userId}/blogs`} className="btn btn-secondary">View Blogs</Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetails;
