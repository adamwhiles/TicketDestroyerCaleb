import Ticket from "/src/tickets";

export function buildLevel(game, level) {
  let tickets = [];

  level.forEach((row, rowIndex) => {
    row.forEach((ticket, ticketIndex) => {
      if (ticket === 1) {
        let position = {
          x: 50 * ticketIndex,
          y: 50 + 25 * rowIndex
        };
        tickets.push(new Ticket(game, position));
      }
    });
  });
  return tickets;
}

let randomArray = (length, max) =>
  [...new Array(length)].map(() => Math.round(Math.random() * max));

export const level1 = [
  randomArray(16, 1),
  randomArray(16, 1),
  randomArray(16, 1),
  randomArray(16, 1)
];

export const level2 = [
  randomArray(16, 1),
  randomArray(16, 1),
  randomArray(16, 1),
  randomArray(16, 1),
  randomArray(16, 1)
];

export const level3 = [
  randomArray(16, 1),
  randomArray(16, 1),
  randomArray(16, 1),
  randomArray(16, 1),
  randomArray(16, 1),
  randomArray(16, 1)
];

export const level4 = [
  randomArray(16, 1),
  randomArray(16, 1),
  randomArray(16, 1),
  randomArray(16, 1),
  randomArray(16, 1),
  randomArray(16, 1),
  randomArray(16, 1),
  randomArray(16, 1),
  randomArray(16, 1)
];
