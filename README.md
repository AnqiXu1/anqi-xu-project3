Sudoku Project3 Writeup
Anqi Xu
The challenges I faced are as follow. First, infinite loops with victory alerts. When the "Winner" window kept popping up even after clicking "OK," preventing me from navigating away. I realized my useEffect was checking the board faster than the state could update. I fixed this by adding a "state lock" (gameState !== 'playing') so the victory logic only runs once.Second, my leaderboard initially showed "Invalid Date" because the database format didn't match what React expected. I had to write a helper function to safely parse the dates so they show up correctly as YYYY/MM/DD.

If I had more time, I’d add a "pencil" feature so users can mark multiple possible numbers in one cell, which is essential for the Hard (9x9) mode. Besides, I’d like to add some subtle animations when a row or column is completed to make the game feel more interactive.

About the assumptions, I assumed the user has a stable connection, so I didn't build an "offline mode" where progress is saved locally first. Besides, I assumed users would finish a game in one go. If they close the tab halfway through, the current timer and progress aren't saved to the database.

It took me about 20 hours in total. Most of the time was spent on state management in React and debugging the communication between the frontend and the MongoDB backend.

Bonus Points: AI Survey