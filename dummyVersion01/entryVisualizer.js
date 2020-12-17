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
		this.analize();
		this.entryOpacity = 0;
		this.renderingEntries = false;
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

		let sentence = this.text;
     	fill(red(CONFIG.colorBackground), green(CONFIG.colorBackground), blue(CONFIG.colorBackground), 255*globalOpacity);
		noStroke();
		textFont(this.font, this.bigFontSize);
		let w = textWidth(sentence) + (textSize() * CONFIG.margins * 2);
		let h = textAscent() + textDescent() + (textSize() * CONFIG.margins * 2);
		rect(0,0,w,h);
		fill(red(CONFIG.colorText), green(CONFIG.colorText), blue(CONFIG.colorText),  255*globalOpacity);
		text(sentence, 0 , -h*.1);

		if(this.renderingEntries){
			for(let i = 0 ; i < this.entries.length ; i ++){
				this.renderEntry(this.entries[i], this.entryPositions[i], globalOpacity);
			}
		}

		pop();
	}

	renderConnection(position, globalOpacity){
		push();
		stroke(red(CONFIG.colorBackground), green(CONFIG.colorBackground), blue(CONFIG.colorBackground), 255*globalOpacity *this.entryOpacity);
		strokeWeight(2);
		line(0,0,position.x, position.y);
		pop();
	}

	renderEntry(entry, position, globalOpacity){
		push();
		rectMode(CENTER);
		textAlign(CENTER, CENTER);
		let sentence = entry;
     	fill(red(CONFIG.colorBackground), green(CONFIG.colorBackground), blue(CONFIG.colorBackground), 255*globalOpacity *this.entryOpacity);
		noStroke();
		textFont(this.font, this.smallFontSize);
		let w = textWidth(sentence) + (textSize() * CONFIG.margins * 2);
		let h = textAscent() + textDescent() + (textSize() * CONFIG.margins * 2);
		rect(position.x, position.y ,w,h);
		fill(red(CONFIG.colorText), green(CONFIG.colorText), blue(CONFIG.colorText),  255*globalOpacity* this.entryOpacity);
		text(sentence, position.x, position.y -h*.1);

		pop();
	}

	update(){
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

			if( elapsedTime > CONFIG.visualizationEntriesTime){
				this.readyToExit = true;
			}
		}

		for(let i = 0 ; i < this.entryPositions.length ; i++){
			let pos = this.entryPositions[i];
			let noiseScale = 0.005;
			pos.x += map(noise(((pos.x + 200 + frameCount)* noiseScale) , ((pos.y + 500) * noiseScale)), 0, 1, -1, 1) * 20;
			pos.y += map(noise(((pos.x + 500 + frameCount)* noiseScale) , ((pos.y + 200) * noiseScale)), 0, 1, -1, 1) * 20;
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
			for(let j = 0 ; j < DATA.answers.length -1 ; j++){
				if(DATA.answers[j].includes(key)){
					this.entries.push(DATA.answersNoFormat[j]);
					let y = int(random(0,7));
					y = map(y,0,7, height*0.15, (height/2) *.7);
					y += random(-40,40);
					if(random(1)<0.5){
						y*=-1;
					}  
					let position = createVector(random(-width/2, width/2) * .8, y);
					//console.log(position);
					this.entryPositions.push(position);
				}
			}
		}

		console.log(this.entries);
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

}