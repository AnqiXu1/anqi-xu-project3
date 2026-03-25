Writeup
Anqi Xu
The most significant challenge was managing the synchronized state for two distinct game modes (6x6 and 9x9) within a shared React Context. Implementing a validation algorithm that could dynamically adapt to different sub-grid dimensions—specifically the non-square 2x3 blocks in Easy mode—required careful coordinate mapping to prevent logic errors. Furthermore, I encountered a persistent runtime error where the application attempted to read properties of an undefined grid during asynchronous re-renders; this was successfully resolved by implementing robust existence checks and loading states within the GamePage component.

Given more time, I would implement a "Hint" system powered by a backtracking algorithm to assist players when they are stuck. From a design perspective, I would add a "Dark Mode" toggle and enhance the user experience with fluid CSS transitions for cell selections and a more celebratory visual effect upon victory. Additionally, I would transition from localStorage to a backend database (such as MongoDB or Firebase) to allow for global leaderboards and persistent user profiles across different devices.

During development, I assumed that users would have a basic familiarity with Sudoku rules, allowing the "Rules" page to remain concise while focusing on the specific variations provided in this app. I also assumed that localStorage would be an acceptable method for data persistence for this stage of the project, as it effectively handles the top 10 high scores without requiring a complex backend setup. Lastly, it was assumed that a standard number input type would provide sufficient accessibility for the grid cells across most modern browsers.

This assignment took approximately 14 hours to complete, including core logic development, state management setup, and UI styling.

Bonus Points Accomplished: I implemented a leaderboard system using localStorage that tracks and displays the top 10 fastest completion times for each difficulty. (Relevant code: saveScore function in SudokuContext.js and the Scores.js).
