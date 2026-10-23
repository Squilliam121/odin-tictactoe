const game = (()=>{
    const layout = ["=","=","=","=","=","=","=","=","="]

    const setLayout = (index,marker)=>{
        if (layout[index] === "="){
            layout[index] = marker
            return true
        }else{
            return false
        }
    }

    const getLayout = ()=>{
        return layout
    }

    const printLayout = ()=>{
        return `${layout[0]}|${layout[1]}|${layout[2]}\n-----\n${layout[3]}|${layout[4]}|${layout[5]}\n-----\n${layout[6]}|${layout[7]}|${layout[8]}`
    }

    return {
        layout,
        setLayout,
        getLayout,
        printLayout
    }
})()

function newPlayer(name,marker){
    return {name,marker}
}

const player1 = newPlayer("1","O")
const player2 = newPlayer("2","X")

const gameLogic = ((player1,player2)=>{
    let turn = 0
    
    const newTurn = ()=>{
        turn++
        turnLogic()
    }

    const turnLogic = ()=>{
        const playerActive = (turn % 2 === 0) ? player2 : player1;

        console.log(`Player ${playerActive.name}s turn!`)
        console.log(game.printLayout())

        const position = prompt(`Player ${playerActive.name}, where will you place your marker?`)

        if (game.setLayout(position,playerActive.marker)){
            if (checkWin(playerActive.marker)){
                console.log(`${playerActive.name} has won!`)
                console.log(game.printLayout())
            }else{
                newTurn()
            }
        }else{
            turnLogic()
        }
    }

    const checkWin = (marker)=>{
        const matchingMarkers = []
        const winningCombos = [[0,1,2],[3,4,5],[6,7,8],
                               [0,3,6],[1,4,7],[2,5,8],
                               [0,4,8],[2,4,6]]

        const currentLayout = game.getLayout()
        
        currentLayout.forEach((value,index)=>{
            if (value === marker){
                matchingMarkers.push(index)
            }
        })

        const won = winningCombos.some(combo => {
            return combo.every(index => matchingMarkers.includes(index))
        })

        return won
    }

    return {
        turn,
        newTurn,
        turnLogic,
        checkWin
    }
})(player1,player2)

gameLogic.newTurn()