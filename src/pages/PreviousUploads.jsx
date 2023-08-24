import React, { useEffect, useState } from "react";
import Table from "../component/Table";
import { getLocalStorageData } from "../services";
import { useLocation } from "react-router-dom";

const PreviousUploads = () => {
  const { pathname } = useLocation();

  const [localStorageData, setLocalStorageData] = useState({});

  useEffect(() => {
    console.log("effect in previoos");
    const localStorageData = getLocalStorageData();
    setLocalStorageData(localStorageData);
    if (localStorageData !== {} || localStorageData !== null) {
      // console.log("ok");
    }
    // else if (!url) {
    //   navigate("/");
    //   console.log("test 3");
    // }
  }, [pathname]);
  // console.log("localStorageData dats are", localStorageData);

  return (
    <div className="flex flex-row justify-center items-center  h-full">
      {<Table localStorageData={localStorageData} />}
    </div>
  );
};

export default PreviousUploads;
