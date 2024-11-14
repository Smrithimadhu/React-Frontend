import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


interface Blog {
  blogId: number;
  title: string;
  category: string;
  content: string;
}

const UpdateBlog: React.FC = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedBlog, setUpdatedBlog] = useState<Blog | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const numericBlogId = parseInt(blogId || "", 10); 
        if (isNaN(numericBlogId)) {
          setError("Invalid Blog ID");
          return;
        }
        const response = await axios.get<Blog>(`http://localhost:8080/api/blogs/view/${numericBlogId}`);
        setBlog(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (blog) {
      setBlog({ ...blog, [e.target.name]: e.target.value });
      setFormErrors({ ...formErrors, [e.target.name]: '' });
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
      await axios.put(`http://localhost:8080/api/blogs/edit/${numericBlogId}`, blog);
      setUpdatedBlog(blog);
      setUpdateSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update blog');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>; 
  if (!blog) return <p>Blog not found</p>;

  return (
    <>
    <Helmet>
    <title>Update Blog</title>
  </Helmet>;
    <div className="container mt-5" style={{backgroundImage:"url('https://img.freepik.com/premium-vector/modern-geometric-shapes-background-with-gradient-color_120451-49.jpg')",backgroundRepeat:"no-repeat",backgroundSize:"cover",width:"100%"}}>
      {updateSuccess && <div className="alert alert-success">Blog updated successfully!</div>}
      <h2 className='d-flex justify-content-center'>Update Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 px-4">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={blog.title}
            onChange={handleInputChange}
            required
          />
          {formErrors.title && <div className="text-danger">{formErrors.title}</div>}
        </div>
        <div className="mb-3 px-4">
          <label htmlFor="category" className="form-label">Category:</label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={blog.category}
            onChange={handleInputChange}
            required
          />
          {formErrors.category && <div className="text-danger">{formErrors.category}</div>}
        </div>
        <div className="mb-3 px-4">
          <label htmlFor="content" className="form-label">Content:</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            value={blog.content}
            onChange={handleInputChange}
            required
          />
          {formErrors.content && <div className="text-danger">{formErrors.content}</div>}
        </div>
        <div className='d-flex justify-content-center pb-4'>
        <button type="submit" className="btn btn-primary">Update Blog</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default UpdateBlog;
