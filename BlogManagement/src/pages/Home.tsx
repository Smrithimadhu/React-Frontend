import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
    <Helmet>
        <title>Home</title>
      </Helmet>
    <div className="container-fluid">
      <div
        className="px-4 py-5 my-5 text-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/abstract-gradient-geometric-shape-background_127747-79.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          margin: "0%",
          padding: "0%",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
        }}
      >
        <img
          className="d-block mx-auto mb-4"
          src="https://www.linknacional.com.br/wp-content/uploads/2017/09/blog-1080x675-1.png"
          alt=""
          width="75"
          height="60"
        />
        <h1
          className="display-5 fw-bold text-body-emphasis"
          style={{ color: "white" }}
        >
          Streamline Your Blogging
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Elevate your blogging experience with TheBlogHub, the intuitive
            platform designed for effortless content creation and management.
            Craft, organize, and publish your posts with ease, and watch your
            audience grow. Join us today and transform the way you blog.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link type="button" className="btn btn-primary btn-lg px-4 gap-3" to={"/registration"}>
              Register
            </Link>
          </div>
        </div>
      </div>

      <div
        className="row flex-lg-row-reverse align-items-center g-5 py-5 mt-5"
        style={{ backgroundColor: "#5DE2E7" }}
      >
        <div className="col-6 col-sm-6 col-lg-5">
          <img
            src="https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg"
            className="d-block mx-lg-auto img-fluid"
            alt="Bootstrap Themes"
            width={700}
            height={500}
            loading="lazy"
          />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
            Effortless Publishing, Amplified Reach
          </h1>
          <p className="lead">
            TheBlogHub simplifies content creation and publishing. Focus on your
            message while we handle the technicalities. Share your insights
            effortlessly with a global audience. Join us and elevate your
            blogging experience today.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Link
              type="button"
              className="btn btn-primary btn-lg px-4 me-md-2"
              to={"/blogs"}
            >
              View Blog
            </Link>
          </div>
        </div>
      </div>

      <div
        className="row align-items-center g-5 py-5 mt-5"
        style={{ backgroundColor: "#FF8001" }}
      >
        <div className="col-lg-6 order-lg-2">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
            Your Blogging Partner
          </h1>
          <p className="lead">
            At TheBlogHub, we are passionate about empowering creators to share
            their voices with the world. We believe in the power of storytelling
            and strive to foster a community where ideas can flourish. Join us
            on this journey to transform your blogging experience and connect
            with a global audience.{" "}
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Link
              type="button"
              className="btn btn-primary btn-lg px-4 me-md-2"
              to={"/about"}
            >
              Know About Us
            </Link>
          </div>
        </div>
        <div className="col-6 col-sm-6 col-lg-5 order-lg-1">
          <img
            src="https://th.bing.com/th/id/OIP.bnoGuza_cTsop45ku41G9gHaGJ?w=1328&h=1102&rs=1&pid=ImgDetMain"
            className="d-block mx-lg-auto img-fluid"
            alt="Bootstrap Themes"
            width={700}
            height={500}
            loading="lazy"
          />
        </div>
      </div>
    </div>
    </>
  );
}

export default Home