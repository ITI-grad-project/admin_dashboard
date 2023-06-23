import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useState } from "react";

function RangeInput({ Values, setValues, MIN, MAX }) {
  // console.log("Values", Values);

  return (
    <>
      <div className="flex gap-3 mb-10">
        <div className="border-2 text-[15px] font-[600] text-[#3d3b3b] border-[#ECE8E8] w-28 text-center p-3 rounded-lg">
          {Values[0]}
        </div>
        <div className="text-[15px] font-[600] text-[#3d3b3b] w-6 text-center p-3 rounded-lg">
          -
        </div>
        <div className="border-2 text-[15px] font-[600] text-[#3d3b3b] border-[#ECE8E8] w-28 text-center p-3 rounded-lg">
          {Values[1]}
        </div>
      </div>
      <RangeSlider min={MIN} max={MAX} value={Values} onInput={setValues} />
    </>
  );
}

export default RangeInput;
