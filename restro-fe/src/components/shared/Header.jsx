import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 px-8 bg-gray-800 text-white">
      {/* Logo or Brand Name */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Restro Logo" className="h-12 w-12" />
        <h1 className="text-xl font-bold">Restro</h1>
      </div>
      {/* Search */}
      <div className="flex items-center gap-4 bg-gray-700 rounded-md px-4 py-2 w-1/3">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-700 text-white placeholder:text-gray-400 focus:outline-none"
        />
      </div>
      {/* User Login Details  */}
      <div className="flex items-center gap-4">
        <div className="bg-gray-700 rounded-full p-2 cursor-pointer">
          <FaBell className="text-2xl" />
        </div>
        <div className="flex items-center gap-2 bg-gray-700 rounded-full px-4 py-2 cursor-pointer">
          <FaUserCircle className="text-2xl" />
          <div className="flex flex-col text-sm">
            <h1 className="font-semibold">John Doe</h1>
            <p className="text-gray-400">View Profile</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
