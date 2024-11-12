import MenuList from "./MenuList";

const Footer = function () {
  const copyrightYear = 2024;

  return (
    <footer className="text-center">
      <br></br><br></br>
      <hr />
      <MenuList />
      <p>Copyright {copyrightYear} | TheBlogHub</p>
    </footer>
  );
};

export default Footer;
