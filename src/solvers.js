/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {


  var board = new Board({n: n});

  console.log(board.attributes);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      board.get(i)[j] = 1;
      if (board.hasColConflictAt(j) === false) {
        break;
      }
      board.get(i)[j] = 0;
    }
  }

  var solution = []; // fixme

  for (let currKey in board.attributes) {
    if (Array.isArray(board.attributes[currKey])) {
      solution.push(board.attributes[currKey]);
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //count for number of solutions
  var solutionCount = 0;
  //new board
  var board = new Board({n: n});
  //recurse function takes in (row)
  //recurse when no conflicts
  const recurse = (boardRow, currentRow) => {
    //for loop through columns
    for (let i = 0; i < n; i++) {
      // toggle number
      board.togglePiece(currentRow, i);
      //if no rows/column conflict with board
      if (!board.hasAnyColConflicts()) {
        //  if row = n - 1 add to count and break;
        if (currentRow === n - 1) {
          solutionCount++;
          //go back into previous row
          board.togglePiece(currentRow, i);
          currentRow--;
          break;
        } else {
          //  else recurse through next row (row++);
          //go to next row
          recurse(board.get(currentRow), currentRow + 1 );
        }
      }
      //toggle number;
      board.togglePiece(currentRow, i);
    }
  };
  // recurse first row of board
  recurse(board.get(0), 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  var board = new Board({n: n});
  var found = false;

  const recurse = (boardRow, currentRow) => {
    // for the current row  //
    // loop through all the cols
    for (let i = 0; i < n; i++) {
      // place the piece
      board.togglePiece(currentRow, i);
      // if there are no conflicts iterate inside the if else move to next col in loop
      if (!board.hasAnyColConflicts() && !board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts()) {
        // checking if we have reached last row
        if (currentRow === n - 1 || found === true) {
          // we have arranged all the rows so if there is no conflict in the last row then we have found a solution
          found = true;
          return;
        } else {
          // recurse through next row
          recurse(board.get(currentRow + 1), currentRow + 1);
        }
      }
      // remove the piece and continue to loop to next col
      if (found === false) {
        board.togglePiece(currentRow, i);
      } else {
        break;
      }
    }
  };
  recurse(board.get(0), 0);
  for (var key in board.attributes) {
    if (Array.isArray(board.attributes[key])) {
      solution.push(board.attributes[key]);
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // Solution counter
  var solutionCount = 0;
  // Create a Board

  var board = new Board({n: n});

  // Recursive function
  const recurse = (boardRow, currentRow) => {
    // for the current row  //
    // loop through all the cols
    for (let i = 0; i < n; i++) {
      // place the piece
      board.togglePiece(currentRow, i);
      // if there are no conflicts iterate inside the if else move to next col in loop
      if (!board.hasAnyColConflicts() && !board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts()) {
        // checking if we have reached last row
        if (currentRow === n - 1) {
          // we have arranged all the rows so if there is no conflict in the last row then we have found a solution
          solutionCount++;
          board.togglePiece(currentRow, i);
          currentRow--;
          break;
        } else {
          // recurse through next row
          recurse(board.get(currentRow + 1), currentRow + 1);
        }
      }
      // remove the piece and continue to loop to next col
      board.togglePiece(currentRow, i);
    }
  };
  if (n === 0) {
    solutionCount = 1;
  } else {
    recurse(board.get(0), 0);
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
