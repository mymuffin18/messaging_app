import React, { useState } from "react";

const Modal = ({ isOpen, setIsOpen, user, setUser }) => {
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");

  const [userIdError, setUserIdError] = useState(false);

  const handleSave = async () => {
    if (userId === "") {
      setUserIdError(true);
    } else {
      try {
        console.log("user", user);
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: userId,
            nickname: nickname,
          }),
        });

        const userResponse = await response.json();
        console.log("userResponse", userResponse);
        setUser({
          identifier: userResponse.user.identifier,
          nickname: userResponse.user.nickname,
          accessToken: userResponse.user.accessToken,
        });
      } catch (error) {
        console.log(error);
      }
      setUserId("");
      setNickname("");
      setUserIdError(false);
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label className="text-base font-medium" htmlFor="">
              User ID
            </label>
            <input
              className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            {userIdError && (
              <span className="text-sm text-red-500">User ID Required</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-base font-medium" htmlFor="nickname">
              Nickname
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-violet-500 text-white text-base font-medium rounded-md w-auto shadow-sm hover:bg-violet-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
