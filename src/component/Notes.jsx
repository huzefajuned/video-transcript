import React from "react";

const Notes = () => {
  return (
    <div className="">
      <p>Notes</p>
      <textarea
        placeholder="Write Your Notes here"
        className="w-full p-2  rounded outline-none"
        rows="4"
      ></textarea>
    </div>
  );
};

export default Notes;
