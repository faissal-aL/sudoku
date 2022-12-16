
//let sudokuCorrect = [2,1,9,5,4,3,6,7,8,5,4,3,8,7,6,9,1,2,8,7,6,2,1,9,3,4,5,4,3,2,7,6,5,8,9,1,7,6,5,1,9,8,2,3,4,1,9,8,4,3,2,5,6,7,3,2,1,6,5,4,7,8,9,6,5,4,9,8,7,1,2,3,9,8,7,3,2,1,4,5,6]
//let board1 = [2,1,9,5,4,3,6,7,8,5,4,3,8,7,6,9,1,2,8,7,6,2,1,9,3,4,5,4,3,2,7,6,5,8,9,1,7,6,5,1,9,8,2,3,4,1,9,8,4,3,2,5,6,7,3,2,1,6,5,4,7,8,9,6,5,4,9,8,7,1,2,3,9,8,7,3,2,1,4,5,6]

//function that draws a sudoku table in the page
/*
function writeSudoku(arr) {
  let sudoku = document.getElementById("sudoku");
  for (let j = 0; j<9; j++) {
    var tr = document.createElement("tr");
    for (let i = 0; i <9 ; i++) {
      var td = document.createElement("td");
      //var input = document.createElement("input");
      //input.setAttribute('maxlength','1');

      //let numRandom = Math.floor(9 * Math.random() + 1);

      const numbr = document.createTextNode(arr[i+j*9]);
      td.appendChild(numbr);
      tr.appendChild(td);
    }    
    sudoku.appendChild(tr);
    }
}
*/

//function that test is a digit is acceptable in the cell 
//and returns true if it is
function isAcceptableValue(index,numValue,board){
    
  let arrHorizontal = [];
  let arrVertical = [];
  let arrVerticalSliced = []; //will be used to create an array made of the vertical soduko lines
  let arrSquare = [];
  let arrSquareSliced = []; //will be used for arrays made from the 3x3 squares
    //create row arrays
  for (let i = 0; i < 9; i++) {
      arrHorizontal[i] = board.slice(i * 9, i * 9 + 9);
    }
    

    // create column arrays
  for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    arrVertical.push(arrHorizontal[j][i]);
  }
    }
   for (let k = 0; k < 81; k += 9) {
  arrVerticalSliced.push(arrVertical.slice(k, k + 9));
  }

// create arrays containing the 9 digits in a 3x3 square

  for (let i = 0; i < 9; i += 3) {
  for (let k = 0; k < 9; k++) {
    for (let j = 0 + i; j < 3 + i; j++) {
      arrSquare.push(arrHorizontal[k][j]);
    }
  }
}
for (let k = 0; k < 81; k += 9) {
  arrSquareSliced.push(arrSquare.slice(k, k + 9));
}

// get row position from index of cell and test for value 
  let rowIndex = Math.floor(index /9);  
  for(let i =0 ; i <9 ; i++){       
      if(arrHorizontal[rowIndex][i] == numValue) return false;
  }

// get column position from index of cell  and test for value 
  let colIndex = index % 9 ;
  for(let i =0; i <9 ; i++){
      if(arrVerticalSliced[colIndex][i] == numValue) return false;
  }

// get square position from index of cell  and test for value 

  let squareIndex = Math.floor(colIndex/3)*3 + Math.floor(rowIndex/3);
  for(let i =0; i<9 ; i++){
      if(arrSquareSliced[squareIndex][i] == numValue) return false;
  } 
  return true;
}

//function that return an array of all the possible digits in a cell
//( it calls the isAcceptableValue function for each digit from 1 to 9)
function choiceOfValue(board,index){
    
  let choices =[];
  for(let value =1; value<=9 ; value++){
      if (isAcceptableValue(index,value,board)) choices.push(value);
  }
  return choices;
}

//function that use a choice from the array returned by choiceOfValue()
// and continues to the next cell, if next cell gives an error the function backtracks
let count =0;
function testValue(index){
 
  while (index < 81 && board[index]) ++index; // skips full cells
  if (index == 81) return true; //ends function
  let theChoices = choiceOfValue(board,index);
  for(let c of theChoices){
      board[index] = c;  // try choice
      if(testValue(index+1)) // if next cell is solvable 
       return true;         //then true
  }
  count++;
  console.log(count);
  board[index]=0;   // no choice is valid, clear the cell
  return false;    // backtrack, returns to the cell before
  }



