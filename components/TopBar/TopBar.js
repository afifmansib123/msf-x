import Image from "next/image";
import React from "react";
import topImage from "../../assets/Header/bhalogari.0bdbffc9.png";
const TopBar = () => {
  return (
    <div>
      <nav class="flex items-center justify-between flex-wrap bg-stone-200 p-3 ">
        <div class="flex items-center flex-shrink-0 text-white ml-32">
          <Image width={60} height={60} src={topImage}></Image>
        </div>
      </nav>
    </div>
  );
};

export default TopBar;
