// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = 
                `<h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`;
}

function validateInput(testInput) {
    if (testInput === '') {
        return 'Empty';
    }
    if (isNaN(Number(testInput))) {
        return 'Not a Number';
    }
    if (!isNaN(Number(testInput))) {
        return 'Is a Number';
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotName = document.querySelector("input[name=pilotName]");
    let copilotName = document.querySelector("input[name=copilotName]");
    let cargoMass = document.querySelector("input[name=cargoMass]");
    let launchStatus = document.getElementById('launchStatus');
    let faultyItems = document.getElementById('faultyItems');
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch`;
    list.style.visibility = 'hidden';

    

        

        if (fuelLevel < 10000){
            list.style.visibility = "visible";
            fuelStatus.innerHTML = "There is not enough fuel for the journey.";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "rgb(199, 37, 78)";
        }else{
            faultyItems.style.visibility = "visible";
            fuelStatus.innerHTML = "Fuel level high enough for launch";
        }

        if (cargoLevel > 10000){
            faultyItems.style.visibility = "visible";
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "rgb(199, 37, 78)";
        }else{
            faultyItems.style.visibility = "visible";
            cargoStatus.innerHTML = "Cargo mass low enough for launch"
        }

        if (fuelLevel >= 10000 && cargoLevel <= 10000){
            faultyItems.style.visibility = "visible";
            launchStatus.innerHTML = "Shuttle is Ready for Launch";
            launchStatus.style.color = "rgb(65, 159, 106)";
        }

    

    //return list;

   
}

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json()
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
