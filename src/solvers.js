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
  //start at top leftmost node and place node their
  //skip current column and row and place node and re
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      board.togglePiece(i, j);
      if (board.hasRowConflictAt(i) || board.hasColConflictAt(j)) {
        board.togglePiece(i, j);
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
  return board.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n, board, numRooks, row, invalidCol) {
  //debugger
  //solutions counter
  if (n === numRooks) {
    return 1;
  }
  var solutions = 0;

  row = row || 0;
  
  if (row >= n) { 
    return solutions;
  }
  
  var pastPosition = [];
  //make an empty nxn board or use existing board
  var boardy = board || new Board({n: n});
  // var addedRook = false;
  invalidCol = invalidCol || {};
  numRooks = numRooks || 0;
  //rows, column indices starting at 0, 0
  //for loop for rows i            //base case, for loop runs to completion
   //for loop for columns j
      //place rook at i, j
  var i = row;
  for (var j = 0; j < n; j++) {
    if (invalidCol[j] || n === numRooks) {
      continue;
    }
    boardy.togglePiece(i, j);
    invalidCol[j] = true;
    numRooks++;
    // addedRook = true;
    //test if current placement is valid. If valid:
      //add return value of function call to countNRookSolutions with n, boardcopy, i, j+ 1 to solutions
    pastPosition = [i, j];
    var newI = i + 1;
    var newJ = 0;

    // if (numRooks !== n) {
    solutions += countNRooksSolutions(n, boardy, numRooks, newI, invalidCol);
    boardy.togglePiece(pastPosition[0], pastPosition[1]);
    invalidCol[j] = false;
    numRooks--;
    // addedRook = false;
    // }
  }

  return solutions;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, board, numRooks, row, invalidCol, invalidMajor, invalidMinor, blanky) {
   //debugger
  //solutions counter
  row = row || 0;
  var boardy = board || new Board({n: n});
  blanky = blanky || new Board({n: n});

  if (row >= n || n === 0) { 
    return boardy.rows();
  }
  
  var pastPosition = [];
  //make an empty nxn board or use existing board
  // var addedRook = false;
  invalidCol = invalidCol || {};
  invalidMinor = invalidMinor || {};
  invalidMajor = invalidMajor || {};
  numRooks = numRooks || 0;
  //rows, column indices starting at 0, 0
  //for loop for rows i            //base case, for loop runs to completion
   //for loop for columns j
      //place rook at i, j
  var i = row;
  for (var j = 0; j < n; j++) {
    var firstMajor = boardy._getFirstRowColumnIndexForMajorDiagonalOn(i, j);
    var firstMinor = boardy._getFirstRowColumnIndexForMinorDiagonalOn(i, j);
    if (invalidCol[j] || n === numRooks || invalidMajor[firstMajor] || invalidMinor[firstMinor]) {
      continue;
    }
    boardy.togglePiece(i, j);
    invalidCol[j] = true;
    numRooks++;
    invalidMajor[firstMajor] = true;
    invalidMinor[firstMinor] = true;
    // addedRook = true;
    //test if current placement is valid. If valid:
      //add return value of function call to countNRookSolutions with n, boardcopy, i, j+ 1 to solutions
    pastPosition = [i, j];
    var newI = i + 1;
    var newJ = 0;

    // if (numRooks !== n) {
    var solution = findNQueensSolution(n, boardy, numRooks, newI, invalidCol, invalidMajor, invalidMinor, blanky);
    //if (solution !== blanky) {
    //  return solution;
    //}
    if (solution) {
      return solution;
    }
    boardy.togglePiece(pastPosition[0], pastPosition[1]);
    invalidCol[j] = false;
    invalidMajor[firstMajor] = false;
    invalidMinor[firstMinor] = false;
    numRooks--;
    // addedRook = false;
  }

  if (i === 0) {
    return blanky.rows();
  }
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n, board, numRooks, row, invalidCol, invalidMajor, invalidMinor) {
  //if our current number of rooks is equal to our board size return a complete solution (1)
  if (n === numRooks || n === 0) {
    return 1;
  }
  //initialize our total amount of queen solutions
  var solutions = 0;
  //if we have a row passed in start there or start at the first row
  row = row || 0;
  
  //if our current row is just as large as our board size
  if (row >= n) { 
    return solutions;
  }
  
  //keeps track of the last held queen location
  var pastPosition = [];
  //make an empty nxn board or use existing board
  var boardy = board || new Board({n: n});
  //create our test cases that let us know if a spot can hold a queen or not
  invalidCol = invalidCol || {};
  invalidMinor = invalidMinor || {};
  invalidMajor = invalidMajor || {};
  numRooks = numRooks || 0;
  //rows, column indices starting at 0, 0
  var i = row;
  for (var j = 0; j < n; j++) {
    //check if the a queen is line the line of attack for the queen we are placing
    var firstMajor = boardy._getFirstRowColumnIndexForMajorDiagonalOn(i, j);
    var firstMinor = boardy._getFirstRowColumnIndexForMinorDiagonalOn(i, j);
    if (invalidCol[j] || n === numRooks || invalidMajor[firstMajor] || invalidMinor[firstMinor]) {
      continue;
    }
    //if there is no line of attack
    //addthe queen
    boardy.togglePiece(i, j);
    //set the current queens line of sight on the board for its column,row, and diagonal
    invalidCol[j] = true;
    numRooks++;
    invalidMajor[firstMajor] = true;
    invalidMinor[firstMinor] = true;
    //keep track of placed queen indices
    pastPosition = [i, j];
    //go to the next row and start at the beginning of it
    var newI = i + 1;
    var newJ = 0;

    //extract all solutions for current board configuration
    solutions += countNQueensSolutions(n, boardy, numRooks, newI, invalidCol, invalidMajor, invalidMinor);
    //remove last placed piece
    boardy.togglePiece(pastPosition[0], pastPosition[1]);
    //remove our queens line of sight
    invalidCol[j] = false;
    invalidMajor[firstMajor] = false;
    invalidMinor[firstMinor] = false;
    numRooks--;
  }
  //past extracted solutions to parent
  return solutions;
};
