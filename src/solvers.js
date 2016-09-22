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