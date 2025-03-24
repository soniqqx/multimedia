// Door = function
function Door() {
  tDoor = new Sprite(game, "DoorClose.PNG", 101, 124);
  tDoor.setSpeed(0);
  tDoor.isOpen = false; // กำหนดสถานะเริ่มต้นว่าประตูปิดอยู่

  tDoor.reset = function () {
    let offsetX = 50; // ปรับระยะขยับไปทางซ้าย (เพิ่มค่านี้เพื่อให้ขยับจากขวา)
    let newX = this.cWidth - this.width - 10 - offsetX; // ลดค่าเพื่อขยับซ้าย
    let newY = 50; // ติดขอบบน
    this.setPosition(665, newY);
    this.isOpen = false;
    this.setImage("DoorClose.PNG"); // ตั้งค่าประตูปิด
  };

  tDoor.open = function () {
    this.setImage("DoorOpen.PNG"); // เปลี่ยนรูปเป็นประตูเปิด
    this.isOpen = true;
  };

  tDoor.reset();
  return tDoor;
}

//   Obstacle = function (imageSrc, obstacles) {
function Obstacle(imageSrc, obstacles) {
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
    // ตรวจสอบไม่ให้ใกล้บ้าน
    if (home && home.distanceTo({ x, y }) < 120) {
      return true;
    }

    if (bridge && bridge.distanceTo({ x, y }) < 120) {
      return true;
    }

    if (water && water.distanceTo({ x, y }) < 120) {
      return true;
    }

    if (stonedec1 && stonedec1.distanceTo({ x, y }) < 120) {
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
}



let gameOver = false;
function checkKeys() {
  if (gameOver) return; // ถ้าเกมจบแล้วไม่ให้บังคับตัวละคร

  if (keysDown[K_LEFT]) {
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
    character.setCurrentCycle("down");
  }
}

function Treasure() {
  treasure = new Sprite(game, "treasureClose.png", 90, 90);
  treasure.setSpeed(0);
  treasure.isOpen = "close"; // กำหนดสถานะเริ่มต้นว่าประตูปิดอยู่

  treasure.reset = function () {
    let newX = this.cWidth - this.width - 10; // ติดขอบขวา
    let newY = 50; // ติดขอบบน
    this.setPosition(newX, newY);
    this.isOpen = "close";
    this.setImage("treasureClose.png"); // ตั้งค่าประตูปิด
  };

  treasure.open = function () {
    this.setImage("treasureOpen.png"); // เปลี่ยนรูปเป็นประตูเปิด
    this.isOpen = "open";
  };

  treasure.empty = function () {
    this.setImage("treasureEmpty.png");
    this.isOpen = "empty";
  };

  treasure.reset();
  return treasure;
}
// Treasure = function
// function Treasure(x, y, isCorrect) {
//     let tTreasure = new Sprite(game, "treasure.png", 160, 410);
//     tTreasure.setSpeed(0);
//     tTreasure.setPosition(x, y);
//     tTreasure.isCorrect = isCorrect; // ระบุว่าสมบัตินี้เป็นกล่องที่ถูกต้องหรือไม่
//     tTreasure.isCollected = false; // เช็คว่าสมบัตินี้ถูกเก็บไปแล้วหรือยัง

//     // ฟังก์ชันสำหรับรีเซ็ตตำแหน่ง
//     tTreasure.reset = function (newX, newY) {
//         this.setPosition(newX, newY);
//         this.isCollected = false;
//         this.setImage("treasure.png"); // รีเซ็ตรูปภาพกลับเป็นปกติ
//     };

//     // ฟังก์ชันเมื่อผู้เล่นชนกับสมบัติ
//     tTreasure.collect = function () {
//         if (this.isCollected) return; // ถ้าเก็บไปแล้ว ไม่ต้องทำอะไร
//         this.isCollected = true;

//         if (this.isCorrect) {
//             alert("คุณเลือกถูกต้อง! ผ่านด่าน!");
//             nextLevel();
//         } else {
//             alert("เลือกผิด! เกมเริ่มใหม่!");
//             resetGame();
//         }
//     };

//     return tTreasure;
// }

// ฟังก์ชันสำหรับสร้างกล่องสมบัติ
function setupTreasures() {
  let startX = game.width - 150; // ให้สมบัติอยู่ขวาเสมอ
  let startY = game.height / 2 - 100;
  let correctIndex = Math.floor(Math.random() * 3); // สุ่มกล่องที่ถูกต้อง

  let treasures = [];
  for (let i = 0; i < 3; i++) {
    let isCorrect = i === correctIndex;
    let treasure = new Treasure(startX, startY + i * 120, isCorrect);
    treasures.push(treasure);
  }
  return treasures;
}

// ฟังก์ชันตรวจสอบการชนของตัวละครกับกล่องสมบัติ
function checkTreasureCollision(character, treasures) {
  for (let i = 0; i < treasures.length; i++) {
    if (character.distanceTo(treasures[i]) < 50) {
      treasures[i].collect(); // เรียกใช้ฟังก์ชันเก็บสมบัติ
      break;
    }
  }
}
