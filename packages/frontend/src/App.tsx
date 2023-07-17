import { useState } from "react";
import "./App.css";

function App() {
  const [dockerStarted, setDocker] = useState("Not started");
  const [QRcode, setQR] = useState("No QR");
  const triggerDocker = () => {
    console.log("triggerDocker");
    setDocker("Started");
    try {
      fetch("https://eyed3f57i3.execute-api.us-east-2.amazonaws.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "PAOLOOOOOOO" }),
      })
        .then((response) => {
          console.log("Login response: ", response.json());
        })
        .catch((error) => {
          console.error("Login error: ", error);
        });
    } catch (error) {
      console.error("Login Error: ", error);
    }

    setQR("QR code received");
  };

  const Login = () => {
    console.log("Login");
    try {
      fetch(
        "https://eyed3f57i3.execute-api.us-east-2.amazonaws.com/auth/magicLink/authorize",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          console.log("Login response: ", response.json());
        })
        .catch((error) => {
          console.error("Login error: ", error);
        });
    } catch (error) {
      console.error("Login Error: ", error);
    }
  };
  return (
    <>
      <div className="">
        <label>Login</label>
        <button onClick={() => Login()}>Login</button>
      </div>
      <div className="">
        Trigger the Docker baby!
        <button onClick={() => triggerDocker()}>Docker start</button>
      </div>
      <div className="">Docker has started: {dockerStarted}</div>
      <div className="">QR code received: {QRcode}</div>
    </>
  );
}

export default App;