let board = [];
//function that solve the sudoku and write in the page
function solve(){
  board = sudokuValues();
  testValue(0);
  let solvedValues = [];
  //write solution in the table
  for (let i = 0; i < 81; i++) {
    solvedValues[i] = document.querySelectorAll("input")[i];
    solvedValues[i].value = board[i];
  }
}

const solveButton = document.getElementById("solve");
solveButton.addEventListener("click", solve);

const buttonClear = document.getElementById("clearcells");
buttonClear.addEventListener("click", clearCells);

const buttonCheck = document.getElementById("enter");
buttonCheck.addEventListener("click", testSudoku);

let checkpara = document.getElementById("checkpara");
buttonCheck.addEventListener("mouseover",function(){checkpara.style.display ='block';});
buttonCheck.addEventListener("mouseleave",function(){checkpara.style.display ='none';});

let solvepara = document.getElementById("solvepara");
solveButton.addEventListener("mouseover",function(){solvepara.style.display ='block';});
solveButton.addEventListener("mouseleave",function(){solvepara.style.display ='none';});

let clearpara = document.getElementById("clearpara");
buttonClear.addEventListener("mouseover",function(){clearpara.style.display ='block';});
buttonClear.addEventListener("mouseleave",function(){clearpara.style.display ='none';});

//function to delete values from the cells
function clearCells() {
  for (let i = 0; i < 81; i++) {
    let cells = document.querySelectorAll("input")[i];
    cells.value = "";
  }
  document.getElementById("correct").style.display = "none";
  document.getElementById("incorrect").style.display = "none";
}

//
// testing the sudoku part vvvvv
//
// function that returns the values entered in the table
function sudokuValues() {
  let values = [];
  for (let i = 0; i < 81; i++) {
    values[i] = document.querySelectorAll("input")[i].value;
  }
  values = values.map((str) => {
    return Number(str);
  });
  return values;
}

//function to test if only numbers from 1 to 9 are entered
function solution() {
  let values = sudokuValues();
  const regexList = /[1-9]/;
  const isMatch = values.some(function (e) {
    return !regexList.test(e);
  });
  if (isMatch == true) return false;
  else return testSolution(values);
}

//function that call the test function and displays the result
function testSudoku() {
  let correct = document.getElementById("correct");
  let incorrect = document.getElementById("incorrect");
  let isCorrect = solution();
  if (isCorrect) {
    correct.style.display = "flex";
    incorrect.style.display = "none";
  } else if (!isCorrect) {
    incorrect.style.display = "flex";
    correct.style.display = "none";
  }
}



// function to test if soduko is valid
function testSolution(arrAll) {
  let arrVertical = [];
  let arrVerticalSliced = []; //will be used to create an array made of the vertical soduko lines
  let arrSquare = [];
  let arrSquareSliced = []; //will be used for arrays made from the 3x3 squares
  let board = [];
  for (let i = 0; i < 9; i++) {
    board[i] = arrAll.slice(i * 9, i * 9 + 9);
  }

  // check for 0 and return false if includes 0
  /*  
for (let i =0 ; i < board.length ; i++){
    if(board[i].includes(0)) return false;
    }
  */

  //this function will check for duplicates in an array
  function checkDuplicates(arr) {
    let corr = 0;
    for (let i = 0; i < 9; i++) {
      let arrSet = new Set(arr[i]);
      if (arr[i].length === arrSet.size) {
        corr++;
      }
    }
    if (corr == 9) return true;
    else return false;
  }

  // create vertical arrays

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      arrVertical.push(board[j][i]);
    }
  }
  for (let k = 0; k < 81; k += 9) {
    arrVerticalSliced.push(arrVertical.slice(k, k + 9));
  }

  // create arrays containing the 9 digits in a 3x3 square

  for (let i = 0; i < 9; i += 3) {
    for (let k = 0; k < 9; k++) {
      for (let j = 0 + i; j < 3 + i; j++) {
        arrSquare.push(board[j][k]);
      }
    }
  }
  for (let k = 0; k < 81; k += 9) {
    arrSquareSliced.push(arrSquare.slice(k, k + 9));
  }

  // check if duplicates exist in rows & columns & 3x3 squares
  return (
    checkDuplicates(board) &&
    checkDuplicates(arrVerticalSliced) &&
    checkDuplicates(arrSquareSliced)
  );
}

// this is to go to next cell when a number in entered

$("input").keyup(function () {
  if (this.value.length == this.maxLength) {
    var index = $(this).index("input");
    $("input:eq(" + (index + 1) + ")").focus();
  }
});
