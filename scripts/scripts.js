const teamWrap = document.querySelector('.teamList');

start();
function start() {

fetch('https://statsapi.web.nhl.com/api/v1/teams')
  .then(response => response.json())
  .then((data) => {
      let team = data.teams;
      
      team.map((i) => {
        createTeamArray(i.abbreviation, i.id, i.division.nameShort, i.conference.name);
        let div = i.abbreviation;
        createDivElement(div, i.name);
        let h2tag = 'h2' + i.abbreviation;
        createH2Element(h2tag, i.name, i.abbreviation);
      })
  }).then(() => {
      //Do something 
  }).catch(() => {
    alert("There has been an error, please try again.");
  })
}

// id is id value assigned to h2
// value is value of h2
function createDivElement(id, value) {
  let div = document.createElement('div');
  div.id = id;
  div.classList.add = "teamWrapper";
  
  //Append to DOM
  teamWrap.append(div);
}

// id is id value assigned to h2
// value is value of h2
function createH2Element(id, value, div) {
  let h2 = document.createElement('h2');
  h2.id = id;
  h2.append(value);
  
  //Append to div
  let divWrap = document.getElementById(div);
  divWrap.append(h2);
}

// id is id value assigned to h2
// value is value of h2
function createPElement(title,id, value, div) {
  let p = document.createElement('p');
  p.id = id;
  p.append(`${title} : ${value}`);
  
  //Append to div
  let divWrap = document.getElementById(div);
  divWrap.append(p);
}

teamArray = [];
function createTeamArray(team, id, division, conference) {
  fetch('https://statsapi.web.nhl.com/api/v1/teams/'+ id +'/stats/')
    .then(response => response.json())
    .then((data) => {
      teamArray.push({'team': team,
      'teamID': id,
      'division': division,
      'conference': conference,
      'points': data.stats[0].splits[0].stat.pts, 
      'wins': data.stats[0].splits[0].stat.wins,
      'losses': data.stats[0].splits[0].stat.losses,
      'ot': data.stats[0].splits[0].stat.ot,
      'games': data.stats[0].splits[0].stat.gamesPlayed,
      'percentage': parseInt(data.stats[0].splits[0].stat.ptPctg)
    });
    
        createPElement("Points", id, data.stats[0].splits[0].stat.pts, team);
        createPElement("Wins", id, data.stats[0].splits[0].stat.wins, team);
        createPElement("Losses", id, data.stats[0].splits[0].stat.losses, team);
        createPElement("OT Losses", id, data.stats[0].splits[0].stat.ot, team);
        createPElement("Games Played", id, data.stats[0].splits[0].stat.gamesPlayed, team);
        createPElement("Point Percentage", id, data.stats[0].splits[0].stat.ptPctg, team);
      })
}

window.addEventListener('load', getStandingsArray);

function getStandingsArray(){
  console.log("Testing!");
	//Create standings for each division, conference and overall
  var newArray = teamArray.sort((a, b) => a.percentage - b.percentage);
  
  function compare( a, b ) {
  if ( a.points < b.points ){
    return -1;
  }
  if ( a.points > b.points ){
    return 1;
  }
  return 0;
}

console.log(newArray);

console.log(teamArray.sort(compare));
}