class Brick {

  constructor( x_,  y_,  w_,  h_,  t_,  animate, minY,  margin, fontSize, start) {
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;
    this.text = t_;
    this.creationTime = millis();
    this.flyTime = int(random(500, 2000));
    this.animating = animate;
    this.yCurrent = this.y;
    this.minY = minY;
    //this.startY = startY;
    this.margin = margin;
    this.fontSize = fontSize;
    this.start = start;
    this.timeAcumulated = 0;
    this.previousUpdateTime = 0;
    this.firstUpdate = false;
  }

  render(renderText, globalOpacity) {
    push();
    rectMode(CORNER);
    let f = lerpColor(CONFIG.colorBackgroundGradient, CONFIG.colorBackground, map(this.y, this.minY, this.start.y, 0, 1));
    fill(red(f), green(f), blue(f), 255*globalOpacity);
    noStroke();
    rect(this.x, this.yCurrent+this.h/2, this.w, this.h);
    fill(red(CONFIG.colorText), green(CONFIG.colorText), blue(CONFIG.colorText) , 255*globalOpacity);
    if (renderText) {
      text(this.text, this.x + this.margin, this.yCurrent + this.fontSize + this.h/2);
    }else{  
     // ellipse(this.x, this.yCurrent+this.h/2,10,10);
      rect(this.x + this.margin, this.yCurrent+this.h/2 + this.h*.375, this.w - (this.margin*2), this.h*.25)
    }
    pop();
  }

  update() {
    if (this.animating) {
      if(!this.firstUpdate){
        this.firstUpdate = true;
      }else{
        this.timeAcumulated += millis() - this.previousUpdateTime;
      }

      if (this.timeAcumulated < this.flyTime) {
        let l = map(this.timeAcumulated, -20, this.flyTime, 0, 1);
        this.yCurrent = lerp(-height/2 - 20, this.y, quinticOut(l));
      } else {
        this.animating = false;
        this.yCurrent = this.y;
      }
      this.previousUpdateTime = millis();
    }
  }
}