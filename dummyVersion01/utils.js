
function formatList(list){
	for(let i = 0 ; i < list.length ; i ++){
		list[i] = formatString(list[i]);
		
	}
}

function formatString(text){
	text = text.toLowerCase();
	text = text.trim();
	text = removeSpanishChars(text);
	return text;
}

function removeSpanishChars(word){
	let search = "áéíóúñ";
	let replace = "aeioun";
	for(let i = 0 ; i < word.length ; i ++){
		let currentChar = word.charAt(i);
		for(let j = 0 ; j < search.length ; j++){
			if(currentChar === search.charAt(j)){
				//print("found! " + currentChar);
				let begin = word.substring(0,i);
				let end = "";
				if(j < word.length -2){
					end = word.substring(i+1);
				}
				word = begin + replace.charAt(j) + end;
			}
		}
	}
	return word;
}

function loadKeyLists(){
	
	let count = 0;
	let numLists = 10;
	while(GLOBALS.keepLoadingLists){
		count ++;
		let fileName = "assets/lists/keys/" + count + ".txt";
		let list = loadStrings(fileName,  emptyFunction, stopLoad);
		DATA.keyListsNoFormat.push(list);
		list = loadStrings(fileName,  emptyFunction, stopLoad);
		DATA.keyLists.push(list);
		if(count == numLists){ // failsafe
			GLOBALS.keepLoadingLists = false;
		}
		
	}
	//print("LOADED " + count + " LISTS");
}

function emptyFunction(){

}

function stopLoad(){
	//print("ey");
	GLOBALS.keepLoadingLists = false;
}

function loadColors(){
	CONFIG.colorBackground = color("#C53B96");
	CONFIG.colorText = color("#FFFFFF");
	CONFIG.colorBackgroundGradient = color("#d675b5");
}

function createFakeEntry(){
	//print("CREATING FAKE ANSWER...");
	let newEntry = "Un museo con ";
	let randomList = DATA.keyListsNoFormat[int(random(DATA.keyListsNoFormat.length))];
	let randomWord = randomList[int(random(randomList.length))] + " ";
	let randomBadWord = "";
	if(random(10)<3){
		randomBadWord = DATA.forbiddenTermsNoFormat[int(random(DATA.forbiddenTermsNoFormat.length))];
	}
	newEntry += randomWord + randomBadWord + " " + int(random(100));
	//print(newEntry);
	processEntry(newEntry);
}

function processEntry(newEntry){
	GLOBALS.newPendingEntries.push(newEntry);
}

function checkForSafety(newEntry){
	let result = true;
	for(let i = 0 ; i < DATA.forbiddenTerms.length ; i++){
		if(newEntry.includes(DATA.forbiddenTerms[i])){
			result = false;
			break;
		}
	}

	if(newEntry.length === 0){
		result = false;
	}

	return result;
}

function acceptNewEntry(){
	//GLOBALS.currentState = "NEWENTRY";
	GLOBALS.currentState = "NEWENTRY";
	GLOBALS.entryVisualizer = new EntryVisualizer(DATA.answersNoFormat[DATA.answersNoFormat.length-1], fontMed);

}


function loadBuilding(){
	DATA.buildingData = loadXML("assets/svg/svg.xml");
	
}


function loadFakeArchive(){
	fakeArchive = loadStrings("assets/fakeArchive.txt");
}	

function processInitialArchive(previousData){
    
	for(let i = 0 ; i < previousData.length ; i++){
		let newEntry = previousData[i];
	    let entryFormat = newEntry.substring(0);
		entryFormat = formatString(entryFormat);
		if(checkForSafety(entryFormat)){
		//	print("NEW ENTRY ACCEPTED: " + newEntry);
			DATA.answers.push(entryFormat);
			DATA.answersNoFormat.push(newEntry);
		}else{
		//	print("ENTRY REJECTED! -> " + newEntry);
		}
	}

	if(DATA.answersNoFormat.length > 0){
		
		print("LOADED " + DATA.answersNoFormat.length + " PREVIOUS ENTRIES");
		GLOBALS.building.loadExisting(DATA.answersNoFormat);
		startMarquee();
	}

}

function startMarquee(){
	GLOBALS.currentState = "MARQUEE";
//	console.log(DATA.answersNoFormat.length);
	GLOBALS.marquee.reset(DATA.answersNoFormat);
	GLOBALS.fade.fadeIn(CONFIG.marqueeInterval);
}

function renderState(){
	push();
	textFont(fontMed,20);
	translate(-width/2 + 5, -height/2 + 5);
	let w = textWidth(GLOBALS.currentState) + (textSize() * CONFIG.margins * 2);
	let h = textAscent() + textDescent() + (textSize() * CONFIG.margins * 2);
	noStroke();
	fill(0,90);
	rect(0,0,w, h);
	fill(255);
	text(GLOBALS.currentState, 2, 20);
	pop();
}