import Ticket from "/src/tickets";

export function buildLevel(game, level) {
  let tickets = [];

  level1.forEach((row, rowIndex) => {
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
export const level1 = [
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0]
];
