class Building {
  constructor(xmlData, font) {
    this.buildingContour = [];
    this.windows = [];
    this.parseData(xmlData);
    this.scale = width * .9;


    this.start = this.findStart();
    this.currX = this.start.x;
    this.currY = this.start.y;
    this.fontSize = 15;
    this.brickHeight = this.fontSize * 1.5;
    this.margin = this.fontSize * .5;
    this.bricks = [];
    this.font = font;
    this.freeSpace = true;
    this.minY = this.findHighestY();
    this.texts = [];
    this.activationTime = 0;
    this.readyToExit = false;
    this.fading = false;
    //this.print = true;
  }

  render(globalOpacity) {
    push();
    // this.renderDebug();
    textFont(this.font, this.fontSize);

    for (let i = 0; i < this.bricks.length; i++) {
      this.bricks[i].render(this.fontSize > GLOBALS.minFontSize, globalOpacity);

      //if(this.print)
      //console.log(i + " " +this.bricks[i].text);
    }
    pop();
    //this.print = false;
  }

  update(texts) {
    this.texts = texts;
    for (let i = 0; i < this.bricks.length; i++) {
      this.bricks[i].update();
    }
    if (millis() - this.activationTime > CONFIG.buildingTimeOut) {
      this.readyToExit = true;
    }

    if (millis() - this.activationTime > CONFIG.buildingTimeOut - CONFIG.buildingFade) {
      if (!this.fading) {
        GLOBALS.fade.fadeOut(CONFIG.buildingFade);
        this.fading = true;
      }
    }
  }

  activate() {
    this.activationTime = millis();
    this.fading = false;
    this.readyToExit = false;
  }

  parseData(data) {
    let main = data.getChild("main");
    let points = main.getChildren("vertex");
    for (let i = 0; i < points.length; i++) {
      let v = points[i];
      let x = v.getNum("x");
      let y = v.getNum("y");
      let vector = createVector(x, y);
      this.buildingContour.push(vector);
    }

    let windows = data.getChildren("hole");
    for (let i = 0; i < windows.length; i++) {
      let shape = windows[i];
      let points = shape.getChildren("vertex");
      let windowVertices = [];
      for (let j = 0; j < points.length; j++) {
        let v = points[j];
        let x = v.getNum("x");
        let y = v.getNum("y");
        let vector = createVector(x, y);
        windowVertices.push(vector);
      }
      this.windows.push(windowVertices);
    }
  }

  isInsideBuilding(x, y) {

    //x = (x)/this.scale;
    //y = (y)/this.scale;
    let ret = false;
    let points = this.buildingContour;
    ret = this.containsPoint(points, x, y);

    if (this.windows.length > 0) {
      for (let i = 0; i < this.windows.length; i++) {
        points = this.windows[i];
        if (this.containsPoint(points, x, y)) {
          ret = false;
          break;
        }
      }
    }
    return ret;
  }

  containsPoint(verts, px, py) {
    let num = verts.length;
    let i = num - 1;
    let j = num - 1;
    let oddNodes = false;
    for (i = 0; i < num; i++) {
      let vi = createVector(verts[i].x * this.scale, verts[i].y * this.scale);
      let vj = createVector(verts[j].x * this.scale, verts[j].y * this.scale)
      if (vi.y < py && vj.y >= py || vj.y < py && vi.y >= py) {
        if (vi.x + (py - vi.y) / (vj.y - vi.y) * (vj.x - vi.x) < px) {
          oddNodes = !oddNodes;
        }
      }
      j = i;
    }
    return oddNodes;
  }

  findStart() {
    let pos = createVector(0, 0);

    for (let i = 0; i < this.buildingContour.length; i++) {
      let point = this.buildingContour[i];
      if (point.y > pos.y) {
        pos.y = point.y;
        pos.x = point.x;
      }

    }
    pos.x = pos.x * this.scale;
    pos.y = pos.y * this.scale;

    return (pos);
  }

  findHighestY() {
    let y = 0;
    for (let i = 0; i < this.buildingContour.length; i++) {
      let point = this.buildingContour[i];
      if (point.y < y) {
        y = point.y;
      }
    }

    y = y * this.scale;
    return y;
  }


  processEntry(t, animate) { // ACA ENTRO CUANDO CARGO TEXTO
    var couldFitBrickIntoBuilding = true;

    push();
    textFont(this.font, this.fontSize);
    //console.log(t);
    for (let i = 1; i < t.length; i++) {
      let sub = t.substring(0, i);
      let w = (textWidth(sub)) + this.margin * 2;
      //console.log(sub);
      //  console.log("texto -> "+ sub);
      if (!this.isInsideBuilding(this.currX + w, this.currY)) {
        if (this.freeSpace) {
          var brickCouldBeFit = this.addBrick(sub, animate);
          if(brickCouldBeFit === false) {
            // cleanup and leave
            pop();
            return false;
          }
          t = t.substring(i);
          i = 0;
        }
      }
    }
    // console.log(t.length);
    if (t.length > 0) {
      if (this.freeSpace) {
        var couldFitBrickInX = this.addBrick(t, animate);
        if(couldFitBrickInX === false) {
          // cleanup and leave
          pop();
          return false;
        }
      }
    }
    pop();

    return couldFitBrickIntoBuilding;
  }


