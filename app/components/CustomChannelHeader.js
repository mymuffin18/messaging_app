import React, { useState } from "react";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import Avatar from "./Avatar";
import CreateChannelIcon from "./CreateChannelIcon";
import EditUserProfile from "@sendbird/uikit-react/EditUserProfile";
import CreateChannel from "@sendbird/uikit-react/CreateChannel";

const CustomChannelHeader = () => {
  const {
    stores: {
      userStore: { user },
    },
  } = useSendbirdStateContext();

  const [editProfile, setEditProfile] = useState(false);
  const [createChannel, setCreateChannel] = useState(false);

  const handleEditProfile = async (user) => {
    try {
      await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: user.userId,
          nickname: user.nickname,
          profileUrl: user.plainProfileUrl,
        }),
      });
    } catch (error) {
      console.log("error", error);
    }

    setEditProfile(false);
  };

  const handleCreateChannel = async (channel) => {
    // check if channel created is 1-1 (memberCount === 2)
    // if true then save to db
    if (channel.memberCount === 2) {
      try {
        const response = await fetch("/api/channels", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            channelUrl: channel.url,
            createdBy: channel.creator.userId,
            chatmate: channel.members[1].userId,
          }),
        });

        const apiResponse = await response.json();

        console.log("apiResponse: ", apiResponse);
      } catch (error) {
        console.log("error", error);
      }
    }

    setCreateChannel(false);
  };
  return (
    <div className="sendbird-channel-header send-channel-header--allow-edit">
      <div
        className="sendbird-channel-header__title"
        onClick={() => setEditProfile((b) => !b)}
        role="button"
      >
        <div className="sendbird-channel-header__title__left">
          <Avatar imageUrl={user?.plainProfileUrl} altText={user?.nickname} />
        </div>
        <div className="sendbird-channel-header__title__right">
          <span className="sendbird-channel-header__title__right__name sendbird-label sendbird-label--subtitle-2 sendbird-label--color-onbackground-1">
            {user?.nickname || "(No name)"}
          </span>
          <span className="sendbird-channel-header__title__right__user-id sendbird-label sendbird-label--body-2 sendbird-label--color-onbackground-2">
            {user?.userId || ""}
          </span>
        </div>
      </div>
      <CreateChannelIcon onClick={() => setCreateChannel((b) => !b)} />
      {editProfile && (
        <EditUserProfile
          onCancel={() => setEditProfile((b) => !b)}
          onEditProfile={handleEditProfile}
        />
      )}
      {createChannel && (
        <CreateChannel
          onCancel={() => setCreateChannel((b) => !b)}
          onCreateChannel={handleCreateChannel}
        />
      )}
    </div>
  );
};

export default CustomChannelHeader;
