# RS Components Technical Task

## The Problem

Please pair for 1 hour to create a command line virtual fruit machine. To make things easier instead of symbols we are going to use characters: A, B, C, D, E. Implement a basic machine, along with the concept of a player who has a fixed amount of money to play the machine.

Each time a player plays our fruit machine we display four 'slots' each with a randomly selected character in each slot.

## Requirements:

- [x] The user starts by stating how much money they have.
- [x] Keep the user aware of how much money they have left.
- [x] A single play costs the user 20p.
- [x] The fruit machine starts with £20 in it
- [x] If the characters in each slot are the same then the player wins the jackpot which is £20.
- [x] If each slot has a different character then the machine should pay out £10.
- [x] If a given play results in two or more adjacent slots containing the same character then the machine should pay out a prize of 5 times the cost of a single play.
- [x] If the machine does not have enough money to pay a prize it should credit the player with a number of free plays equal to the difference between the full prize and the amount of money available. This does not affect a jackpot win.

## Other Notes/To-do

- [x] Change Machine#play to use different logic and return a number
- [x] Kick off a game loop
- [ ] Test the requirements - if there's time `// there was no time`
