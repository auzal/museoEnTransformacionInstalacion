class Marquee {

  constructor(font) {
    this.font = font;
    this.marqueeFire = 0;
    this.currentMarqueeEntry = 0;
    this.readyToExit = false;
    this.answers = [];
    this.referenceY = 0;
    this.verticalMargin = 5;
  }

  render(globalOpacity) {
    if(this.answers != undefined){
      
      noStroke();
      textFont(this.font, 30);
      let sentence = this.answers[this.currentMarqueeEntry];
      let h = textAscent() + textDescent() + (textSize() * CONFIG.margins * 2);
      
      this.renderText(sentence,0 - ((h+this.verticalMargin)*this.referenceY), h, globalOpacity);

      if(this.currentMarqueeEntry < this.answers.length - 1){
        let y =  h + this.verticalMargin - ((h+this.verticalMargin)*this.referenceY);
        for(let i = this.currentMarqueeEntry+1 ; i < this.answers.length ; i++){
          this.renderText(this.answers[i], y, h, globalOpacity);
          y += h + this.verticalMargin;
          if(y > height/2){
            break;
          }
        }
      }

      if(this.currentMarqueeEntry > 0){
        let y =  - (h + this.verticalMargin) - ((h+this.verticalMargin)*this.referenceY);
        for(let i = this.currentMarqueeEntry-1 ; i >=0 ; i--){
          this.renderText(this.answers[i], y, h, globalOpacity);
          y -= (h + this.verticalMargin);
          if(y <- height/2){
            break;
          }
        }
      }
    }
    // push();
    // stroke(255,60);
    // line(-width,0,width,0);
    // pop();
  }

  renderText(sentence, y, h, globalOpacity){
      let w = textWidth(sentence) + (textSize() * CONFIG.margins * 2);
      let x = -width/2 + w/2 + textSize() * CONFIG.margins;
      let distance = constrain(dist(0,y,0,0),0,(height/2));
      let alpha = constrain(map(distance,0,(height/2)*.8,255,0),0,255);
      alpha *= globalOpacity;
      fill(red(CONFIG.colorBackground), green(CONFIG.colorBackground), blue(CONFIG.colorBackground), alpha);
      rect(x,y,w,h);
      fill(red(CONFIG.colorText), green(CONFIG.colorText), blue(CONFIG.colorText),  alpha);
      text(sentence, x , y - h*.15);
  }

  update(){
    if(this.answers != undefined){
      if(millis()-this.marqueeFire >= CONFIG.marqueeInterval){
        if(this.currentMarqueeEntry < this.answers.length -1){
          this.currentMarqueeEntry++;
          if(this.currentMarqueeEntry === this.answers.length-1){
            GLOBALS.fade.fadeOut(CONFIG.marqueeInterval);
          }
          this.marqueeFire = millis();
          this.referenceY = 0;
        }else{

          this.readyToExit = true;
        }
      }else{
        let time = millis()-this.marqueeFire;
        let lerp  = constrain(map(time,0,CONFIG.marqueeInterval,0,1),0,1)
        this.referenceY = cubicOut(lerp);
      }
    }
  }

  reset(answers){
    this.answers = answers;
    this.marqueeFire = millis();
    this.currentMarqueeEntry = 0;
    this.referenceY = 0;
    this.readyToExit = false;
  }

}