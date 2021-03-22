function Brick() {

    this.r = 20;
    this.w = 50;
    this.h = 30;
    this.position = createVector(random(100, width - 100), random(100, height - 400))
    this.fill = [255, random(100, 250), random(0, 100)];


    this.display = function() {
        fill.apply(fill, this.fill);
        rect(this.position.x, this.position.y, this.w, this.h);

    }
}