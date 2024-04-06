import React, { useState } from 'react';

type Player = 'X' | 'O';

const calculateWinner = (board: Array<string | null>): string | null => {
  const lines: Array<Array<number>> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as string;
    }
  }

  return null;
};

function App(): JSX.Element {
  const [board, setBoard] = useState<Array<Array<string | null>>>(
    Array(3).fill(Array(3).fill(null))
  );

  const [player, setPlayer] = useState<Player>('O');

  const flatBoard = board.reduce((acc, curr) => acc.concat(curr), []);

  const winner = calculateWinner(flatBoard);

  const isDraw = !winner && flatBoard.every((cell) => cell !== null);

  const move = (x: number, y: number): void => {
    if (winner || isDraw || board[x][y]) return;

    const newBoard = board.map((row) => [...row]);

    newBoard[x][y] = player;

    setBoard(newBoard);
    setPlayer(player === 'X' ? 'O' : 'X');
  };

  const resetGame = (): void => {
    setBoard(Array(3).fill(Array(3).fill(null)));
    setPlayer('O');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {winner && <h2>Winner: {winner}</h2>}
        {!winner && isDraw && <h2>Draw</h2>}
        {!winner && !isDraw && <h2>Next Player: {player}</h2>}
        {board.map((row, x) => (
          <div key={x}>
            {row.map((cell: string | null, y: number) => (
              <button
                style={{
                  background: '#fff',
                  border: '1px solid #999',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  lineHeight: '34px',
                  height: '50px',
                  width: '50px',
                  margin: '5px',
                  padding: '0',
                  textAlign: 'center',
                  color: '#000',
                  verticalAlign: 'top',
                }}
                key={y}
                onClick={() => move(x, y)}
              >
                {cell === 'X' ? 'X' : cell === 'O' ? 'O' : ''}
              </button>
            ))}
          </div>
        ))}
        <button
          style={{
            background: '#2196F3',
            color: 'white',
            border: 'none',
            padding: '10px',
            margin: '10px',
          }}
          onClick={resetGame}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
