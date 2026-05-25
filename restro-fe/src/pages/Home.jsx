import React from "react";
import BottomNav from "../components/shared/BottomNav";
import Greetings from "../components/home/Greetings";
import MiniCard from "../components/home/MiniCard";
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import RecentOrders from "../components/home/RecentOrders";
import PopularDishes from "../components/home/PopularDishes";

const Home = () => {
  return (
    <section className="flex items-center h-[calc(100vh-5rem)] justify-center ">
      {/* Left Side */}
      <div className="flex-3 bg-gray-100 h-full">
        <Greetings />
        <div className="flex items-center justify-around mt-8 px-8- gap-3 w-full">
          <MiniCard
            title="Total Earnings"
            icon={<BsCashCoin />}
            number={512}
            footerNum={1.6}
          />
          <MiniCard
            title="In Progress"
            icon={<GrInProgress />}
            number={512}
            footerNum={1.6}
          />
        </div>
        <RecentOrders />
      </div>
      {/* Right Side */}
      <div className="flex-2 h-full">
        <PopularDishes />
      </div>
      <BottomNav />
    </section>
  );
};

export default Home;
