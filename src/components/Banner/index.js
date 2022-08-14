import React from "react";
import "./Banner.css";

export const Banner = () => {
  return (
    <div>
      <div className="wrapper font-Mate text-white">
        <h1 className="title">
          •.E<span className="flicker3">l</span>Mazo.•
        </h1>
        <div className="card1 flicker1">
          <span className="card-icon flicker1">♣</span>
        </div>
        <div className="card2 flicker2">
          <span className="card-icon flicker1">♥</span>
        </div>
      </div>
    </div>
  );
};
