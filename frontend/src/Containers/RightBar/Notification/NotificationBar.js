import React from "react";
import { notifications as data } from "../../../demo/notifications";
import Accordian from "./Accordian";

const NotificationBar = () => {
  return (
    <>
      <div className=" m-2 rounded-xl border border-gray-300">
        <div className="py-3 px-5 text-2xl font-semibold border-b border-gray-300">
          Notifications
        </div>
        <div className="flex flex-col divide-y">
          {data.map((item, index) => (
              <Accordian data={item} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default NotificationBar;
