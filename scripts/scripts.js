const teamWrap = document.querySelector('.teamList');

let newArray = [];
let teamArray = [];

class Start {
	constructor() {
		this.start();
	}

start (){
fetch('https://statsapi.web.nhl.com/api/v1/teams')
  .then(response => response.json())
  .then((data) => {
      let team = data.teams;
      
      team.map((i) => {
        this.createTeamArray(i.abbreviation, i.id, i.division.nameShort, i.conference.name);
        let div = i.abbreviation;
        this.createDivElement(div, i.name);
        let h2tag = 'h2' + i.abbreviation;
       	this.createH2Element(h2tag, i.name, i.abbreviation);
      })
  }).then(() => {
      //Do something 
  }).catch(() => {
    alert("There has been an error, please try again.");
  })
}

// id is id value assigned to h2
// value is value of h2
createDivElement(id, value) {
  let div = document.createElement('div');
  div.id = id;
  div.classList.add = "teamWrapper";
  
  //Append to DOM
  teamWrap.append(div);
}

// id is id value assigned to h2
// value is value of h2
createH2Element(id, value, div) {
  let h2 = document.createElement('h2');
  h2.id = id;
  h2.append(value);
  
  //Append to div
  let divWrap = document.getElementById(div);
  divWrap.append(h2);
}

// id is id value assigned to h2
// value is value of h2
createPElement(title,id, value, div) {
  let p = document.createElement('p');
  p.id = id;
  p.append(`${title} : ${value}`);
  
  //Append to div
  let divWrap = document.getElementById(div);
  divWrap.append(p);
}

// Create image element for team logo
createImgElement(team) {
  let img = document.createElement("IMG");
  img.src = "images/" + team + "-logo.svg";
  img.classList.add("team_logo");
  img.id = team + "_img";
  
  //Append to DOM
  let divWrap = document.getElementById(team);
  divWrap.append(img);
}
	
async createTeamArray(team, id, division, conference) {
	let teamArray = [];
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
	})
  })
.then((e) => {
this.getStandingsArray(teamArray);
})     
}

getStandingsArray(teamArray){
	//Create standings for each division, conference and overall
	newArray.push(teamArray);
	
	const finalArray = [].concat(...newArray);
	
	finalArray.sort((a,b) => {
		return a.percentage - b.percentage;
	})
	
	
	console.log(finalArray.percentage);

}
	
	
}

let instance = new Start();