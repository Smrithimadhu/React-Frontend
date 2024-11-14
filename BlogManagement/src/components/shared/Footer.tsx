import MenuList from "./MenuList";

const Footer = function () {
  const copyrightYear = 2024;

  return (
    <>
    <hr className="bold-line" style={{color:"white"}} />
    <footer className="text-center text-white">
      <br></br><br></br>
      <MenuList />
      <p>Copyright {copyrightYear} | TheBlogHub</p>
    </footer>
    </>
  );
};

export default Footer;
