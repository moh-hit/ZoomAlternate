import React, { useState } from "react";
import firebase from "../../firebase_config";

export default function ReactPayPal({ amount, height }) {
  const [paid, setPaid] = React.useState(false);
  const [error, setError] = React.useState(null);
  const paypalRef = React.useRef();
  const userId = firebase.auth().currentUser.uid;

  // To show PayPal buttons once the component loads
  React.useEffect(() => {
    console.log(amount);
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "Your description",
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaid(true);
          console.log(order);
          firebase
            .database()
            .ref(`Accounts/${userId}/paypal`)
            .update({
              paypalCaptureId: order.purchase_units[0].payments.captures[0].id,
              amount: Math.floor(order.purchase_units[0].amount.value),
              currency: order.purchase_units[0].amount.currency_code,
            });
        },
        onError: (err) => {
          //   setError(err),
          setError("err");
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, []);

  // If the payment has been made
  if (paid) {
    return (
      <div className="sPage" style={{ height: height }}>
        <div className="card">
          <div
            style={{
              borderRadius: 200,
              height: 200,
              width: 200,
              background: "#F8FAF5",
              margin: "0 auto",
            }}
          >
            <i className="checkmark">✓</i>
          </div>
          <h1>Success</h1>
          <p>
            We received your wallet recharge request,
            <br /> We'll Update the amount in your wallet.
          </p>
        </div>
      </div>
    );
  }

  // If any error occurs
  if (error) {
    return (
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>Oops!</h1>
            <h2>Something went wrong </h2>
          </div>
          <h2>while processing your payment. We'll keep you updated.</h2>
          <a onClick={() => window.location.reload()}>Go TO Homepage</a>
        </div>
      </div>
    );
  }

  // Default Render
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: window.innerWidth,
        height: "100%",
        minHeight: height,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div ref={paypalRef} />
    </div>
  );
}
