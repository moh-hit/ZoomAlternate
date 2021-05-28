import { Button, Col, Row, Select, Steps } from "antd";
import { Option } from "antd/lib/mentions";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";
import { lawyerSpecialties } from "../utils/LawyerSpecialtiesList";
import useActionDispatcher from "../../Hooks/useActionDispatcher";
import { useSelector } from "react-redux";
import { SET_KEYS_TRUE, UPDATE_USER_DATA } from "../../Store/actions";

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

const GoogleMapExample = withGoogleMap((props) => (
  <GoogleMap
    defaultCenter={{ lat: 12.9619, lng: 77.597 }}
    defaultZoom={13}
    options={{
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    }}
  >
    <Marker
      icon={iconMarker}
      position={{ lat: parseFloat(lat), lng: parseFloat(long) }}
    />
    <Marker
      icon={iconMarker}
      position={{ lat: parseFloat(lat + 0.01), lng: parseFloat(long + 0.031) }}
    />
    <Marker
      icon={iconMarker}
      position={{ lat: parseFloat(lat + 0.039), lng: parseFloat(long + 0.03) }}
    />
    <Marker
      icon={iconMarker}
      position={{ lat: parseFloat(lat + 0.025), lng: parseFloat(long + 0.13) }}
    />
    <Marker
      icon={iconMarker}
      position={{ lat: parseFloat(lat + 0.076), lng: parseFloat(long + 0.038) }}
    />
    <Marker
      icon={iconMarker}
      position={{ lat: parseFloat(lat + 0.053), lng: parseFloat(long - 0.066) }}
    />
    <Marker
      icon={iconMarker}
      position={{ lat: parseFloat(lat + 0.045), lng: parseFloat(long - 0.078) }}
    />
    <Marker
      icon={iconMarker}
      position={{ lat: parseFloat(lat + 0.08), lng: parseFloat(long + 0.09) }}
    />
    <Marker
      icon={iconMarker}
      position={{ lat: parseFloat(lat + 0.06), lng: parseFloat(long + 0.09) }}
    />
    <Marker
      icon={iconMarker}
      position={{ lat: parseFloat(lat - 0.03), lng: parseFloat(long - 0.08) }}
    />
    <Marker
      icon={iconMarker}
      position={{ lat: parseFloat(lat + 0.067), lng: parseFloat(long + 0.09) }}
    />
    <Marker
      icon={iconMarker}
      position={{ lat: parseFloat(lat - 0.083), lng: parseFloat(long - 0.098) }}
    />
    <Marker
      icon={iconMarker}
      position={{ lat: parseFloat(lat + 0.019), lng: parseFloat(long + 0.059) }}
    />
    <Marker
      icon={iconMarker}
      position={{ lat: parseFloat(lat - 0.081), lng: parseFloat(long - 0.029) }}
    />
  </GoogleMap>
));

const steps = [
  {
    title: "Select Lawyer Specialties",
  },
  {
    title: "Select Lawyer Tier",
  },
];
const RenderSpecialitySelection = ({ handleSpecialityChange }) => {
  return (
    <Select
      showSearch
      style={{ width: "80%", marginLeft: "5%", height: 40, fontSize: 16 }}
      placeholder="Please select specialities"
      onChange={handleSpecialityChange}
    >
      {lawyerSpecialties.map(function (item, key) {
        return <Option key={item}>{item}</Option>;
      })}
    </Select>
  );
};
const RenderTierSelection = ({ handleTierChange }) => {
  return (
    <Select
      showSearch
      style={{ width: "80%", marginLeft: "5%", height: 40, fontSize: 16 }}
      placeholder="Years of qualification"
      optionFilterProp="children"
      onChange={handleTierChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Option value="X">LawMax X (1-7 years)</Option>
      <Option value="XL">Lawmax XL (8-16)</Option>
      <Option value="EXEC">Lawmax EXEC (>16)</Option>
    </Select>
  );
};

const RenderFindLawyer = ({}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const dispatchAction = useActionDispatcher();

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
  const handleSpecialityChange = () => {
    //store specialities
    handleNext();
  };
  const handleTierChange = () => {
    console.log("save tier and specialities");
  };
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 99,
        }}
      >
        <Button
          type="primary"
          style={{
            position: "fixed",
            left: "6%",
            width: "25%",
            top: "1%",
            backgroundColor: "#172A55",
            color: "white",
            fontSize: 16,
            height: 35,
            paddingLeft: "2%",
          }}
          onClick={showModal}
        >
          Find Lawyer
        </Button>
      </div>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Call Lawyer"
        footer={[
          <Button key="Cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="Find Lawyer" type="primary" onClick={handleOk}>
            Find Lawyer
          </Button>,
        ]}
      >
        <Steps current={currentIndex}>
          {steps.map((item) => (
            <Steps.Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <Row gutter={16}>
          {currentIndex === 0 ? (
            <Col
              span={24}
              style={{
                paddingTop: 20,
                paddingLeft: 8,
              }}
            >
              <RenderSpecialitySelection
                handleSpecialityChange={handleSpecialityChange}
              />
            </Col>
          ) : null}
          {currentIndex === 1 ? (
            <Col
              span={24}
              style={{
                paddingTop: 20,
                paddingLeft: 8,
              }}
            >
              <RenderTierSelection handleTierChange={handleTierChange} />
            </Col>
          ) : null}
        </Row>
        <Row gutter={16}>
          {currentIndex === 1 ? (
            <Col
              span={24}
              style={{
                paddingTop: 8,
                paddingLeft: 20,
              }}
            >
              <Button
                style={{
                  marginLeft: 12,
                }}
                type="primary"
                onClick={handlePrev}
              >
                Previous
              </Button>
            </Col>
          ) : null}
        </Row>
      </Modal>
      <GoogleMapExample
        containerElement={
          <div
            style={{
              overflow: "hidden",
              position: "absolute",
              top: 0,
              left: 0,
              height: window.innerHeight,
              width: window.innerWidth,
            }}
          />
        }
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default RenderFindLawyer;
