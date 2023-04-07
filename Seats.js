// It generates an array of 80 objects which are initially not booked

let seats = [];
let seatNumber;
let booked = false;

for (let i = 0; i < 80; i++) {
  seatNumber = i + 1;
  seats.push({
    seatNumber,
    booked,
  });
}

export default seats;
