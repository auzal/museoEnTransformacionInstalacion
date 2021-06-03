
let fakeArchive = []; // TEMPORARY FOR DEBUG

function preload(){
	CONFIG.fontMed = loadFont("assets/futura_med.ttf");
	DATA.forbiddenTerms = loadStrings("assets/lists/prohibidas.txt");
	DATA.forbiddenTermsNoFormat = loadStrings("assets/lists/prohibidas.txt");
	loadKeyLists();
	loadBuilding();
}

function setup() {
	createCanvas(windowWidth, windowHeight -10);
	textFont(CONFIG.fontMed, 90);
	formatList(DATA.forbiddenTerms);
	for(let i = 0 ; i < DATA.keyLists.length ; i ++){
		formatList(DATA.keyLists[i]);
	}
	//print(DATA.keyListsNoFormat);
	//print(DATA.keyLists);
	loadColors();
	GLOBALS.marquee = new Marquee(CONFIG.fontMed);
	GLOBALS.fade = new Fade();
	GLOBALS.building = new Building(DATA.buildingData, CONFIG.fontMed);
	console.log("SETUP DONE!");
}

function draw() {

//	console.log(DATA.answers.length);

	background(0);
	translate(width/2, height/2); // TODO DESDE EL CENTRO SIEMPRE
	GLOBALS.fade.update();

	handleNewEntries();

	if(GLOBALS.currentState === "BUILDING"){
		push();
		GLOBALS.building.update(DATA.answersNoFormat);
		GLOBALS.building.render(GLOBALS.fade.getCurrentValue());
		if(GLOBALS.building.readyToExit){
			GLOBALS.currentState = "MARQUEE";
			GLOBALS.fade.fadeIn(CONFIG.buildingFade);
			startMarquee();
			//GLOBALS.building.loadExisting(DATA.answersNoFormat);
		}
		pop();
	}else if(GLOBALS.currentState === "NEWENTRY"){
		push();
		GLOBALS.entryVisualizer.render(GLOBALS.fade.getCurrentValue());
		GLOBALS.entryVisualizer.update();
		if(GLOBALS.entryVisualizer.readyToExit){
			GLOBALS.currentState = "BUILDING";
			GLOBALS.building.activate();
			GLOBALS.fade.fadeIn(CONFIG.buildingFade);
			//GLOBALS.building.loadExisting(DATA.answersNoFormat);
		}
		pop();
	}else if(GLOBALS.currentState === "MARQUEE"){
		push();
		rectMode(CENTER);
		textAlign(CENTER, CENTER);
		GLOBALS.marquee.update();
		GLOBALS.marquee.render(GLOBALS.fade.getCurrentValue());
		if(GLOBALS.marquee.readyToExit){
			GLOBALS.currentState = "BUILDING";
			GLOBALS.building.activate();
			GLOBALS.fade.fadeIn(CONFIG.buildingFade);
			//GLOBALS.building.loadExisting(DATA.answersNoFormat);
		}
		pop();
	}
//	renderState();
}

function mousePressed(){
	if (mouseButton === RIGHT) {
		//createFakeEntry();
	}

}

function handleNewEntries(){

	if(GLOBALS.newPendingEntries.length > 0){
		//	console.log("handling...");
		let somethingPassedSafetyCheck = false;
		if(GLOBALS.newPendingEntries.length > 1){  // IF THERE ARE MORE THAN 1 NEW ENTRY
			for(let i = 0 ; i < GLOBALS.newPendingEntries.length ; i++){
				let newEntry = GLOBALS.newPendingEntries[i];
				let entryFormat = newEntry.substring(0);
				entryFormat = formatString(entryFormat);
				if(checkForSafety(entryFormat)){
					somethingPassedSafetyCheck = true;
				//	print("NEW ENTRY ACCEPTED: " + newEntry + " " + entryFormat);
					DATA.answers.push(entryFormat);
					DATA.answersNoFormat.push(newEntry);
					if(i === GLOBALS.newPendingEntries.length -1){
						GLOBALS.building.addEntry(newEntry, true);
					}else{
						GLOBALS.building.addEntry(newEntry, false);
					}
				}else{
					console.log("ENTRY REJECTED!");
				}
			}
		}else{										// IF THERE'S ONLY ONE
			let newEntry = GLOBALS.newPendingEntries[0];
			let entryFormat = newEntry.substring(0);
			entryFormat = formatString(entryFormat);
			if(checkForSafety(entryFormat)){
				somethingPassedSafetyCheck = true;
			//	print("NEW ENTRY ACCEPTED: " + newEntry + " " + entryFormat);
				DATA.answers.push(entryFormat);
				DATA.answersNoFormat.push(newEntry);
				GLOBALS.building.addEntry(newEntry, true);
			}else{
					console.log("ENTRY REJECTED!");
			}

		}
		if(somethingPassedSafetyCheck){
			acceptNewEntry();
		}
		GLOBALS.newPendingEntries = []; // CLEAR THE ARRAY
	}
}
