# Best practics when developinggg user interfaces

1. Global scope and namespaces
2. Stable selectors (data-* attributes)


# What actions can a use take in my app?

# 1. Player an make a game move 
What is "game move"? (turn indicator, icon to play)
- Who is currently up?
- Did the latest move cause a tie or a game win?
- Who won?

What "state" do I need to track?
- current playe
- total wins by player
- total ties
- prior game history

What is "state"?
1. Client State 
example: 
const clientState = {
    isMenuOpen: false
}

2. Server State - database
example:
const servertState = {
   currenPlayr: 1,
   currentGame:[]   
   history: []
}




# 2. New round
# 3. Reset current game
# 4. Toggle menu
