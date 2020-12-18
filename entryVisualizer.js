class EntryVisualizer{

	constructor(text, font){   /// ENTRO SIN FORMATEAR NADA 
		this.text = text;
		this.textClean = formatString(text.substring(0));
		//console.log(this.textNoFormat);
		this.font = font;
		this.entries = [];
		this.entryPositions = [];
		this.bigFontSize = 60;
		this.smallFontSize = 30;
		this.creationTime = millis();
		this.changeTime = 0;
		this.readyToExit = false;
		this.keys = [];
		this.generatePositions();
		this.analize();
		this.entryOpacity = 0;
		this.renderingEntries = false;
		this.fading = false;
	
	}	

	render(globalOpacity){
		
		push();
		rectMode(CENTER);
		textAlign(CENTER, CENTER);

		if(this.renderingEntries){
			for(let i = 0 ; i < this.entries.length ; i ++){
				this.renderConnection(this.entryPositions[i], globalOpacity);
			}
		}

		this.renderEntry(this.text, createVector(0, 0), globalOpacity, this.bigFontSize, 1, true);

		if(this.renderingEntries){
			for(let i = 0 ; i < this.entries.length ; i ++){
				this.renderEntry(this.entries[i], this.entryPositions[i], globalOpacity, this.smallFontSize, this.entryOpacity, false);
			}
		}

	//this.renderGuides();

		pop();
	}

	renderConnection(fixedPosition, globalOpacity){
		push();

		let position = this.addNoise(fixedPosition);

		stroke(red(CONFIG.colorBackground), green(CONFIG.colorBackground), blue(CONFIG.colorBackground), 255*globalOpacity *this.entryOpacity);
		strokeWeight(2);
		this.dashedLine(0,0,position.x, position.y);
		pop();
	}

	renderEntry(entry, fixedPosition, globalOpacity, fontSize, opacity, fixed){
		push();

		let position = fixedPosition;

		if(!fixed){
			position = this.addNoise(fixedPosition);
		}

		rectMode(CENTER);
		textAlign(CENTER, CENTER);
		let sentence = entry;
		if(sentence.length > CONFIG.maxVisualizationLength){
			sentence = sentence.substring(0,CONFIG.maxVisualizationLength) + "...";
		}
     	fill(red(CONFIG.colorBackground), green(CONFIG.colorBackground), blue(CONFIG.colorBackground), 255*globalOpacity *opacity);
		noStroke();
		textFont(this.font, fontSize);
		let w = textWidth(sentence) + (textSize() * CONFIG.margins * 2);
		let h = textAscent() + textDescent() + (textSize() * CONFIG.margins * 2);
		rect(position.x, position.y ,w,h);
		fill(red(CONFIG.colorText), green(CONFIG.colorText), blue(CONFIG.colorText),  255*globalOpacity* opacity);
		text(sentence, position.x, position.y -h*.1);

		pop();
	}

	update(){


		if(millis() - this.creationTime > CONFIG.visualizationInterval/2 && this.entries.length === 0 && !this.fading){
			//	console.log("FADING!!!");
				this.fading = true;
				GLOBALS.fade.fadeOut(CONFIG.visualizationInterval/2);
		
		}

		if(millis() - this.creationTime > CONFIG.visualizationInterval && !this.renderingEntries){
			//this.readyToExit = true;


			
			if(this.entries.length > 0){
				this.renderingEntries = true;
				this.changeTime = millis();
			}else{
				this.readyToExit = true;
			}
		}
		if(this.renderingEntries){

			let elapsedTime = millis() - this.changeTime;
			this.entryOpacity = map(elapsedTime, 0, CONFIG.visualizationEntriesTime/2, 0, 1);
			this.entryOpacity = constrain(this.entryOpacity,0,1);

			if( elapsedTime > CONFIG.visualizationEntriesTime*.75 && !GLOBALS.fade.running && !this.fading){
				//console.log("in here");
				this.fading = true;
				GLOBALS.fade.fadeOut(CONFIG.visualizationInterval*.50);
			}

			if( elapsedTime > CONFIG.visualizationEntriesTime){
				this.readyToExit = true;
			}
		}


		for(let i = 0 ; i < this.entryPositions.length ; i++){
			let pos = this.entryPositions[i];
			let noiseScale = 0.005;
		//	pos.x += map(noise(((pos.x + 200 + frameCount)* noiseScale) , ((pos.y + 500) * noiseScale)), 0, 1, -1, 1) * 20;
		//	pos.y += map(noise(((pos.x + 500 + frameCount)* noiseScale) , ((pos.y + 200) * noiseScale)), 0, 1, -1, 1) * 20;
		}

	}

	analize(){

		for(let  i = 0 ; i < DATA.keyLists.length ; i++){
			let list = DATA.keyLists[i];
			for(let j = 0 ; j < list.length ; j++){
				let key = list[j];
				//console.log("key -> " + key);
				if(this.textClean.includes(key)){
					if(this.notInList(key)){
						this.keys.push(key);
					}
				}

			}
		}

		for(let i = 0 ; i < this.keys.length ; i ++){
			let key = this.keys[i];
			for(let j =  DATA.answers.length -1 ; j >= 0; j--){
				if(DATA.answers[j].includes(key) && this.entries.length < CONFIG.maxLinks){
					this.entries.push(DATA.answersNoFormat[j]);
				}
			}
		}

		//console.log(this.entries);
		//console.log(this.entries.length)
	}

	notInList(key){
		let result = true;
		for(let i = 0 ; i < this.keys.length ; i++){
			if(key === this.keys[i]){
				result = false;
				break;
			}
		}
		return result;
	}


	dashedLine(x1, y1, x2, y2){
		let dashLength = 10;
		let distance = dist(x1, y1, x2, y2);
		let draw = true;

		for(let i = 0 ; i < distance - dashLength ; i += dashLength){
			if(draw){
				let start = i/distance;
				let end = (i + dashLength)/distance;

				let xStart = map(start,0,1,x1,x2);
				let yStart = map(start,0,1,y1,y2);

				let xEnd = map(end,0,1,x1,x2);
				let yEnd = map(end,0,1,y1,y2);

				line(xStart, yStart, xEnd, yEnd);
				draw = false;
			}else{
				draw = true;
			}
		}

	}

	shuffle(array) {
	  let m = array.length, t, i;

	  // While there remain elements to shuffle…
	  while (m) {

	    // Pick a remaining element…
	    i = Math.floor(Math.random() * m--);

	    // And swap it with the current element.
	    t = array[m];
	    array[m] = array[i];
	    array[i] = t;
	  }

	  return array;
	}

	generatePositions(){

		for(let i = 0 ; i < CONFIG.maxLinks/2 ; i++){

			let y = map(i, 0, CONFIG.maxLinks/2, height*.15, (height/2) - (height*.025));
			let position = createVector(random(-width/4, width/4), y);
			this.entryPositions.push(position);
			position = createVector(random(-width/4, width/4), y*-1);
			this.entryPositions.push(position);
		}

		//console.log(this.entryPositions.length);

		this.entryPositions = this.shuffle(this.entryPositions);

	}

	renderGuides(){
		for(let i = 0 ; i < 10 ; i ++){
			let y = height*(i/10.0);
			stroke(255,128);
			line(-width,y-height/2, width, y - height/2);
		}
	}

	addNoise(fixedPosition){
		let p = fixedPosition;
		let scale = 0.001;
    	let offset = 50;
    	let x = map(noise((p.x + frameCount * scale), (p.y * scale)), 0, 1, -offset, offset);
    	let y = map(noise((p.x  * scale), (p.y + frameCount * scale)), 0, 1, -offset, offset);
    	let delta = createVector(x,y);
		return createVector(delta.x + fixedPosition.x, delta.y + fixedPosition.y);
	}
}