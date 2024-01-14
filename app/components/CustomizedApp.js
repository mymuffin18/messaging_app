import Channel from "@sendbird/uikit-react/Channel";
import ChannelList from "@sendbird/uikit-react/ChannelList";
import ChannelSettings from "@sendbird/uikit-react/ChannelSettings";
import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import React, { useState } from "react";
import CustomChannelHeader from "./CustomChannelHeader";

const CustomizedApp = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [currentChannelUrl, setCurrentChannelUrl] = useState(null);
  const store = useSendbirdStateContext();

  const sdk = sendbirdSelectors.getSdk(store);
  const onEditProfileSuccess = async (user) => {
    console.log("user", user);
    // updateUserProfile(user.nickname, user.plainProfileUrl)
    //   .then((user) => console.log("updated user", user))
    //   .catch((error) => console.log("error", error));
    return null;
  };

  const updateMessageCount = async () => {
    try {
      console.log("channelUrl", currentChannelUrl);
      // update message count from db when user sends a message
      await fetch("api/channels", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channelUrl: currentChannelUrl,
        }),
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const onBeforeSendUserMessage = (text) => {
    updateMessageCount();
    return { message: text };
  };

  const onBeforeSendFileMessage = (file) => {
    updateMessageCount();
    return { file: file };
  };

  return (
    <div className="sendbird-app__wrap">
      <div className="sendbird-app__channellist-wrap">
        <ChannelList
          allowProfileEdit={true}
          onChannelSelect={(channel) => setCurrentChannelUrl(channel.url || "")}
          onProfileEditSuccess={onEditProfileSuccess}
          renderHeader={() => <CustomChannelHeader />}
        />
      </div>
      <div className="sendbird-app__conversation-wrap">
        <Channel
          channelUrl={currentChannelUrl}
          onChatHeaderActionClick={() => setShowSettings(true)}
          onBeforeSendUserMessage={onBeforeSendUserMessage}
          onBeforeSendFileMessage={onBeforeSendFileMessage}
        />
      </div>
      {showSettings && (
        <div className="sendbird-app__settingspanel-wrap">
          <ChannelSettings
            channelUrl={currentChannelUrl}
            onCloseClick={() => {
              setShowSettings(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CustomizedApp;
