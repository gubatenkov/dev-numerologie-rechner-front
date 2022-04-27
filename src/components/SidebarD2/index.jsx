import React from "react";

const Sidebar = ({ isVisible }) => {
  return (
    <aside className={`register-sidebar ${isVisible ? "visible" : ""}`}>
      sidebar
    </aside>
  );
};

export default Sidebar;