  addBrick(t, animate) {
    push();
    textFont(this.font, this.fontSize);
    let w = (textWidth(t)) + this.margin * 2;
    let h = this.brickHeight;
    let x = this.currX;
    let y = this.currY;
    let aux = new Brick(x, y - h, w, h, t, animate, this.minY, this.margin, this.fontSize, this.start);
    this.currX += w + this.margin;
    this.bricks.push(aux);
    var couldFitBrickIntoBuilding = this.checkNewPos();
    // console.log('addBrick couldFitBrickIntoBuilding', couldFitBrickIntoBuilding);
    pop();

    return couldFitBrickIntoBuilding;
  }


  addSpace() {
    // console.log('addSpace');


    this.fontSize *= 0.98;
    this.margin = this.fontSize * .5;
    this.brickHeight = this.fontSize * 1.5;
    // textSize(font_size);
    this.freeSpace = true;
    this.bricks = [];
    this.currX = this.start.x;
    this.currY = this.start.y;

    // for (let i = 0; i < this.texts.length; i++) {
    //   this.processEntry(this.texts[i], false);
    // }
  }

  goThroughEntriesAndRestartLoopIfMoreSpaceIsNecessary(animate) {
    for (let i = 0; i < this.texts.length; i++) {
      var couldFitBrickIntoBuilding = this.processEntry(this.texts[i], animate);
      // console.log('loadExisting couldFitBrickIntoBuilding', couldFitBrickIntoBuilding);
      if(couldFitBrickIntoBuilding === false) {
        // restart the current loop we're in
        i = -1;
      }
    }
  }

  loadExisting(texts) {
    this.texts = texts;
    this.goThroughEntriesAndRestartLoopIfMoreSpaceIsNecessary(false)
  }

  addEntry(text, animate) {
    var couldFitBrickIntoBuilding = this.processEntry(text, animate);

    // does this work............??????????????????????
    if(couldFitBrickIntoBuilding === false) {
      // change spacing and restart
      this.goThroughEntriesAndRestartLoopIfMoreSpaceIsNecessary(false);
    }
  }

  checkNewPos() {
    var couldFitBrickIntoBuilding = true;

    if (!this.isInsideBuilding(this.currX, this.currY)) { // si el nuevo punto está afuera
      if (this.freeSpace) {
        let found = false; // intento avanzar hacia la derecha
        for (let i = this.currX; i < width / 2; i++) {
          if (this.isInsideBuilding(i, this.currY)) {
            this.currX = i;
            found = true;
            break;
          }
        }
        if (!found) {
          this.currX = -width / 2;
          this.currY = this.currY - this.brickHeight - this.margin;
          if (this.currY < this.minY) {
            this.freeSpace = false;
            this.addSpace();
            return false;
            // console.log('checkNewPos couldFitBrickIntoBuilding', couldFitBrickIntoBuilding);
          }
          //println("here");
          for (let i = this.currX; i < width / 2; i++) {
            if (this.isInsideBuilding(i, this.currY)) {
              this.currX = i;
              break;
            }
          }
        }
      }
    }

    // console.log('checkNewPos couldFitBrickIntoBuilding', couldFitBrickIntoBuilding);
    return couldFitBrickIntoBuilding;
  }


  renderDebug() {
    push();
    stroke(255);
    noFill();
    beginShape();
    for (let i = 0; i < this.buildingContour.length; i++) {
      let v = this.buildingContour[i];
      vertex(v.x * this.scale, v.y * this.scale);
    }
    endShape(CLOSE);
    stroke(0, 255, 255);
    for (let i = 0; i < this.windows.length; i++) {
      let shape = this.windows[i];
      beginShape();
      for (let j = 0; j < shape.length; j++) {
        let v = shape[j];
        vertex(v.x * this.scale, v.y * this.scale);
      }
      endShape(CLOSE);
    }

    ellipse(this.start.x, this.start.y, 10, 10);

    if (this.isInsideBuilding(mouseX - width / 2, mouseY - height / 2)) {
      stroke(255, 0, 0);
    } else {
      stroke(255);
    }
    ellipse(mouseX - width / 2, mouseY - height / 2, 10, 10);

    stroke(255, 128, 0);
    ellipse(this.currX, this.currY, 20, 20);

    line(-width / 2, this.minY, width / 2, this.minY);

    pop();
  }


}