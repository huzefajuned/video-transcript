import React from "react";

const CustomRangeInput = ({ min, max, value, onChange }) => {
  const calculateBackgroundColor = () => {
    const percentage = ((value - min) / (max - min)) * 100;
    return `linear-gradient(to right, #5430D9  ${percentage}%, white ${percentage}%, white)`;
  };

  return (
    <input
      type="range"
      className="w-full h-4 mt-2 bg-[#5430D9] rounded-lg appearance-none cursor-pointer slider border-[1px]"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      style={{ background: calculateBackgroundColor() }}
    />
  );
};

export default CustomRangeInput;
