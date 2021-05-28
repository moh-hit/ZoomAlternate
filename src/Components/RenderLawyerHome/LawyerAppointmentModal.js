import React, { useState, useEffect } from "react";
import { Button, Card, Col, DatePicker, Input, Row, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
const initialState = {
  title: "",
  description: "",
  date: "",
};
const LawyerAppointmentModal = ({ isOpenModal, onClose, onSubmit }) => {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    setState(initialState);
  }, [isOpenModal]);

  const handleOk = () => {
    onSubmit(state);
  };
  const handleCancel = () => {
    onClose();
  };
  const onDateChange = (date, str) => {
    let d = moment(date).format("LL");
    setState((s) => ({
      ...s,
      date: d,
    }));
  };
  const handleDataChange = (key) => (e) => {
    let value = e.target.value;
    setState((s) => ({
      ...s,
      [key]: value,
    }));
  };

  return (
    <Modal
      visible={isOpenModal}
      // onOk={handleOk}
      onCancel={handleCancel}
      title="Schedule Appointment"
      footer={[
        <Button key="Cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="Submit"
          type="primary"
          onClick={handleOk}
          disabled={!state.title.length || !state.date.length}
        >
          Submit
        </Button>,
      ]}
    >
      <Row>
        <Col span={24}>
          <Input
            placeholder="Title"
            onChange={handleDataChange("title")}
            value={state.title}
          />
        </Col>
      </Row>
      <Row style={{ paddingTop: 12 }}>
        <Col span={24}>
          <Input
            placeholder="Description"
            onChange={handleDataChange("description")}
            value={state.description}
            multiple
          />
        </Col>
      </Row>
      <Row style={{ paddingTop: 12 }}>
        <Col span={24}>
          <Space direction="vertical">
            <DatePicker onChange={onDateChange} />
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

export default LawyerAppointmentModal;
