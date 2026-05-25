import { FaCheckDouble, FaCircle } from "react-icons/fa";

const OrderList = () => {
  return (
    <div className="flex items-center gap-5">
      <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">
        AM
      </button>
      <div className="flex items-center gap-4 justify-between rounded-md px-4 py-2 w-full">
        <div className="flex-col items-start">
          <h1 className="text-sm font-bold">Vinayak</h1>
          <p className="text-xs text-gray-500">2 items - $25.00</p>
        </div>
        <div>
          <h1 className="text-yellow-500 border-amber-600 font-semibold border rounded-lg">
            Table no: 5
          </h1>
        </div>
        <div className="flex flex-col items-start gap-1">
          <p className="text-sm text-gray-500">
            <FaCheckDouble /> Status
          </p>
          <p className="text-xs text-green-500 font-semibold">
            <FaCircle /> Ready to Serve
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
