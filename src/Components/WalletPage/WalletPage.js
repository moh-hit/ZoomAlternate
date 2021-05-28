import React, { useState, useEffect } from "react";
import ReactPayPal from "../ReactPaypal/ReactPayPal";
import { TextField, InputAdornment } from "@material-ui/core";
import { AttachMoney } from "@material-ui/icons";
import { Button, Spin } from "antd";
import firebase from "../../firebase_config";

export default function WalletPage({ height }) {
  const userId = firebase.auth().currentUser.uid;

  const [checkout, setCheckout] = React.useState(false);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(false);
  const [accountBalance, setAccountBalance] = useState("");

  useEffect(() => {
    firebase
      .database()
      .ref(`Accounts/${userId}/balance`)
      .on("value", (snap) => {
        if (snap.val()) {
          setAccountBalance(snap.val());
        }
        else {
          setAccountBalance("0")
        }
      });
  }, []);

  const onChangeAmount = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setError(false);
      setAmount(e.target.value);
    }
  };

  const handleCheckout = () => {
    if (amount.length > 0) {
      setCheckout(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {checkout === true ? (
          <div className="payment-div">
            <ReactPayPal amount={amount} height={height} />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: height,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 style={{marginBottom: 30, color: "#000"}}>Balance: $ {accountBalance != "" ? parseFloat(accountBalance).toFixed(2) : <Spin />}</h1>
            <TextField
              error={error}
              id="outlined-basic"
              label="Enter Amount"
              variant="outlined"
              autoComplete="off"
              helperText={
                error
                  ? "Enter a valid Amount"
                  : "Enter Amount to be added in your wallet"
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
              style={{ marginBottom: 20 }}
              value={amount}
              onChange={(e) => onChangeAmount(e)}
            />
            <Button style={{backgroundColor: "#000", border: "none"}} onClick={handleCheckout} type="primary">
              Checkout
            </Button>
          </div>
        )}
      </header>
    </div>
  );
}
