import React from "react";

const Button = ({ title, px, py, bRadius, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`${px} ${py} ${
          bRadius ? bRadius : "30px"
        } text-white bg-[#5F35F5] cursor-pointer text-[20px] font-semibold font-nunito duration-500 hover:bg-stone-950`}
      >
        {title ? title : "No title"}
      </button>
    </div>
  );
};

export default Button;
