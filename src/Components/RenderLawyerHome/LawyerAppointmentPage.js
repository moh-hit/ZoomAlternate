import { Button, Card, Col, Row } from "antd";
import React, { useCallback, useState, useEffect } from "react";
import { Text } from "react-native";
import useGlobalStyles from "../../Hooks/useGlobalStyles";
import LawyerAppointmentModal from "./LawyerAppointmentModal";
import * as firebase from "firebase";


export const LawyerAppointmentPage = ({state}) => {
  const styles = useGlobalStyles();
  const [appointments, setAppointments] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
      firebase.database().ref("/Accounts/" + state.username+"/appointments/").on('child_added', (snapshot) =>{

        const data = snapshot.val();
        console.log(data)

            setAppointments((a) => [...a, data]);

      })
  },[]);



  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleOk = useCallback(
    (data) => {

      setIsOpenModal(false);
      firebase.database().ref("/Accounts/" + state.username+"/appointments/").push({
        ...data
      });
    },
    [appointments]
  );
  const handleCancel = () => {
    setIsOpenModal(false);
  };
  return (
    <div
      style={{
        backgroundColor: "#fffff8",
        width: "100%",
      }}
    >
      <Row gutter={16}>
        <Col span={24} style={{ paddingLeft: 20, paddingTop: 12 }}>
          <Text style={styles.title}>Appointments</Text>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24} style={{ paddingLeft: 20 }}>
          <Button
            style={{
              marginTop: "2%",
            }}
            onClick={handleOpenModal}
          >
            Schedule appointment
          </Button>
        </Col>
      </Row>
      <Row gutter={16}>
        {appointments.map((e, i) => (
          <Col span={8} key={i} style={{ paddingLeft: 20 }}>
            <Card
              title={e.date}
              style={{ width: 400, marginTop: "2%", height: 200 }}
            >
              <Card.Meta title={e.title} description={e.description} />
            </Card>
          </Col>
        ))}
      </Row>
      <LawyerAppointmentModal
        isOpenModal={isOpenModal}
        onClose={handleCancel}
        onSubmit={handleOk}
      />
    </div>
  );
};
