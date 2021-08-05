const database = []

document.addEventListener('click', function(e) {
    console.log(e.target)
})
const h1 = document.querySelector('h1')
h1.textContent = 'Create Your Team'

// const topDisplay = document.createElement('img')
// topDisplay.id = 'banner'
// topDisplay.src = 'https://gameonfw.com/wp-content/uploads/2016/04/game-on-soccer-banner.jpg'
// h1.append(topDisplay)

// Submit Handler (Form) ci


document.querySelector('.player-input').addEventListener('submit', handlesubmit) 

function handlesubmit(e){
e.preventDefault()
let playerObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    goals: 0
}
document.querySelector('.player-input').reset() 
addNewPlayer(playerObj)
playerCard(playerObj)
}

// mouseover 
document.querySelector('.submit').addEventListener('mouseover', (e) => {
    e.target.style.color = "blue"
    
    })
    
document.querySelector('.submit').addEventListener('mouseout', e => 
    e.target.style.color = 'hotpink')

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
// function getPlayers() {
//     fetch(' http://localhost:3000/players')
//     .then(res => res.json())
//     .then(players => {
//         console.log(players)
//         players.forEach(playerCard)
// })}

function getPlayers() {
    fetch('http://localhost:3000/players')
    .then(res => res.json())
    .then(players => {
        console.log(players)
        // debugger
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
    console.log(img.src)
    //div.appendChild(img)
    console.log(img)

    const numberOfGoals = document.createElement('p')
    numberOfGoals.textContent = `${players.goals} goals scored`
    numberOfGoals.style.color = 'crimson'
    numberOfGoals.style.fontSize = 'x-large'
    // playerName.textContent = `${players.goals} goals scored` original line of code 
    //div.appendChild(numberOfGoals)

    const btn = document.createElement('button');
    btn.className = 'season-stats'
    btn.textContent = 'add goal'
    btn.id = 'player-select'
    btn.style.fontSize = 'large'
    btn.addEventListener('click', ()=>increaseGoals(players))
    btn.addEventListener('mouseover', (e) => {
        e.target.style.color = "blue"
        
        })
    btn.addEventListener('mouseout', (e) => {
        e.target.style.color = "black"
            
        })
    //div.appendChild(btn)

    playerList.append(div);
    div.append(playerName, img, numberOfGoals, btn); //switched to append 
    console.log(playerList)
}
score = document.querySelector('#scoresheet')
console.log(score)

function teamStatistics(results){
    const teamDiv = document.createElement('div')
    teamDiv.id = results.id
    teamDiv.className = 'season'

    const homeScore = document.createElement('p')
    homeScore.textContent = `FLatiron United: ${results.team_h}`;
    
    const vs = document.createElement('p')
    vs.textContent = 'VS'
    vs.style.color = 'hotpink'
    const awayScore = document.createElement('p')
    awayScore.textContent = `App Academy FC: ${results.team_a}`

    const gameTime = document.createElement('p')
    gameTime.textContent = `Kick-off ${results.kickoff_time}`
    gameTime.style.color = 'chocolate'

    score.appendChild(teamDiv);
    teamDiv.append(homeScore, vs, awayScore, gameTime);
}

function fetchScores () {
    

    fetch ('https://fantasy.premierleague.com/api/element-summary/4/')
    .then(response => response.json())
    
        .then(score => {
            // for(let i = 0; i < 4; i++){
                //teamStatistics(score.fixtures[i])
            console.log(score)
            const newScore = score.fixtures.slice(0,4)
            newScore.forEach(teamStatistics)
        })}
     // .then(score => {
        // console.log(score)
        //     teamStatistics(score.fixtures[0])
        //     teamStatistics(score.fixtures[1])
    // })}

    // function scoreFilter (collection) {
    //     for (const user of collection) {
    //       if (score. === 'Blue') {
    //         console.log(user.firstName);
    //       }
    //     }
    //   }
      

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
    fetchScores()
}


 document.addEventListener("DOMContentLoaded", init())