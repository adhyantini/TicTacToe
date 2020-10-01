import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  cells: Array<string> = [];
  gameStatus: number = 0;
  winner: number;

  tie: boolean;
  currentTurn: number;
  constructor() {}

  ngOnInit(): void {
    for (var i = 0; i < 9; i++) {
      this.cells[i] = null;
    }
  }

  gameStart(): void {
    for (var i = 0; i < 9; i++) {
      this.cells[i] = null;
    }
    this.winner = 0;
    this.gameStatus = 1;
    this.currentTurn = Math.floor(Math.random() * 2 + 1);
    this.updatePlayerTurn();
  }
  // Async becasue we need to wait and check if winner first
  async getPosition(cell: any): Promise<void> {
    const display = document.querySelector('h3');
    if (this.gameStatus == 1) {
      const position = cell.currentTarget.getAttribute('position');
      console.log('position', position);
      if (this.currentTurn === 1) {
        this.cells[position] = 'X';
        cell.currentTarget.classList.add('player-one');
      } else if (this.currentTurn === 2) {
        this.cells[position] = 'O';
        cell.currentTarget.classList.add('player-two');
      }
      console.log(this.cells);
    }
    this.tie = this.checkFull();
    if (this.tie) {
      display.innerHTML = 'No winner, its a tie!';
    }
    this.checkWinner();
    this.changePlayer();

    if (this.gameStatus == 1) {
      this.updatePlayerTurn();
    }
  }

  checkWinner(): void {
    var winningPlayer: number;
    var winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    if (!this.tie) {
      for (var line of winningPositions) {
        if (
          this.cells[line[0]] === this.cells[line[1]] &&
          this.cells[line[1]] === this.cells[line[2]] &&
          this.cells[line[0]] !== null
        ) {
          winningPlayer = this.currentTurn;
          this.gameStatus = 0;
          console.log(winningPlayer);
        }
      }
      this.winner = winningPlayer;
      const display = document.querySelector('h3');
      display.innerHTML = 'Winner is Player :  ' + this.winner;
    }
  }

  checkFull(): boolean {
    let isFull = true;
    for (var i = 0; i < 9; i++) {
      if (this.cells[i] === null) {
        isFull = false;
      }
    }

    if (isFull) {
      this.gameStatus = 0;
      return true;
    } else {
      return false;
    }
  }

  changePlayer(): void {
    if (this.currentTurn === 2) this.currentTurn = 1;
    else this.currentTurn = 2;
  }

  updatePlayerTurn(): void {
    const playerInfo = 'Current Player is : Player ' + this.currentTurn;
    const display = document.querySelector('h3');
    display.innerHTML = playerInfo;
  }
}
