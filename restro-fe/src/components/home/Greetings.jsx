import React, { useState, useEffect } from "react";

const Greetings = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-between items-center px-8 mt-5">
      <div>
        <h1 className="text-2xl font-bold">Good Morning, John!</h1>
        <p className="text-gray-500">Give you the best service.</p>
      </div>
      <div>
        <h1>
          {dateTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </h1>
        <p>{dateTime.toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Greetings;
