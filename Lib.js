// Door = function 
    function Door () {
    tDoor = new Sprite(
      game,
      "DoorClose.PNG",
      80,
      80
    );
    tDoor.setSpeed(0);
    tDoor.isOpen = false; // กำหนดสถานะเริ่มต้นว่าประตูปิดอยู่

    tDoor.reset = function () {
      let newX = this.cWidth - this.width - 10; // ติดขอบขวา
      let newY = 50; // ติดขอบบน
      this.setPosition(newX, newY);
      this.isOpen = false;
      this.setImage("DoorClose.PNG"); // ตั้งค่าประตูปิด
    };

    tDoor.open = function () {
      this.setImage("DoorOpen.PNG"); // เปลี่ยนรูปเป็นประตูเปิด
      this.isOpen = true;
    };

    tDoor.reset();
    return tDoor;
  };

//   Obstacle = function (imageSrc, obstacles) {
    function Obstacle  (imageSrc, obstacles) {
    tObstacle = new Sprite(game, imageSrc, 45, 50);
    tObstacle.setSpeed(0);

    function isTooClose(x, y) {
      for (let obj of obstacles) {
        if (obj && obj.distanceTo({ x, y }) < 100) {
          return true;
        }
      }
      // ตรวจสอบไม่ให้ใกล้ประตู
      if (door && door.distanceTo({ x, y }) < 120) {
        return true;
      }
      // ตรวจสอบไม่ให้ใกล้ตัวละคร
      if (character && character.distanceTo({ x, y }) < 120) {
        return true;
      }
      return false;
    }
    tObstacle.reset = function () {
        let keepGoing = true;
        while (keepGoing) {
          let newX = Math.random() * (this.cWidth - this.width);
          let newY = Math.random() * (this.cHeight - this.height);

          if (!isTooClose(newX, newY)) {
            this.setPosition(newX, newY);
            keepGoing = false;
          }
        }
      };

      tObstacle.reset();
      return tObstacle;
    };

    //  Wall = function (x, y) {
    //     let wall = new Sprite(game, "1.1 Tiles/Tile2_02.png", 50, 50);
    //     wall.setSpeed(0);
    //     wall.setPosition(x, y);
    //     return wall;
    //   };

    function checkKeys() {
      if (keysDown[K_LEFT]) {
        // character.changeXby(-5);
        console.log("Moving left");
        character.setSpeed(8);
        character.playAnimation();
        character.setMoveAngle(270);
        character.setCurrentCycle("left");
      }
      if (keysDown[K_RIGHT]) {
        console.log("Moving RIGHT");
        character.setSpeed(8);
        character.playAnimation();
        character.setMoveAngle(90);
        character.setCurrentCycle("right");
      }
      if (keysDown[K_UP]) {
        console.log("Moving up");
        character.setSpeed(8);
        character.playAnimation();
        character.setMoveAngle(0);
        character.setCurrentCycle("up");
      }
      if (keysDown[K_DOWN]) {
        character.setSpeed(8);
        character.playAnimation();
        character.setMoveAngle(180);
        character.setCurrentCycle("down");
      }

      if (keysDown[K_SPACE]) {
        console.log("Moving space");
        character.setSpeed(0);
        character.pauseAnimation();
        character.setCurrentCycle("down");
      }
    }



