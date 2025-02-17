//your JS code here. If required.
 document.getElementById("submit").addEventListener("click", startGame);

        let players = [];
        let currentPlayer = 0;
        let board = ["", "", "", "", "", "", "", "", ""];
        let gameActive = true;

        function startGame() {
            const player1 = document.getElementById("player-1").value;
            const player2 = document.getElementById("player-2").value;
            if (!player1 || !player2) {
                alert("Please enter names for both players.");
                return;
            }
            players = [player1, player2];
            document.querySelector(".container").classList.add("hidden");
            document.querySelector(".game").classList.remove("hidden");
            updateMessage();
        }

        function updateMessage() {
            document.querySelector(".message").textContent = `${players[currentPlayer]}, you're up`;
        }

        document.querySelectorAll(".cell").forEach(cell => {
            cell.addEventListener("click", handleCellClick);
        });

        function handleCellClick(event) {
            const cell = event.target;
            const cellIndex = cell.getAttribute("data-id");
            if (board[cellIndex] !== "" || !gameActive) return;
            board[cellIndex] = currentPlayer === 0 ? "X" : "O";
            cell.textContent = board[cellIndex];
            if (checkWinner()) {
                document.querySelector(".message").textContent = `${players[currentPlayer]}, congratulations you won!`;
                gameActive = false;
                return;
            }
            currentPlayer = 1 - currentPlayer;
            updateMessage();
        }

        function checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            return winPatterns.some(pattern => {
                const [a, b, c] = pattern;
                return board[a] && board[a] === board[b] && board[a] === board[c];
            });
        }