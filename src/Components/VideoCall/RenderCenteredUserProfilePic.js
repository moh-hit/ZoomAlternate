import React from "react";
import { Avatar } from "antd";
import "./RenderCenteredUserProfilePic.css";
/**
 * This Function will render centered user avatar with conditional ripple Effect.
 *
 * @param {String} {src} user profile pic source
 * @param {String} {alt} user name, render if profile pic will not found
 * @param {Boolean} {enableAvatarRipple} if true will enable ripple effect
 * @example
 * <RenderCenteredUserProfilePic src={profilePic} enableAvatarRipple={isRippleOn} alt="John"/>
 *
 */
const RenderCenteredUserProfilePic = ({ src, enableAvatarRipple, alt }) => {
  return (
    <div
      style={{
        backgroundColor: "#212121",
        height: "100%",
        width: "100%",
        zIndex: -1000,
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className={enableAvatarRipple ? "pulse" : ""}
      >
        <Avatar
          size={200}
          src={src}
          alt={alt}
          shape="circle"
          style={{
            border: "2px solid black",
            backgroundColor: "black",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          }}
        />
      </div>
    </div>
  );
};
RenderCenteredUserProfilePic.defaultProps = {
  src: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
  enableAvatarRipple: false,
  alt: "U",
};
export default RenderCenteredUserProfilePic;
