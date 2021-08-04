const database = []

document.addEventListener('click', function(e) {
    console.log(e.target)
})
const h1 = document.querySelector('h1')
h1.textContent = '⭐️ My fantasy team ⭐️'

const topDisplay = document.createElement('img')
topDisplay.id = 'banner'
topDisplay.src = 'https://gameonfw.com/wp-content/uploads/2016/04/game-on-soccer-banner.jpg'
h1.appendChild(topDisplay)

// Submit Handler (Form) ci


document.querySelector('.player-input').addEventListener('submit', handlesubmit)

function handlesubmit(e){
e.preventDefault()
let playerObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    goals: 0
}

addNewPlayer(playerObj)
playerCard(playerObj)
}

//POST input ci

function addNewPlayer(playerObj){
    fetch('http://localhost:3000/players', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(playerObj)
    })
    .then (response => response.json())
    .then(futStar => console.log(futStar))
    
    
}

function getPlayers() {
    fetch('http://localhost:3000/players')
    .then(res => res.json())
    .then(players => {
        players.forEach(playerCard)
})}

const playerList = document.querySelector('#player-list')

function playerCard(players) {
    const div = document.createElement('div');
    div.id = `${players.id}`
    div.className = 'player-list'
    console.log(div)

    const playerName = document.createElement('h4') //css is grabbing all h2s 
    playerName.textContent = players.name
    //div.appendChild(playerName) //chelsea added

    const img = document.createElement('img');
    img.className = 'player-image'
    img.src = players.image
    //div.appendChild(img)
    console.log(img)

    const numberOfGoals = document.createElement('p')
    numberOfGoals.textContent = `${players.goals} goals scored`
    // playerName.textContent = `${players.goals} goals scored` original line of code 
    //div.appendChild(numberOfGoals)

    const btn = document.createElement('button');
    btn.className = 'season-stats'
    btn.textContent = 'add goal'
    btn.id = 'player-select'
    btn.addEventListener('click', ()=>increaseGoals(players))
    //div.appendChild(btn)

    playerList.append(div);
    div.append(playerName, img, numberOfGoals, btn); //switched to append 
    console.log(playerList)
}

function increaseGoals(players) {
    const goalsNumber = event.target.previousElementSibling; //typo 'previos'
    console.log(goalsNumber)
    const goals = parseInt(++players.goals)
    fetch(`http://localhost:3000/players/${players.id}`, {
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({goals: goals})
    })
    .then(res => res.json())
    .then(data => goalsNumber.textContent = `${data.goals} goals scored`)
}

const init = function() {
    getPlayers()
}


 document.addEventListener("DOMContentLoaded", init())