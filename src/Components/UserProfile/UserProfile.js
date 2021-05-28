import { Avatar, Button, Col, Input, Row } from "antd";
import React, { useState } from "react";
import { Text, View } from "react-native";
import useGlobalStyles from "../../Hooks/useGlobalStyles";
import firebase from "firebase";
import { IconButton, Button as MButton } from "@material-ui/core";
import useActionDispatcher from "../../Hooks/useActionDispatcher";
import { useSelector } from "react-redux";
import {
  SET_KEYS_TRUE,
  UPDATE_USER_DATA,
  SET_DASHBOARDKEYS_TRUE,
} from "../../Store/actions";

const UserProfile = ({ state }) => {
  const styles = useGlobalStyles();

  const userData = useSelector((data) => data.globalUserData);
  const dispatchAction = useActionDispatcher();

  const [user, setUser] = useState({
    name: state?.displayName ?? "",
    email: state?.email ?? "",
    mobile: state?.mobile ?? "",
    profilePic: state?.profilePic ?? "",
    city: state?.city ?? "",
    firm: state?.firm ?? "",
    firmAddress: state?.firmAddress ?? "",
    registrationNumber: state?.registrationNumber ?? "",
  });

  const uploadFile = (e) => {
    console.log(e.target.files[0]);
    let storageRef = firebase.storage().ref().child(state.username);

    const task = storageRef.put(e.target.files[0]);
    task.on(
      "state_changed",
      function progress(snapshot) {
        console.log(
          "UPLOADING",
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      function error() {
        console.log("FAILED TRY AGAIN!");
      },

      function complete(event) {
        console.log("UPLOAD COMPLETED");

        storageRef.getDownloadURL().then((url) => {
          setUser((u) => ({
            ...u,
            profilePic: url,
          }));
          dispatchAction(UPDATE_USER_DATA, {
            data: {
              profilePic: url,
            },
          });
          firebase
            .database()
            .ref("/Accounts/" + state.username)
            .update({
              profilePic: url,
            });
        });
      }
    );
  };
  const handleDataChange = (key) => (e) => {
    let value = e.target.value;
    let validInput = key === "mobile" ? parseInt(value) : true;
    if (validInput) {
      setUser((u) => ({
        ...u,
        [key]: value,
      }));
    }
  };
  const handleSubmit = () => {
    //update firebase and global state here
    firebase
      .database()
      .ref("/Accounts/" + state.username)
      .update({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      });
    if (state.isLawyer) {
      firebase
        .database()
        .ref("/Accounts/" + state.username)
        .update({
          city: user.city,
          firm: user.firm,
          firmAddress: user.firmAddress,
          registrationNumber: user.registrationNumber,
        });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Avatar size={80} src={user.profilePic} alt="user" shape="circle" />
      <Text
        style={[
          styles.title,
          { paddingHorizontal: 12, textAlign: "center", marginTop: 8 },
        ]}
      >
        {state.displayName}
      </Text>
      <input
        type="file"
        id="contained-button-file"
        style={{ display: "none" }}
        onChange={uploadFile}
      ></input>

      <label htmlFor="contained-button-file">
        <MButton color="secondary" component="span">
          Upload Profile Picture
        </MButton>
      </label>

      <Input
        style={{ width: "25%" }}
        placeholder="Name"
        value={user.name}
        onChange={handleDataChange("name")}
      />

      <Input
        style={{ width: "25%" }}
        placeholder="Email"
        value={user.email}
        onChange={handleDataChange("email")}
      />

      <Input
        style={{ width: "25%" }}
        type="number"
        placeholder="Mobile"
        value={user.mobile}
        onChange={handleDataChange("mobile")}
      />

      {state.isLawyer ? (
        <div>
          <Row
            gutter={16}
            style={{
              paddingTop: 4,
            }}
          >
            <Col span={24}>
              <Input
                placeholder="City"
                value={user.city}
                onChange={handleDataChange("city")}
              />
            </Col>
          </Row>
          <Row
            gutter={16}
            style={{
              paddingTop: 4,
            }}
          >
            <Col span={24}>
              <Input
                placeholder="firm"
                value={user.firm}
                onChange={handleDataChange("firm")}
              />
            </Col>
          </Row>
          <Row
            gutter={16}
            style={{
              paddingTop: 4,
            }}
          >
            <Col span={24}>
              <Input
                placeholder="firm address"
                value={user.firmAddress}
                onChange={handleDataChange("firmAddress")}
              />
            </Col>
          </Row>
          <Row
            gutter={16}
            style={{
              paddingTop: 4,
            }}
          >
            <Col span={24}>
              <Input
                placeholder="Registration Number"
                value={user.registrationNumber}
                onChange={handleDataChange("registrationNumber")}
              />
            </Col>
          </Row>
        </div>
      ) : null}
      <Row
        gutter={16}
        style={{
          paddingTop: 4,
        }}
      >
        <Col span={24}>
          <MButton
            style={{
              fontWeight: 800,
            }}
            variant="outlined"
            onClick={handleSubmit}
          >
            Update
          </MButton>
        </Col>
      </Row>
    </View>
  );
};

export default UserProfile;
