const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white fixed-top navbar-transparent" color-on-scroll={500}>
  <div className="container">
    <div className="navbar-translate">
      <a className="navbar-brand" href="https://demos.creative-tim.com/marketplace/now-ui-kit-pro/presentation.html" rel="tooltip" title data-placement="bottom" data-original-title="Designed by Invision. Coded by Creative Tim" aria-describedby="tooltip47704">
        Now Ui Kit Pro
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-bar bar1" />
        <span className="navbar-toggler-bar bar2" />
        <span className="navbar-toggler-bar bar3" />
      </button>
    </div>
    <div className="collapse navbar-collapse has-image" data-color="orange" style={{background: 'url("./assets/img/blurred-image-1.jpg") 0% 0% / cover'}}>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" id="navbarDropdownMenu" data-toggle="dropdown">
            <i className="now-ui-icons design_app" />
            <p>Components</p>
          </a>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" href="./index.html">
              <i className="now-ui-icons business_chart-pie-36" />
              All Components
            </a>
            <a className="dropdown-item" href="https://creativetimofficial.github.io/now-ui-kit-pro/#/components?ref=nuk-pro-doc">
              <i className="now-ui-icons files_single-copy-04" />
              Documentation
            </a>
          </div>
        </li>
        <li className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown">
            <i className="now-ui-icons files_paper" aria-hidden="true" />
            <p>Sections</p>
          </a>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" href="./sections.html#headers">
              <i className="now-ui-icons shopping_box" />
              Headers
            </a>
            <a className="dropdown-item" href="./sections.html#features">
              <i className="now-ui-icons ui-2_settings-90" />
              Features
            </a>
            <a className="dropdown-item" href="./sections.html#blogs">
              <i className="now-ui-icons text_align-left" />
              Blogs
            </a>
            <a className="dropdown-item" href="./sections.html#teams">
              <i className="now-ui-icons sport_user-run" />
              Teams
            </a>
            <a className="dropdown-item" href="./sections.html#projects">
              <i className="now-ui-icons education_paper" />
              Projects
            </a>
            <a className="dropdown-item" href="./sections.html#pricing">
              <i className="now-ui-icons business_money-coins" />
              Pricing
            </a>
            <a className="dropdown-item" href="./sections.html#testimonials">
              <i className="now-ui-icons ui-2_chat-round" />
              Testimonials
            </a>
            <a className="dropdown-item" href="./sections.html#contactus">
              <i className="now-ui-icons tech_mobile" />
              Contact Us
            </a>
          </div>
        </li>
        <li className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown">
            <i className="now-ui-icons design_image" aria-hidden="true" />
            <p>Examples</p>
          </a>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" href="./examples/about-us.html">
              <i className="now-ui-icons business_bulb-63" />
              About-us
            </a>
            <a className="dropdown-item" href="./examples/blog-post.html">
              <i className="now-ui-icons text_align-left" />
              Blog Post
            </a>
            <a className="dropdown-item" href="./examples/blog-posts.html">
              <i className="now-ui-icons design_bullet-list-67" />
              Blog Posts
            </a>
            <a className="dropdown-item" href="./examples/contact-us.html">
              <i className="now-ui-icons location_pin" />
              Contact Us
            </a>
            <a className="dropdown-item" href="./examples/landing-page.html">
              <i className="now-ui-icons education_paper" />
              Landing Page
            </a>
            <a className="dropdown-item" href="./examples/login-page.html">
              <i className="now-ui-icons users_circle-08" />
              Login Page
            </a>
            <a className="dropdown-item" href="./examples/pricing.html">
              <i className="now-ui-icons business_money-coins" />
              Pricing
            </a>
            <a className="dropdown-item" href="./examples/ecommerce.html">
              <i className="now-ui-icons shopping_shop" />
              Ecommerce Page
            </a>
            <a className="dropdown-item" href="./examples/product-page.html">
              <i className="now-ui-icons shopping_bag-16" />
              Product Page
            </a>
            <a className="dropdown-item" href="./examples/profile-page.html">
              <i className="now-ui-icons users_single-02" />
              Profile Page
            </a>
            <a className="dropdown-item" href="./examples/signup-page.html">
              <i className="now-ui-icons tech_mobile" />
              Signup Page
            </a>
          </div>
        </li></ul></div></div></nav>


  )
}

export default Header