const player = 'O';
const computer = 'X';

let board_full = false;

// let play_board_number = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
let play_board = ["", "", "", "", "", "", "", "", ""];

const board_container = document.querySelector(".play-area");

const render_board = () => {
    board_container.innerHTML = "";
    play_board.forEach((e, i) => {
        board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${play_board[i]}</div>`;
        if (e === player || e === computer) {
            document.querySelector(`#block_${i}`).classList.add('occupied');
        }
    })
};

render_board();

const check_board_complete = () => {
    let flag = true;
    play_board.forEach(element => {
        if (element !== player && element !== computer) {
            flag = false;
        }
    });
    board_full = flag;
};

const game_loop = () => {
    render_board();
    check_board_complete();
    check_for_winner();
};

const addPlayerMove = (e) => {
    if (!board_full && play_board[e] === "") {
        play_board[e] = player;
        // play_board_number[e] = player;
        game_loop();
        addComputerMove();
    }
};

const addComputerMove = () => {
    if (!board_full) {
        do {
            selected = Math.floor(Math.random() * 9);
        } while (play_board[selected] !== "");
        //while (typeof play_board[selected] !== 'number');
        play_board[selected] = computer;
        // play_board_number[selected] = computer;
        game_loop();

    }
};

const winner = document.getElementById('winner');
const check_for_winner = () => {
    let res = check_match();
    if (res === player) {
        winner.innerHTML = 'Winner is player!!';
        winner.classList.add('playerWin');
        board_full = true;
    } else if (res === computer) {
        winner.innerHTML = 'Winner is computer. :(';
        winner.classList.add('computerWin');
        board_full = true;
    } else if (board_full) {
        winner.innerHTML = 'Draw!';
        winner.classList.add('draw');
    }
};

const check_line = (a, b, c) => {
    return (
        play_board[a] === play_board[b] && play_board[b] === play_board[c] &&
        (play_board[a] === player || play_board[a] == computer)
    );
};

const check_match = () => {
    for (let i = 0; i < 9; i += 3) {
        if (check_line(i, i + 1, i + 2)) {
            return play_board[i];
        }
    }
    for (let i = 0; i < 3; i++) {
        if (check_line(i, i + 3, i + 6)) {
            return play_board[i];
        }
    }
    if (check_line(0, 4, 8)) {
        return play_board[0];
    }
    if (check_line(2, 4, 6)) {
        return play_board[2];
    }
    return "";
};

const reset_board = () => {
    play_board = ["", "", "", "", "", "", "", "", ""];
    board_full = false;
    winner.classList.remove('playerWin');
    winner.classList.remove('computerWin');
    winner.classList.remove('draw');
    winner.innerText = "";
    render_board();
};

render_board();