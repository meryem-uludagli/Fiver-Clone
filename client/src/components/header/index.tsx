import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const Header = () => {
  return (
    <header className="p-5 shadow">
      <div className="max-w-[1440px] mx-auto flex justify-between gap-4 md:gap-8">
        <Link to="/">
          <img src="/fiverr.png" className="w-[100px]" />
        </Link>

        <form className="flex-1 flex border rounded overflow-hidden max-w[500px]">
          <input type="text" className="w-full h-full px-3 outline-none" />
          <button className="bg-black p-2 text-white text-xl">
            <IoSearch />
          </button>
        </form>
      </div>
    </header>
  );
};
export default Header;
