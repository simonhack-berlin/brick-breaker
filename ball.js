function Ball() {
    this.position = createVector(width / 2, height / 2);
    this.r = 20;
    this.direction = createVector(1, 1);
    this.velocity = createVector(1, 1).mult(6.5);

    this.display = function() {
        fill(255);
        ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);

    }
    this.update = function() {
        this.position.x += this.velocity.x * this.direction.x
        this.position.y += this.velocity.y * this.direction.y
    }
    this.checkEdges = function() {
        if (this.position.y < this.r && this.direction.y < 0)
            this.direction.y *= -1;
        else if (this.position.x < this.r && this.direction.x < 0)
            this.direction.x *= -1;
        else if (this.position.x > width - this.r && this.direction.x > 0)
            this.direction.x *= -1;
    }
    this.meets = function(paddle) {
        if (this.position.y < paddle.position.y &&
            this.position.y > paddle.position.y - this.r &&
            this.position.x > paddle.position.x - this.r &&
            this.position.x < paddle.position.x + paddle.width + this.r) {
            return true;
        } else {
            return false;
        }
    }
    this.hits = function(brick) {
        let distance = dist(this.position.x, this.position.y, brick.position.x, brick.position.y)
        if (distance < this.r + brick.r) return true;
        else return false;
    }
}