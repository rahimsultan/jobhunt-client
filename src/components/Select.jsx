import React from "react";

const Select = () => {
  return (
    <div>
      <label
        htmlFor="HeadlineAct"
        className="block text-sm  font-medium text-gray-900"
      >
        Select Industry
      </label>

      <select
        name="HeadlineAct"
        id="HeadlineAct"
        className="mt-1.5 w-full rounded-lg border-gray-300 p-2 border outline-none text-gray-700 sm:text-sm"
      >
        <option value="Web Development">Web Development</option>
        <option value="Digital Marketing">Digital Marketing</option>
        <option value="Graphics Design">Graphics Design</option>
      </select>
    </div>
  );
};

export default Select;
