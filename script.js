let activeGame = true

const boxs = document.querySelectorAll(".box")
const root = document.querySelector(":root")
const heading = document.querySelector("h1")

const game = (()=>{
    const layout = ["=","=","=","=","=","=","=","=","="]

    const setLayout = (index,marker)=>{
        if (layout[index] === "="){
            layout[index] = marker
            boxs[index].textContent = marker
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
    let currentPlayer = player1

    const updateHeading = () => {
        heading.textContent = `Player ${currentPlayer.name}'s (${currentPlayer.marker}) turn`
    }
    
    const newTurn = ()=>{
        currentPlayer = (currentPlayer === player1) ? player2 : player1
        updateHeading()
        root.classList.toggle("red")
    }

    const turnLogic = (position)=>{
        console.log(`Player ${currentPlayer.name}s turn!`)
        console.log(game.printLayout())

        if (game.setLayout(position,currentPlayer.marker)){
            if (checkWin(currentPlayer.marker)){
                activeGame = false
                console.log(`${currentPlayer.name} has won!`)
                heading.textContent = `${currentPlayer.name} has won!`
                root.classList = (currentPlayer.name == "1") ? "" : "red"
                console.log(game.printLayout())
            }else if (checkDraw()){
                activeGame = false
                console.log(`Draw!`)
                heading.textContent = "Draw!"
                console.log(game.printLayout())
            }else{
                newTurn()
            }
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

    const checkDraw = ()=>{
        return !game.getLayout().includes("=")
    }

    return {
        updateHeading,
        newTurn,
        turnLogic,
        checkWin,
        checkDraw
    }
})(player1,player2)

boxs.forEach((box,index) =>{
    box.addEventListener("click",()=>{
        if (activeGame){gameLogic.turnLogic(index)}
    })
})

gameLogic.updateHeading()