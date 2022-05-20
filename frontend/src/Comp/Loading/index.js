import React from "react";
import { Puff } from "svg-loaders-react";

const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Puff stroke="black"></Puff>
    </div>
  );
};

export default Loading;
