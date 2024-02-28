import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//This method for authentication means only authStatus true user allow for home in app.
export const Protected = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [loader, setLoader] = useState(true);

  useEffect(() => {

    //it is good for use but it is not ok for authentication hence followed below startergy.
    // if(authStatus ===true){
    //     navigate("/")
    // }else if(authStatus===false){
    //     navigate("/login")
    // }

    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);
  return loader ? <h1>Loading...</h1> : <>{children}</>;
};
