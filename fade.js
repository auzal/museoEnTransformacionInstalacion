class Fade{

	constructor(){
		this.running = false;
		this.fire = 0;
		this.currentTime = 0;
		this.currentInterval = 0;
		this.value;
		this.in = true;
	}

	fadeIn(interval){
		this.in = true;
		this.value = 0;
		this.currentInterval = interval;
		this.fire = millis();
		this.currentTime = 0;
		this.running = true;
	}


	fadeOut(interval){
		this.in = false;
		this.value = 1;
		this.currentInterval = interval;
		this.fire = millis();
		this.currentTime = 0;
		this.running = true;
	}

	getCurrentValue(){
		return this.value;
	}

	update(){
		if(this.running){
			this.currentTime = millis() - this.fire;
			if(this.in){
				this.value = map(this.currentTime,0,this.currentInterval,0,1);
				this.value = constrain(this.value,0,1);
			}else{
				this.value = map(this.currentTime,0,this.currentInterval,1,0);
				this.value = constrain(this.value,0,1);
			}
			if(this.currentTime >= this.currentInterval){
				this.running = false;
			}
		}
	}
}