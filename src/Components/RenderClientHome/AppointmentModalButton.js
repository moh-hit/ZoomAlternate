import React from "react";
import { useState } from "react";
import { ScheduleOutlined } from "@ant-design/icons";
import ClientAppointmentModal from "./ClientAppointmentModal";
import { Button } from "antd";
import  firebase from "firebase";

const AppointmentModalButton = ({username,callerId}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOk = (appointment) => {
      setIsOpenModal(false);
      firebase.database().ref("/Accounts/" + username+"/appointments/").push({
        ...appointment
      });
      firebase.database().ref("/Accounts/" + callerId+"/appointments/").push({
        ...appointment
      });
  };
  const handleCancel = () => {
    setIsOpenModal(false);
  };
  const handleModalOpen = () => {
    setIsOpenModal(true);
  };
  return (
    <div
      style={{
        paddingTop: 18,
      }}
    >
      <Button
        onClick={handleModalOpen}
        icon={<ScheduleOutlined />}
        shape="circle"
      />
      <ClientAppointmentModal
        isOpenModal={isOpenModal}
        onClose={handleCancel}
        onSubmit={handleOk}
      />
    </div>
  );
};

export default AppointmentModalButton;
