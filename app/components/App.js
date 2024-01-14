"use client";
import React, { useEffect, useState } from "react";
import SendBirdApp from "@sendbird/uikit-react/App";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import CustomizedApp from "./CustomizedApp";
import Modal from "./Modal";

const App = () => {
  const [user, setUser] = useState({
    identifier: "",
    nickname: "",
    accessToken: "",
  });

  const [isOpen, setIsOpen] = useState(true);

  const APP_ID = process.env.NEXT_PUBLIC_APP_ID;

  return (
    <div className="App">
      <SendbirdProvider
        appId={APP_ID}
        userId={user.identifier}
        accessToken={user.accessToken}
      >
        <CustomizedApp />
      </SendbirdProvider>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={user}
        setUser={setUser}
      />
    </div>
  );
};

export default App;
