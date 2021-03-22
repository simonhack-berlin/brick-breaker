function Paddle() {
    this.width = 160;
    this.height = 20;

    this.isMovingLeft = false;
    this.isMovingRight = false;

    this.position = createVector(width / 2, height - 40);

    this.display = function() {
        fill(255)
        rect(this.position.x, this.position.y, this.width, this.height);
    }
    this.move = function(step) {
        this.position.x += step;
    }
    this.update = function() {
        if (this.isMovingRight) {
            this.move(20);
        } else if (this.isMovingLeft) {
            this.move(-20)
        }
    }
    this.checkEdges = function() {
        if (this.position.x < 0) this.position.x = 0;
        else if (this.position.x > width - this.width) this.position.x = width - this.width;

    }
}