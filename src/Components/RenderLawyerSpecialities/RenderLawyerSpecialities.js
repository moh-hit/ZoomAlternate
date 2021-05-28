import React from "react";
import { View, Image } from "react-native";
import { Button, Select } from "antd";
import useGlobalStyles from "../../Hooks/useGlobalStyles";
import { lawyerSpecialties } from "../utils/LawyerSpecialtiesList";
import { useSelector } from "react-redux";
import useActionDispatcher from "../../Hooks/useActionDispatcher";
import { SET_KEYS_TRUE, UPDATE_USER_DATA } from "../../Store/actions";
import firebase from "firebase";

const { Option } = Select;
const RenderLawyerSpecialities = ({ width, height }) => {
  const styles = useGlobalStyles();
  const state = useSelector((state) => state.globalStateData);
  const userData = useSelector((state) => state.globalUserData);
  const dispatchAction = useActionDispatcher();
  const onSpecialityChange = (value) => {
    dispatchAction(UPDATE_USER_DATA, {
      data: {
        lawyerSpecialities: value,
      },
    });
  };

  const lawyerSubmit = () => {
    //const name= this.state.lawyerName
    const specialities = userData.lawyerSpecialities;
    const tier = userData.lawyerTier;
    console.log(tier, specialities);

    //goto renderuserinfo
    dispatchAction(SET_KEYS_TRUE, {
      keys: ["selectLawyerFirm"],
    });

    //update tier and specialities in firebase
    firebase
      .database()
      .ref("/Accounts/" + userData.username)
      .update({
        tier,
        specialities,
      });
  };
  return (
    <View
      style={{
        maxWidth: "100%",
        width: width,
        height: "100%",
        margin: "auto",
        top: "20%",
      }}
    >
      <View style={{ height: 240 }}>
        <Image
          onClick={() => {
            window.location.href = "/";
          }}
          style={styles.image}
          source={{ uri: "logo.png", width, height }}
        />
      </View>

      <Select
        mode="multiple"
        style={{
          width: "70%",
          marginLeft: "15%",
          minHeight: 40,
          fontSize: 16,
        }}
        placeholder="Please select specialities"
        onChange={onSpecialityChange}
      >
        {lawyerSpecialties.map(function (item, key) {
          return <Option key={item}>{item}</Option>;
        })}
      </Select>
      <Button
        type="primary"
        style={{
          marginLeft: "15%",
          width: "70%",
          height: 40,
          fontSize: 16,
          backgroundColor: "#172A55",
          border: "none",
          marginTop: "2%",
        }}
        onClick={lawyerSubmit}
      >
        Submit
      </Button>
    </View>
  );
};

export default RenderLawyerSpecialities;
