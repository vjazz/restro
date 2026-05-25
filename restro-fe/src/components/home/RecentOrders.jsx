import { FaSearch } from "react-icons/fa";
import { Orders } from "../../pages";
import OrderList from "./OrderList";

const RecentOrders = () => {
  return (
    <div className="mt-8 px-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Recent Orders</h1>
        <a className="text-sm text-blue-500">View All</a>
      </div>

      <div className="flex items-center gap-4 rounded-md px-4 py-2 border border-gray-300 w-full">
        <FaSearch className="text-black-400" />
        <input
          type="text"
          placeholder="Search Recent Orders..."
          className=" placeholder:text-gray-400 focus:outline-none"
        />
      </div>

      {/* Orders List */}
      <div className="mt-4 px-6 overflow-y-auto h-72 scrollbar-hide">
        <OrderList />
        <OrderList />
        <OrderList />
        <OrderList />
        <OrderList />
        <OrderList />
      </div>
    </div>
  );
};

export default RecentOrders;
