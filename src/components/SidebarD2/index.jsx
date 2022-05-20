import React from "react";
import { useUser } from "../../contexts/UserContext";

import AuthBlock from "./components/AuthBlock";
import AuthFooter from "./components/AuthFooter";
import NeedAuthBlock from "./components/NeedAuthBlock";
import NeedAuthFooter from "./components/NeedAuthFooter";

const Sidebar = ({ isVisible, openPopup }) => {
  const User = useUser();

  return (
    <aside className={`register-sidebar ${isVisible ? "visible" : ""}`}>
      {User?.user?.currentUser ? (
        <>
          <AuthBlock user={User?.user?.currentUser} openPopup={openPopup} />
          <AuthFooter />
        </>
      ) : (
        <>
          <NeedAuthBlock />
          <NeedAuthFooter />
        </>
      )}
    </aside>
  );
};

export default Sidebar;
