import React, { useState } from "react";
import seats from "./Seats";
import "./index.css";
import Modal from "./Modal";

const SeatGrid = () => {
  const [seatArr, setSeatArr] = useState(seats);
  const [numOfSeats, setNumOfSeats] = useState(null);
  const [bookedSeats, setBookedSeats] = useState(null);
  const [modalHandler, setModalHandler] = useState(false);
  const [err, setErr] = useState("");

  const handleModal = function (val) {
    console.log(val);
    setModalHandler(val);
  };

  //the logic for booking a seat if person is reserving seats, the priority will be to book them in one row.
  // If seats are not available in one row then the booking should be done in such a way that the nearby
  // seats are booked
  const bookTheSeat = function () {
    let unfilledSeat = seatArr.findIndex((val) => val.booked === false);
    console.log(seatArr);
    let i = 0;
    let m = 0;
    let ctr = Number(numOfSeats);
    let arr = [...seatArr];
    let bookedseatArr = [];

    if (unfilledSeat === 0) {
      while (m < ctr) {
        if (arr[unfilledSeat + i].booked === false) {
          arr[unfilledSeat + i].booked = true;
          bookedseatArr.push(unfilledSeat + i);
          i++;
          m++;
        } else {
          i++;
        }
      }
    } else if (unfilledSeat > 0) {
      let val = Number(unfilledSeat);
      let val1, finalValue;
      if (val % 7 !== 0) {
        console.log(val);
        val1 = 7 * Math.ceil(Number(val) / 7);
        finalValue = val1 - val;
        console.log(finalValue, ctr);
      } else {
        val1 = 7 * Math.ceil(Number(val) / 7 + 1);
        finalValue = val1 - val;
        console.log(finalValue, ctr);
      }
      if (finalValue >= Number(ctr)) {
        console.log("working1");
        i = 0;
        m = 0;
        while (m < ctr) {
          if (arr[unfilledSeat + i].booked === false) {
            arr[unfilledSeat + i].booked = true;
            bookedseatArr.push(unfilledSeat + i);
            i++;
            m++;
          } else {
            i++;
          }
        }
      } else {
        i = 0;
        m = 0;
        if (arr[val1].booked === false) {
          while (m < ctr) {
            if (arr[val1 + i].booked === false) {
              arr[val1 + i].booked = true;
              bookedseatArr.push(val1 + i);
              i++;
              m++;
            } else {
              i++;
            }
          }
        } else {
          function search(val1) {
            let val2, finalValue;
            let newIndex = arr.slice(val1).findIndex((val) => {
              return val.booked === false;
            });
            if ((newIndex + val1) % 7 !== 0) {
              val2 = 7 * Math.ceil(Number(newIndex + val1) / 7);
              finalValue = val2 - (newIndex + val1);
              console.log(finalValue, ctr);
            } else {
              val2 = 7 * Math.ceil(Number(newIndex + val1) / 7 + 1);
              finalValue = val2 - (newIndex + val1);
              console.log(finalValue, ctr);
            }
            if (finalValue >= ctr) {
              i = 0;
              m = 0;
              while (m < ctr) {
                if (arr[val1 + i].booked === false) {
                  arr[val1 + i].booked = true;
                  bookedseatArr.push(val1 + i);
                  i++;
                  m++;
                } else {
                  i++;
                }
              }
            } else {
              search(val1 + 7);
            }
          }
          search(val1);
        }
      }
    }

    setSeatArr(arr);
    setModalHandler(true);
    console.log(bookedseatArr);
    setBookedSeats(bookedseatArr);
    setNumOfSeats("");
  };

  return (
    <>
      <div className="mainhead">
        <div>
          <ul className="mainpagelist">
            <li>Grey:&nbsp;Occupied Seats</li>
            <li>Green:&nbsp;Available Seats</li>
          </ul>
        </div>
        <div style={{ display: "flex" }}>
          <input
            type="number"
            min="1"
            max="7"
            className="maininput"
            placeholder="Enter the number of seats you want to book"
            value={numOfSeats}
            onChange={(e) => {
              if (e.target.value > 7) {
                setErr("You cant book more than 7 seats !");
                setTimeout(() => {
                  setErr("");
                }, 3000);
                setNumOfSeats("");
              } else {
                setNumOfSeats(e.target.value);
              }
            }}
          ></input>
        </div>
        <button className="mainbutton" onClick={bookTheSeat}>
          Book
        </button>
      </div>
      <p style={{ color: "white" }}>{err}</p>
      <div className="seatgrid">
        {seatArr.map((val) => {
          return (
            <span className={`${val.booked ? "disabledseat" : "seats"}`}>
              <b> {val.seatNumber}</b>
            </span>
          );
        })}
      </div>
      {modalHandler && (
        <Modal bookedSeats={bookedSeats} handleModal={handleModal}></Modal>
      )}
    </>
  );
};

export default SeatGrid;
