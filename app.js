var easy = document.getElementById("easy"),
    medium = document.getElementById("medium"),
    hard = document.getElementById("hard"),
    chosenDiff = document.getElementById("chosen-diff");   

easy.addEventListener("click", easyClick);
medium.addEventListener("click", mediumClick);
hard.addEventListener("click", hardClick);

function easyClick(){
    chosenDiff.style.display = "block";
    chosenDiff.innerHTML = "Easy";
}

function mediumClick(){
    chosenDiff.style.display = "block";
    chosenDiff.innerHTML = "Medium";
}

function hardClick(){
    chosenDiff.style.display = "block";
    chosenDiff.innerHTML = "Hard";
}

var puzzle = [  [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                [[0, 0, 0], [0, 0, 0], [0, 0, 0]],

                [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                [[0, 0, 0], [0, 0, 0], [0, 0, 0]],

                [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                [[0, 0, 0], [0, 0, 0], [0, 0, 0]]];

var currentRow = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

var columns = [ [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1]];

var blocks =  [ [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1]];

var rows =  [   [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1]];

var available = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var section = [0, 0, 0];
var value, ind, chosenNum, blockRow;
var numsNeeded = [];

//Adds valid numbers to puzzle
for(var row = 0; row < 9; row++){

    for(var sec = 0; sec < 3; sec++){

        for(var num = 0; num < 3; num++){
    
            for(var j = 0; j < 9; j++){
                if(!(checkWithinRow(j, row)) || !(checkWithinBlock(j, row, sec)) || !(checkWithinColumn(j, num, sec))){                
                    ind = available.indexOf(j);
                    available.splice(ind, 1);
                }
            }

            /**
                Checks if there are any available values

                If there aren't any available values:
                    1) Sets the box's value to a required value to complete the row
                    2) Fixes the previous boxes to be compatible with the new box's value

                If there are available values:
                    1) Sets the box's value to a random available value
            **/
            if(available.length === 0){
                //Does this if there aren't any available values
                
                for(var i = 0; i < 9; i++){
                    if(!rows[row].includes(i)){
                        numsNeeded.push(i);
                    }
                }

                ind = Math.floor(Math.random()*numsNeeded.length);
                chosenNum = numsNeeded[ind];
                value = numsNeeded[ind];

                console.log(chosenNum);
                /**
                    1) Checks where chosenNum is conflicting (can be in a previous column, row, and/or block)
                    2) Fixes previous conflicts
                **/
                chosenNumInColumn(chosenNum, num, sec);

                numsNeeded = [];
            }else{
                //Does this if there are available values
                ind = Math.floor(Math.random()*available.length);
                value = available[ind];
            }

            blockRow = Math.floor(row/3);

            //Adds selected value to section, rows, columns, and blocks matricies
            section[num] = value + 1;
            rows[row][num+(3*sec)] = value;
            columns[num+(3*sec)][row] = value;
            blocks[sec+(3*blockRow)][num+(3*(row%3))] = value;

            //Resets available values
            available = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        }
        
        //Adds section to current row
        currentRow[sec] = section;
        //Resets section
        section = [0, 0, 0];
    }

    //Adds current row to puzzle
    puzzle[row] = currentRow;
    //Resets row
    currentRow = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
}

//Returns false if value is in row
function checkWithinRow(value, row){
    if(rows[row].includes(value)){
        return false;
    }

    return true;
}

//Returns false if value is in block
function checkWithinBlock(value, row, sec){
    blockRow = Math.floor(row/3);
    
    if(blocks[sec+(3*blockRow)].includes(value)){
        return false;
    }

    return true;
}

//Returns false if value is in column
function checkWithinColumn(value, num, sec){
    if(columns[num+(3*sec)].includes(value)){
        return false;
    }

    return true;
}

/**
    1) Checks if conflicting box is in same column
    2) If yes:
        a) Changes conflicting box to value existing in its row already (this value comes from the "switching box")
        b) Changes the switching box value to the original conflicting value
**/
function chosenNumInColumn(chosenNum, num, sec){
    outer_loop:
    if(!checkWithinColumn(chosenNum, num, sec)){
        //Finds the row in which "chosenNum" already exists in column
        var newRow = columns[num+(3*sec)].indexOf(chosenNum);
        var newBlockRow = Math.floor(newRow/3);

        for(var i = 1; i < num+(3*sec)+1; i++){
            //Assigns "change" to value in the same row as "chosenNum"
            var change = rows[newRow][num+(3*sec)-i];
            console.log(change);

            //Checks if conflicting box is valid for "change"
            if(checkWithinColumn(change, num, sec) && checkWithinBlock(change, row, sec)){
                //Checks if switching box is valid for "chosenNum"
                if(checkWithinColumn(chosenNum, num, sec) && checkWithinBlock(chosenNum, row, sec)){
                    //Sets value of conflicting box to "change"
                    columns[num+(3*sec)][newRow] = change;
                    rows[newRow][num+(3*sec)] = change;
                    blocks[sec+(3*newBlockRow)][num+(3*(newRow%3))] = change;
                    puzzle[newRow][sec][num] = change;

                    console.log(puzzle[newRow][sec][num]);

                    //Sets value of switching box to "chosenNum"
                    columns[(num-i)+(3*sec)][newRow] = chosenNum;
                    rows[newRow][(num-i)+(3*sec)] = chosenNum;
                    if(num > i){
                        //Does this if conflicting and switching boxes are in same block
                        blocks[sec+(3*newBlockRow)][(num-i)+(3*(newRow%3))] = chosenNum;
                    }else{
                        //Does this if conflicting and switching boxes are in different block
                        var blockInd;
                        switch ((i-num-1)%3){
                            case 0:
                                blockInd = 2;
                                break;
                            case 1:
                                blockInd = 1;
                                break;
                            case 2:
                                blockInd = 0;
                        }

                        blocks[(sec-Math.floor(i/3))+(3*newBlockRow)][blockInd+(3*(newRow%3))] = chosenNum;
                    }
                    puzzle[ind][num+(3*sec)-i][blockInd] = chosenNum;

                    break outer_loop;
                }
            }
        }
    }
}

//Puts each value from puzzle matrix into HTML
function puzzleToHTML(){
    for(var number = 1; number <= 81; number++){    
        var threeDigit, object, first, second, third, multiple;
    
        if(number%3 === 0){
            first = "2";
        }else if((number+1)%3 === 0){
            first = "1";
        }else{
            first = "0";
        }
        threeDigit = first;
    
        multiple = Math.floor((number-1)/9);
        second = number - (9*multiple);
        second = Math.floor((second-1)/3);
    
        threeDigit = second + threeDigit;
    
        third = Math.floor((number-1)/9).toString();
        threeDigit = third + threeDigit;
    
        object = document.getElementById(threeDigit);
        object.innerHTML = puzzle[third][second][first];
    }
}

puzzleToHTML();