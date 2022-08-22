window.addEventListener("load", function() {
    let document = window.document;
    let form = document.querySelector("form");
    let list = document.getElementById("faultyItems");
    let pilotName = document.querySelector("input[name=pilotName]");
    let copilotName = document.querySelector("input[name=copilotName]");
    let fuelLevel = document.querySelector("input[name=fuelLevel]");
    let cargoMass = document.querySelector("input[name=cargoMass]");
    


    let launchStatus = document.getElementById('launchStatus');
    //let faultyItems = document.getElementById('faultyItems');
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    
    form.addEventListener("submit", function(event) {

        list.style.visibility = "hidden";

        // If any of the form elements are left blank, an alert is needed.
        if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
            alert("All fields are required!");
            event.preventDefault();
            return;
        }

        // Check if the pilot and copilot names are strings
        if (!isNaN(pilotName.value) || !isNaN(copilotName.value)) {
            alert("Pilot and Co-pilot names cannot be a number.");
            event.preventDefault();
            return;
        }

        // Check if the fuel level and cargo mass are integers
        if (isNaN(fuelLevel.value) || isNaN(cargoMass.value)) {
            alert("Fuel Level and Cargo mass need to be entered as integers");
            event.preventDefault();
            return;
        }
        
        formSubmission(window.document, list, pilotName.value, copilotName.value, fuelLevel.value, cargoMass.value)
        event.preventDefault();
        
        
    });




    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
            let planet = pickPlanet(listedPlanets);
            formSubmission(window.document, list, pilotName.value, copilotName.value, fuelLevel.value, cargoMass.value)
            addDestinationInfo(window.document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image)
    });
   
});