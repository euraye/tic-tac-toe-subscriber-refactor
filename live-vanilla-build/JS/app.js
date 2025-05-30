const App = {
    // ^ All of our selected HTML elements
    $: {
        menu: document.querySelector('[data-id="menu"]'),
        menuItems: document.querySelector('[data-id="menu-items"]'),
        resetBtn: document.querySelector('[data-id="reset-btn"]'),
        newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
        // Selects ALL elements with data-id="square" and returns a NodeList
        squares: document.querySelectorAll('[data-id="square"]'),
        modal: document.querySelector('[data-id="modal"]'),
        modalText: document.querySelector('[data-id="modal-text"]'),
        modalBtn: document.querySelector('[data-id="modal-btn"]'),
        turn: document.querySelector('[data-id="turn"]'),
       
    },

    // * CurrentPlayer State
    state:{
        moves:[]
    },

    getGameStatus(moves) {
        // Separate moves by player
        const p1Moves = moves.filter(move => move.playerId === 1).map(move => +move.squareId)
        const p2Moves = moves.filter(move => move.playerId === 2).map(move => +move.squareId)
    
        // Define all winning patterns
        const winningPatterns = [
            [1, 2, 3],
            [1, 5, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 5, 7],
            [3, 6, 9],
            [4, 5, 6],
            [7, 8, 9],
        ];
            let winner = null

            winningPatterns.forEach(pattern => {

                const p1Wins = pattern.every(v => p1Moves.includes(v));
                const p2Wins = pattern.every(v => p2Moves.includes(v));                

                if (p1Wins) winner = 1
                if (p2Wins) winner =2
                
            })
            
        return {
            status: moves.length === 9 || winner != null ? 'complete' : 'in-progress',
            winner
        };
    
    },
    
   // * Initialization function
    init() {
    App.registerEventListeners();
    },

    // * All event listeners go here
    registerEventListeners() {
        // ^Toggle dropdown menu - Done
        App.$.menu.addEventListener('click', event => {
            App.$.menuItems.classList.toggle('hidden');
        });

        // ^Reset button click
        App.$.resetBtn.addEventListener('click', event => {
            console.log('reset the game');
        });

        // ^New Round button click
        App.$.newRoundBtn.addEventListener('click', event => {
            console.log('add new round');
        });


        // ^Play Again button click
        App.$.modalBtn.addEventListener('click', event => {
            App.state.moves = []
            App.$.squares.forEach(square => { square.innerHTML = '';})  // clears the content inside each square
            App.$.modal.classList.add('hidden')
        })


        // For each square element in the page...
        App.$.squares.forEach(square => {
            square.addEventListener('click', event => {
                // Check if there is already a play, if so, return early
                const hasMove = (squareId) => {
                    const existingMove = App.state.moves.find(move => move.squareId === squareId)
                    return existingMove !== undefined
                } 

                // If the square already has something inside it (an icon), ignore the click
                if(hasMove(+square.id)){
                    return // stop running this function
                }

                // Determine which player icon to add to the square, if it's P1 or P2
                const lastMove = App.state.moves.at(-1)
                const getOppositePlayer = (playerId) => playerId === 1 ? 2 : 1
                const currentPlayer = App.state.moves.length === 0 ? 1 : getOppositePlayer(lastMove.playerId);

                const nextPlayer = getOppositePlayer(currentPlayer);

                // Create a new <i> element (an icon) - they <i> for icons 
                const squareIcon =  document.createElement("i")
                const turnIcon =  document.createElement("i")
                const turnLabel = document.createElement("p")
                turnLabel.innerHTML = `Player ${nextPlayer}, you are up!`
                
                // If the current player is 1, add classes for an X icon with yellow color
                if (currentPlayer === 1) {
                    squareIcon.classList.add('fa-solid', 'fa-x', 'yellow');
                    turnIcon.classList.add('fa-solid', 'fa-o', 'turquoise');
                    turnLabel.classList = 'turquoise'
                } else {
                    squareIcon.classList.add('fa-solid', 'fa-o', 'turquoise');
                    turnIcon.classList.add('fa-solid', 'fa-x', 'yellow');
                    turnLabel.classList = 'yellow'
                }
                
                        
                App.$.turn.replaceChildren(turnIcon, turnLabel)

                App.state.moves.push({
                    squareId: +square.id,
                    playerId: currentPlayer,
                });

                 // Put the icon inside the clicked square, replacing any previous content
                square.replaceChildren(squareIcon)

                // ^ Check if there is a winner or tie game
                const game = App.getGameStatus(App.state.moves)

                if (game.status === 'complete') {
                    App.$.modal.classList.remove("hidden");

                    let message = ''
                    if (game.winner) {
                        message = `Player ${game.winner} wins!`
                    } else{
                        message = 'Tie game!'
                    }

                    App.$.modalText.textContent = message;
                }

            });
        });
    }
};

window.addEventListener('load', App.init);
