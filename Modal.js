import React from "react";
import "./index.css";

const Modal = ({ bookedSeats, handleModal }) => {
  // Modal which shows the booked seats
  return (
    <div className="modal">
      <h4>Dear user below seats have been booked for you !</h4>
      <ul className="modalitems">
        {bookedSeats?.map((seat) => {
          return <li>Seat No:&nbsp;{seat + 1}</li>;
        })}
      </ul>
      <button
        className="modalbutton"
        onClick={() => {
          handleModal(false);
        }}
      >
        Close
      </button>
    </div>
  );
};

export default Modal;
