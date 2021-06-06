import { Button, Col, Row, Select, Steps } from "antd";
import { Option } from "antd/lib/mentions";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";
import { lawyerSpecialties } from "../utils/LawyerSpecialtiesList";
import useActionDispatcher from "../../Hooks/useActionDispatcher";
import { useSelector } from "react-redux";
import { SET_KEYS_TRUE, UPDATE_USER_DATA } from "../../Store/actions";
import { Image, Text, TouchableHighlight, View } from "react-native";
import useGlobalStyles from "../../Hooks/useGlobalStyles";
import { AddBox, Notifications } from "@material-ui/icons";

//google maps

let iconMarker = new window.google.maps.MarkerImage(
  "https://www.pikpng.com/pngl/m/202-2029870_select-a-svg-png-free-download-comments-lawyer.png",
  null /* size is determined at runtime */,
  null /* origin is 0,0 */,
  null /* anchor is bottom center of the scaled image */,
  new window.google.maps.Size(32, 32)
);

var lat;
var long;
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}




const SIDEBAR_MENUS = {
  NEW_MEETING: {
    name: "New meeting",
    primary: true,
    key: "new_meeting"
  },
  SCHLD_MEETING: {
    name: "Scheduled meetings",
    primary: false,
    key: "schld_meeting",
    active: true
  },
  ACTIVE_USERS: {
    name: "Active users",
    primary: false,
    key: "active_users"
  },
  CALL_RCRDINGS: {
    name: "Call Recordings",
    primary: false,
    key: "call_recordings"
  },
  CALL_LOGS: {
    name: "Call Logs",
    primary: false,
    key: "call_logs"
  }

}
const SCHLDCARD_DETAILS = [
  { title: "Weekly round-up Weekly round-up", timing: "02:30pm - 03:30pm", guest: "Mandeep Sharma" },
  { title: "MJ Clients", timing: "02:30pm - 03:30pm", guest: "Mandeep Sharma" },
  { title: "Visco Follow up", timing: "02:30pm - 03:30pm", guest: "Mandeep Sharma" },
  { title: "Team Sync", timing: "02:30pm - 03:30pm", guest: "Mandeep Sharma" },
  { title: "Design Rollout", timing: "02:30pm - 03:30pm", guest: "Mandeep Sharma" },
]

const RenderFindLawyer = ({ }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const dispatchAction = useActionDispatcher();
  const styles = useGlobalStyles();

  useEffect(() => {
    console.log("use effect, find lawyer ");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      },
      error,
      options
    );
  }, []);

  const handlePrev = () => {
    setCurrentIndex((c) => {
      if (c === 0) {
        return 0;
      } else {
        return c - 1;
      }
    });
  };

  const handleNext = () => {
    setCurrentIndex((c) => {
      if (c === 1) {
        return 1;
      } else {
        return c + 1;
      }
    });
  };


  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    //navigateto userpage
    dispatchAction(SET_KEYS_TRUE, {
      keys: ["userPage"],
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };


  return (
    <View style={{ flex: 1 }}>
      <View style={styles.navbar}>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Image source={{ uri: "https://www.backbase.com/wp-content/uploads/2020/05/Microsoft-Logo-PNG-Transparent.png" }} style={styles.companyLogoNav} />
          <div className="vertical-seperator"></div>
          <Text style={styles.logoNav}>InConnect</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Notifications style={{ color: "rgba(0,0,0,0.5)", fontSize: 28 }} />
          <Image source={{ uri: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" }} style={styles.userProfileNav} />
        </View>
      </View>
      <Row>
        <Col xs={2}>
          <View style={styles.sidebarContainer}>
            <View style={{ alignItems: "flex-start" }}>
              {Object.values(SIDEBAR_MENUS).map((menu, index) => (
                <TouchableHighlight style={[menu.primary ? styles.sidebarPrimaryBut : styles.sidebarSecBut, { backgroundColor: menu.active ? "#F5F5F5" : menu.primary ? "#6626EF" : "#fff" }]}>
                  <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {menu.primary && <AddBox style={{ color: "#fff", fontSize: 20 }} />}
                    <Text style={menu.primary ? styles.sidebarPrimaryButText : styles.sidebarSecButText}>{menu.name}</Text>
                  </View>
                </TouchableHighlight>
              ))}
            </View>
            <View style={{ marginBottom: "3vh" }}>
              <View style={styles.adBanner}>
                <View style={{ alignItems: "flex-start" }}>
                  <Text style={styles.adBannerT1}>50% off on 10 users</Text>
                  <Text style={styles.adBannerT2}>Lorem ipsum dolor sit amet lorem.</Text>
                </View>
                <Text style={styles.adBannerBtn}>Know More</Text>
              </View>
            </View>
          </View>
        </Col>
        <Col xs={10}>
          <Row xs={1} md={4}>
            {SCHLDCARD_DETAILS.map((detail, index) => (
              <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                <View style={styles.schldCard}>
                  <View>
                    <Text style={styles.schldCardT1}>{detail.title}</Text>
                    <Text style={styles.schldCardT2}>{detail.timing}</Text>
                    <Text style={styles.schldCardT3}>Invited Guest</Text>
                    <Text style={styles.schldCardT4}>{detail.guest}</Text>
                  </View>
                  <View style={styles.schldCardActionContainer}>
                    <Text style={{ fontWeight: "700", textTransform: "uppercase", color: "#6626EF", fontSize: 12 }}>Edit</Text>
                    <Text style={{ fontWeight: "700", textTransform: "uppercase", color: "#6626EF", fontSize: 12 }}>Start Meeting</Text>
                  </View>
                </View>
              </Col>
            ))}
          </Row>

        </Col>
      </Row>
    </View >
  );
};

export default RenderFindLawyer;
