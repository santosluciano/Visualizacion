class Punto {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    getX(){
      return this.x;
    }
    getY(){
      return this.y;
    }
    setX(x){
      this.x = x;
    }
    setY(y){
      this.y = y;
    }
    empty(){
      this.x = -1;
      this.y = -1;
    }
    existe(){
      if (this.x != -1 && this.y != -1){
        return true;
      }
      return false;
    }
}
