let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    const isMobile = 'ontouchstart' in window;
    const downEvent = isMobile ? 'touchstart' : 'mousedown';
    const moveEvent = isMobile ? 'touchmove' : 'mousemove';
    const upEvent = isMobile ? 'touchend' : 'mouseup';

    document.addEventListener(moveEvent, (e) => {
      if(this.holdingPaper) {
        e.preventDefault();
        if (isMobile) {
          this.mouseX = e.touches[0].clientX;
          this.mouseY = e.touches[0].clientY;
        } else {
          this.mouseX = e.clientX;
          this.mouseY = e.clientY;
        }
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
      }
    });

    paper.addEventListener(downEvent, (e) => {
      if(this.holdingPaper) return;
      e.preventDefault();
      this.holdingPaper = true;
      this.mouseTouchX = isMobile ? e.touches[0].clientX : e.clientX;
      this.mouseTouchY = isMobile ? e.touches[0].clientY : e.clientY;
      this.prevMouseX = this.mouseTouchX;
      this.prevMouseY = this.mouseTouchY;
      paper.style.zIndex = highestZ;
      highestZ += 1;
    });

    document.addEventListener(upEvent, () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
