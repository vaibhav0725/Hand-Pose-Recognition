import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);
      console.log(hand);

      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  runHandpose();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Real-Time Handpose recognition</h1>
        <p>
          This project demonstrates real-time handpose recognition using TensorFlow.js and react.js.
        </p>
      </header>

      <div className="main-container">
        <div className="camera-container">
          <h2>Your Webcam</h2>
          <Webcam ref={webcamRef} className="webcam" />
        </div>
        <div className="projection-container">
          <h2>Hand Projection</h2>
          <canvas ref={canvasRef} className="projection-canvas" />
        </div>
      </div>

      <footer className="App-footer">
        <p>Created by Ayush Sharma</p>
        <a href="https://github.com/ajoossharma" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        {" | "}
        <a href="https://www.linkedin.com/in/ayush-sharma-751417249/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </footer>
    </div>
  );
}

export default App;
