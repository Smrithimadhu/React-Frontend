// BlogList.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { IBlog } from '../../models/IBlog'; // Import your IBlog interface

const BlogList: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // Get the userId from URL params
  const [blogs, setBlogs] = useState<IBlog[]>([]); // State for storing blogs
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/blogs/user/${userId}`); // Fetch blogs for the specific author
        console.log(response.data); // Log the response data
        setBlogs(Array.isArray(response.data) ? response.data : []); // Ensure it's an array
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching blogs.");
      }
    };
    fetchBlogs();
  }, [userId]);

  const handleDelete = async (blogId: number) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:8080/api/blogs/delete/${blogId}`); // Delete blog by blogId
        setBlogs(blogs.filter(blog => blog.blogId !== blogId)); // Remove the deleted blog from state
        alert("Blog deleted successfully.");
      } catch (err: any) {
        setError(err.message || "An error occurred while deleting the blog.");
      }
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>; // Display error
  if (blogs.length === 0) return <div>No blogs found for this author.</div>; // Show if no blogs are found

  return (
    <div className="container mt-5">
      <h2 className="text-center">Blogs by Author</h2>
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-md-4 mb-4" key={blog.blogId}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">Username: {blog.user.username}</p>
                <p className="card-text">Category: {blog.category}</p>
                <p className="card-text">Published: {new Date(blog.createdAt).toLocaleDateString()}</p>
                <div className="d-flex justify-content-between">
                  <Link to={`/blogs/${blog.blogId}/edit`} className="btn btn-warning">Edit</Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(blog.blogId)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
