import React from "react";

import "./Header.css";

export const Header = () => {
  return (
    <div className="headerContainer">
      <div className="logo">
        <img src="icon.png" alt="tracker" />
      </div>
      <div>
        <h1>Task Time Tracker</h1>
      </div>
    </div>
  );
};
