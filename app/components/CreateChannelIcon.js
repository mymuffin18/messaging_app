import React from "react";

const CreateChannelIcon = ({ onClick }) => {
  return (
    <div className="sendbird-channel-header__right-icon">
      <button
        className="sendbird-iconbutton"
        style={{ height: "32px", width: "32px" }}
        onClick={onClick}
      >
        <span className="sendbird-iconbutton__inner">
          <div
            className="sendbird-icon sendbird-icon-create sendbird-icon-color--primary"
            role="button"
            tabIndex={0}
            style={{
              width: "24px",
              minWidth: "24px",
              height: "24px",
              minHeight: "24px",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
              <path
                fill="#000"
                fillRule="evenodd"
                d="M32 2.667C48.2 2.667 61.333 15.8 61.333 32S48.2 61.333 32 61.333c-4.455 0-8.679-.993-12.461-2.77l-1.753.58q-8.947 2.868-12.504 1.981-4.198-1.047-1.657-3.663 1.757-2.094 2.928-5.234.934-2.502-.737-7A29.15 29.15 0 0 1 2.666 32C2.667 15.8 15.8 2.667 32 2.667M32 8C18.745 8 8 18.745 8 32c0 3.5.747 6.88 2.168 9.978l.405.837.137.271.106.285c1.517 4.085 1.89 7.622.734 10.72l-.382.972-.192.433.235-.05a62 62 0 0 0 4.886-1.363l1.721-.568 2.04-.696 1.95.917A23.9 23.9 0 0 0 32 56c13.255 0 24-10.745 24-24S45.255 8 32 8m2.667 16v5.333H40c3.556 0 3.556 5.334 0 5.334h-5.333V40c0 3.556-5.334 3.556-5.334 0v-5.333H24c-3.556 0-3.556-5.334 0-5.334h5.333V24c0-3.556 5.334-3.556 5.334 0"
                className="icon-create_svg__fill"
              ></path>
            </svg>
          </div>
        </span>
      </button>
    </div>
  );
};

export default CreateChannelIcon;
