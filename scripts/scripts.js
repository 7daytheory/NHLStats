const yourContainer = document.getElementById("leaderboard");
const teamWrap = document.querySelector('.teamList');
let teams;

start();
function start() {

fetch('https://statsapi.web.nhl.com/api/v1/teams')
  .then(response => response.json())
  .then((data) => {
      let team = data.teams;
      
      team.map((i) => {
        createTeamArray(i.abbreviation, i.id);
        let div = i.abbreviation;
        createDivElement(div, i.name);
        let h2tag = 'h2' + i.abbreviation;
        createH2Element(h2tag, i.name, i.abbreviation);
      })
  }).then(() => {
    console.log("Do some stuff...")
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

function createTeamArray(team, id) {
  console.log(team, id);
  
  let teamArray = [team];
  
  fetch('https://statsapi.web.nhl.com/api/v1/teams/' + id)
    .then(response => response.json())
    .then((data) => {
      let teamData = data.teams;
      let teamDiv = document.getElementById(team);
      
      teamData.map((i) => {
        teamArray.push(i);
        console.log(i);
        
        createPElement("Venue", id, i.venue.name, team);
        createPElement("Conference", id, i.conference.name, team);
        createPElement("Division", id, i.division.name, team);
        createPElement("Website", id, i.officialSiteUrl, team);
      })
    })
}

function getStandingsArray(){
	//Create standings for each division, conference and overall
}