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

  // n =4;
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

  // console.log(board.attributes);

  var solution = []; // fixme

  for (let currKey in board.attributes) {
    if (Array.isArray(board.attributes[currKey])) {
      solution.push(board.attributes[currKey]);
    }
  }

  // console.log(solution);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// window.findNRooksSolution = function(n) {

//   var solution = undefined; //fixme

//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   return solution;
// };

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //count for number of solutions
  var solutionCount = 0;
  //new board
  var board = new Board({n: n});

  var currentRow = 0;

  //recurse function takes in (row)
  //recurse when no conflicts
  const recurse = (boardRow) => {

    //for loop through rows
    for (let i = 0; i < n; i++) {
      // toggle number
      board.togglePiece(currentRow, i);

      //if no rows/column conflict with board
      if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts()) {

        //  if row = n - 1 add to count and break;
        if (currentRow === n - 1) {
          solutionCount++;
          //go back into previous row
          currentRow--;
          break;
        } else {
          //  else recurse through next row (row++);
          //go to next row
          currentRow++;
          recurse(board.get(currentRow));
        }
      }
      //toggle number;
      board.togglePiece(currentRow, i);

      //if i = n - 1, current --
      if (i === n - 1) {
        currentRow--;
      }
    }
  };

  //recurse first row of board
  recurse(board.get(currentRow));

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
