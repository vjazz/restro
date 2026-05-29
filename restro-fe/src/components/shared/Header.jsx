import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../https";
import { removeUser } from "../../redux/slices/userSlice";

const Header = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: (res) => {
      console.log("Logout successful:", res);
      dispatch(removeUser()); // Clear user data from Redux store
      navigate("/auth"); // Redirect to login page
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
  const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logout clicked");
    logoutMutation.mutate();
  };

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
            <h1 className="font-semibold">{userData.name || "Test User"}</h1>
            <p className="text-gray-400">{userData.role || "Role"}</p>
          </div>
          <IoLogOut
            onClick={handleLogout}
            className="text-2xl text-gray-400 ml-2"
            size={40}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
