import MenuList from "./MenuList";

const Footer=function(){
  const copyrightYear=2024;
  return (
    <footer className="text-center">
      <hr/>
      <MenuList />
    <p>Copyright {copyrightYear}|Shree Mithraa</p>
    </footer>
  );
};
export default Footer;