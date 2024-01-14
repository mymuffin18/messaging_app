import React from "react";

const Avatar = ({ imageUrl = null, altText = null }) => {
  return (
    <div
      className="sendbird-avatar"
      role="button"
      tabIndex={0}
      style={{ height: "32px", width: "32px", zIndex: 0 }}
    >
      <div
        className="sendbird-avatar-img sendbird-image-renderer"
        style={{
          width: "100%",
          minWidth: "calc(32px)",
          maxWidth: "400px",
          height: "calc(32px)",
        }}
      >
        {imageUrl ? (
          <>
            <div
              className="sendbird-image-renderer__image"
              style={{
                width: "100%",
                minWidth: "calc(32px)",
                maxWidth: "400px",
                height: "calc(32px)",
                position: "absolute",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundImage: `url(${imageUrl})`,
              }}
            ></div>
            <img
              src={imageUrl}
              alt={altText}
              className="sendbird-image-renderer__hidden-image-loader"
            />
          </>
        ) : (
          <div
            className="sendbird-avatar-img--default"
            style={{ width: "32px", height: "32px" }}
          >
            <div
              className="sendbird-icon sendbird-icon-user sendbird-icon-color--content"
              role="button"
              tabIndex={0}
              style={{
                width: "18.4px",
                minWidth: "18.4px",
                height: "18.4px",
                minHeight: "18.4px",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <path
                  fill="#000"
                  fillRule="evenodd"
                  d="M42.667 37.333c7.17 0 13.018 5.66 13.32 12.755l.013.579V56a2.667 2.667 0 0 1-5.315.311L50.667 56v-5.333c0-4.26-3.33-7.743-7.53-7.987l-.47-.013H21.333a8 8 0 0 0-7.986 7.53l-.014.47V56a2.667 2.667 0 0 1-5.316.311L8 56v-5.333c0-7.17 5.66-13.019 12.755-13.321l.578-.013zM32 5.333c7.364 0 13.333 5.97 13.333 13.334S39.363 32 32 32s-13.333-5.97-13.333-13.333S24.637 5.333 32 5.333m0 5.334a8 8 0 1 0 0 16 8 8 0 0 0 0-16"
                  className="icon-user_svg__fill"
                ></path>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Avatar;
