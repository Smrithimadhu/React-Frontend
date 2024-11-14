import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IBlog } from "../../models/IBlog";
import { Helmet } from "react-helmet-async";

const BlogDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogDetail, setBlogDetail] = useState<IBlog>();
  const [error, setError] = useState<string | null>(null);

  const { blogId } = useParams();

  useEffect(() => {
    async function fetchBlogDetails() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/blogs/view/${blogId}`
        );
        console.log(response.data);
        setBlogDetail(response.data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
        console.error("Error fetching blog details:", error);
      }
    }

    fetchBlogDetails();
  }, [blogId]);

  return (
    <>
      <Helmet>
        <title>Blog Details</title>
      </Helmet>
      <h2 style={{ textAlign: "center" }}>BLOG DETAILS</h2>
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

          <div className="container text-black">
            <h2>{blogDetail?.title}</h2>
            <p>
              <strong>Author: </strong>
              {blogDetail?.user.username}
            </p>
            <p>
              <strong>Category: </strong>
              {blogDetail?.category}
            </p>
            <hr />
            <p>{blogDetail?.content}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
