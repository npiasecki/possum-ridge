const FPS = 60;
const INTERVAL = 1 / FPS;
const SCREEN_HEIGHT = 144;
const SCREEN_WIDTH = 160;
const TILE_SIZE = 8;
const TILES_PER_TILESET_ROW = 64;
const POSSUM_WALK_SPEED = 60;
const POSSUM_RUN_SPEED = POSSUM_WALK_SPEED * 2;

// 20 tiles wide x 18 tiles high
const levels = [
  [
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 1, 1, 1, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 2, 3, 2, 4, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 13, 14, 12, 12, 15, 0, 0, 0, 0, 7, 1, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 2, 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 11, 11, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [ 2, 2, 3, 2, 2, 6, 2, 4, 2, 2, 2, 5, 2, 6, 3, 2, 2, 6, 2, 2, 2, 2, 3, 2, 2, 6, 2, 4, 2, 2, 2, 5, 2, 6, 3, 2, 2, 6, 2, 2],
      [ 5, 3, 2, 2, 6, 3, 5, 2, 2, 2, 3, 4, 2, 2, 2, 2, 4, 2, 3, 5, 5, 3, 2, 2, 6, 3, 5, 2, 2, 2, 3, 4, 2, 2, 2, 2, 4, 2, 3, 5]
  ]
];

const sprites = [
  [
      {
          note: 'G3',
          type: 'jug',
          tileX: 10,
          tileY: 14
      },
      {
          note: 'B3',
          type: 'jug',
          tileX: 12,
          tileY: 14
      },
      {
          note: 'G4',
          type: 'jug',
          tileX: 14,
          tileY: 14
      },
      {
          note: 'D4',
          type: 'jug',
          tileX: 16,
          tileY: 14
      },
      {
          note: 'D3',
          type: 'jug',
          tileX: 18,
          tileY: 14
      },
      {
          note: 'B3',
          type: 'jug',
          tileX: 20,
          tileY: 14
      },
      {
          note: 'G4',
          type: 'jug',
          tileX: 22,
          tileY: 14
      },
      {
          note: 'D4',
          type: 'jug',
          tileX: 24,
          tileY: 14
      },
      {
          note: 'G3',
          type: 'jug',
          tileX: 24,
          tileY: 8
      },
      {
          note: 'B3',
          type: 'jug',
          tileX: 23,
          tileY: 8
      },
      {
          note: 'G4',
          type: 'jug',
          tileX: 16,
          tileY: 6
      },
      {
          note: 'D4',
          type: 'jug',
          tileX: 14,
          tileY: 6
      },
  ]
];

class Jug {
    constructor(note, tileX, tileY) {
        this.image = document.getElementById('jug');
        this.spriteHeight = 8;
        this.spriteWidth = 8;
        this.levelX = tileX * TILE_SIZE;
        this.levelY = tileY * TILE_SIZE;
        this.note = note;
        this.tileX = tileX;
        this.tileY = tileY;
        this.renderX = this.levelX;
        this.renderY = this.levelY;
    }

    draw(context) {
        context.drawImage(
            this.image,
            0,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.renderX,
            this.renderY,
            this.spriteWidth,
            this.spriteHeight
        );
    }

    refreshRenderPosition(scrollX) {
        this.renderX = this.levelX - scrollX;
    }

    update({game}) {
        const collisions = {};
        const possum = game.possum;

        const intersects = !(possum.levelX + possum.spriteWidth <= this.levelX ||
            possum.levelX >= this.levelX + this.spriteWidth ||
            possum.levelY + possum.spriteHeight <= this.levelY ||
            possum.levelY >= this.levelY + this.spriteHeight);

        if (intersects) {
            game.playNote(this.note);
            game.destroySprite(this);
        }
    }
}

class Possum {
    constructor() {
        this.animations = [
            [document.getElementById('possum-idle-right'), 4],
            [document.getElementById('possum-idle-left'), 4],
            [document.getElementById('possum-walk-right'), 4],
            [document.getElementById('possum-walk-left'), 4],
            [document.getElementById('possum-jump-right'), 5],
            [document.getElementById('possum-jump-left'), 5]
        ];
        this.animationIndex = 0;
        this.direction = 0;
        this.jumping = false;
        this.lastRenderTime = Date.now();
        this.levelX = 0;
        this.levelY = 0;
        this.renderX = 0;
        this.renderY = 0;
        this.running = false;
        this.spriteHeight = 16;
        this.spriteWidth = 8;
        this.velocityY = 0;
    }

    draw(context) {
        const animation = this.animations[this.animationIndex];
        const currentFrame = Math.floor((((Date.now() - this.lastRenderTime) / (this.running ? 100 : 250)) % animation[1]));
        context.drawImage(
            animation[0],
            currentFrame * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.renderX,
            this.renderY,
            this.spriteWidth,
            this.spriteHeight
        );
    }

    refreshRenderPosition(scrollX) {
        this.renderX = this.levelX - scrollX;
        this.renderY = this.levelY;
    }

    update({buttonStates, collisions, interval, levelWidth}) {
        this.running = buttonStates.b;

        // We might need to snap back up if we slipped below the floor during the last loop
        if (this.velocityY >= 0 && collisions.bottom) {
            const nearestFloorHeight = SCREEN_HEIGHT - collisions.bottomY;
            this.levelY = SCREEN_HEIGHT - this.spriteHeight - nearestFloorHeight;
        }

        // We might need to snap back down if his head poked through the ceiling during the last loop
        if (this.velocityY < 0 && collisions.top) {
            const nearestCeilingHeight = SCREEN_HEIGHT - collisions.topY;
            this.levelY = SCREEN_HEIGHT - nearestCeilingHeight;
        }

        // Apply some gravity: TODO, unless jumping
        if (!collisions.bottom) {
            this.velocityY += 0.25;
        }

        // Do we need to stop vertical movement?
        if ((this.velocityY > 0 && collisions.bottom) /* hit the floor */ ||
            (this.velocityY < 0 && this.levelY <= 0) /* hit the top of the screen */ ||
            (this.velocityY < 0 && collisions.top) /* hit his head */) {
            if (collisions.bottom) {
                this.jumping = false;
            }

            this.velocityY = 0;
        }

        // Update our vertical position
        this.levelY += this.velocityY;

        // Do we want to move right?
        if (buttonStates.right) {
            if (this.levelX + this.spriteWidth < levelWidth && !collisions.right) {
                this.levelX += (this.running ? POSSUM_RUN_SPEED : POSSUM_WALK_SPEED) * interval;
            }

            if (!this.jumping) {
                this.animationIndex = 2;
            }

            this.direction = 0;
        }

        // Do we want to move left?
        if (buttonStates.left) {
            if (this.levelX > 0 && !collisions.left) {
                this.levelX -= (this.running ? POSSUM_RUN_SPEED : POSSUM_WALK_SPEED) * interval;
            }

            if (!this.jumping) {
                this.animationIndex = 3;
            }

            this.direction = 1;
        }

        // Are we trying to jump?
        if (buttonStates.a && !this.jumping) {
            this.jumping = true;
            this.animationIndex = this.direction === 0 ? 4 : 5;
            this.levelY -= 1;
            this.velocityY = -5;
        }

        // If we're not moving, return to idle animation
        if (!this.jumping && !buttonStates.left && !buttonStates.right) {
            this.animationIndex = this.direction;
        }
    }
}

class Game {
    constructor() {
        this.buttonStates = {
            a: false,
            b: false,
            down: false,
            left: false,
            right: false,
            select: false,
            start: false,
            up: false
        };
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.pointerStates = [];
        this.loopHandle = null;
        this.startCard = document.getElementById('start-card');
        this.state = 'start';
        this.tileset = document.getElementById('tileset');

        this.possum = new Possum();
        this.sprites = [];

        this.initializeButtons();
        this.initializeKeys();
        this.initializeLevel();
        this.initializeSound();
    }

    checkSpriteTileCollision(sprite, tileX, tileY, tileIndex, collisions) {
        if ((sprite.levelX + sprite.spriteWidth >= tileX && sprite.levelX <= tileX + TILE_SIZE) &&
            (sprite.levelY + sprite.spriteHeight >= tileY && sprite.levelY <= tileY + TILE_SIZE)) {

            const intersect = {
                x: Math.max(sprite.levelX, tileX),
                y: Math.max(sprite.levelY, tileY),
            };

            intersect.width = Math.min(sprite.levelX + sprite.spriteWidth, tileX + TILE_SIZE) - intersect.x;
            intersect.height = Math.min(sprite.levelY + sprite.spriteHeight, tileY + TILE_SIZE) - intersect.y;

            if (sprite.levelX + sprite.spriteWidth / 2 > tileX + TILE_SIZE / 2 && intersect.height > intersect.width) {
                collisions.left = true;
                collisions.leftY = tileX + TILE_SIZE;
            }

            if (sprite.levelX + sprite.spriteWidth / 2 < tileX + TILE_SIZE / 2 && intersect.height > intersect.width) {
                collisions.right = true;
                collisions.rightY = tileX;
            }

            if (sprite.levelY + sprite.spriteHeight / 2 < tileY + TILE_SIZE / 2 && intersect.width > 2) {
                collisions.bottom = true;
                collisions.bottomY = tileY;
            }

            if (sprite.levelY + sprite.spriteHeight / 2 > tileY + TILE_SIZE / 2 && intersect.width > intersect.height) {
                collisions.top = true;
                collisions.topY = tileY + TILE_SIZE;
            }
        }
    }

    checkSpriteTileCollisions(sprite) {
        const level = levels[this.level];
        const levelWidth = level[0].length;
        const levelHeight = level.length;
        const collisions = {
            bottom: false,
            bottomY: null,
            left: false,
            right: false,
            top: false
        };

        for (let x = 0; x < levelWidth; x++) {
            for (let y = 0; y < levelHeight; y++) {
                if (level[y][x] > 0) {
                    this.checkSpriteTileCollision(
                        sprite,
                        x * TILE_SIZE,
                        y * TILE_SIZE,
                        level[y][x],
                        collisions
                    );
                }
            }
        }

        return collisions;
    }

    destroySprite(sprite) {
        const spriteIndex = this.sprites.indexOf(sprite);
        this.sprites.splice(spriteIndex, 1);
    }

    drawLevelTiles() {
        const level = levels[this.level];
        const width = level[0].length;
        for (let x= 0; x < width; ++x) {
            for (let y = 0; y < SCREEN_HEIGHT / TILE_SIZE; y++) {
                const tileIndex = level[y][x];
                this.drawTile(TILE_SIZE * x - this.scrollX, y * TILE_SIZE, tileIndex);
            }
        }
    }

    drawTile(x, y, tileIndex) {
        const sx = (tileIndex * TILE_SIZE) - (TILES_PER_TILESET_ROW * Math.floor(tileIndex / TILES_PER_TILESET_ROW) * TILE_SIZE);
        const sy = Math.floor(tileIndex / TILES_PER_TILESET_ROW)*TILE_SIZE;
        this.context.drawImage(this.tileset, sx, sy, TILE_SIZE, TILE_SIZE, x, y, TILE_SIZE, TILE_SIZE);
    }

    hitTestButton(button, x, y) {
        if (button.type === 'circle') {
            let dx = x - button.x;
            let dy = y - button.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            return distance <= button.radius;
        }

        if (button.type === 'polygon') {
            let inside = false;

            for (let i = 0, j = button.coordinates.length - 1; i < button.coordinates.length; j = i++) {
                const [xi, yi] = button.coordinates[i];
                const [xj, yj] = button.coordinates[j];

                const intersect =
                    ((yi > y) !== (yj > y)) &&
                    (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

                if (intersect) inside = !inside;
            }

            return inside;
        }

        if (button.type === 'rectangle') {
            return x >= button.topLeft[0] && x <= button.bottomRight[0] &&
                y >= button.topLeft[1] && y <= button.bottomRight[1];
        }
    }

    initializeButtons() {
        const buttons = [
            {
                name: 'a',
                radius: 20,
                type: 'circle',
                x: 300,
                y: 361
            },
            {
                name: 'b',
                radius: 20,
                type: 'circle',
                x: 245,
                y: 385
            },
            {
                bottomRight: [88,418],
                name: 'down',
                topLeft: [60,393],
                type: 'rectangle'
            },
            {
                bottomRight: [59,391],
                name: 'left',
                topLeft: [34,364],
                type: 'rectangle'
            },
            {
                bottomRight: [115,391],
                name: 'right',
                topLeft: [92,364],
                type: 'rectangle'
            },
            {
                name: 'select',
                coordinates: [[108,464],[113,470],[148,451],[143,444]],
                type: 'polygon'
            },
            {
                name: 'start',
                coordinates: [[166,464],[170,470],[205,451],[200,444]],
                type: 'polygon'
            },
            {
                bottomRight: [88,362],
                name: 'up',
                topLeft: [60,337],
                type: 'rectangle'
            }
        ];

        const device = document.getElementById('device');

        device.addEventListener('pointerdown', event => {
            event.preventDefault();

            for (const button of buttons) {
                if (this.hitTestButton(button, event.offsetX, event.offsetY)) {
                    this.buttonStates[button.name] = true;
                    this.pointerStates[event.pointerId] = button.name;

                    if (button.name === 'start') {
                        switch (this.state) {
                            case 'start':
                                this.state = 'game';
                                this.loopHandle = setInterval(() => this.loop(INTERVAL), INTERVAL * 1000);
                                break;
                            case 'game':
                                clearInterval(this.loopHandle);
                                this.loopHandle = null;
                                this.possum = new Possum();
                                this.initializeLevel();
                                this.state = 'start';
                                this.run();
                                break;

                        }
                    }
                }
            }
        });

        device.addEventListener('pointerup', event => {
            event.preventDefault();

            for (const button of buttons) {
                if (this.hitTestButton(button, event.offsetX, event.offsetY) ||
                    this.pointerStates[event.pointerId] === button.name) {
                    this.buttonStates[button.name] = false;

                    if (button.name === 'start') {
                        this.transport.start();
                    }
                }
            }
        });

        device.addEventListener('touchstart', event => {
            event.preventDefault();
        })
    }

    initializeKeys() {
        window.addEventListener('keydown', event => {
            if (event.code === 'KeyA'|| event.code === 'ArrowLeft') {
                this.buttonStates.left = true;
            }

            if (event.code === 'KeyD' || event.code === 'ArrowRight') {
                this.buttonStates.right = true;
            }

            if (event.code === 'KeyK' || event.key === 'Shift') {
                this.buttonStates.b = true;
            }

            if (event.code === 'KeyL' || event.key === 'ArrowUp') {
                this.buttonStates.a = true;
            }
        });

        window.addEventListener('keyup', event => {
            if (event.code === 'KeyA'|| event.code === 'ArrowLeft') {
                this.buttonStates.left = false;
            }

            if (event.code === 'KeyD' || event.code === 'ArrowRight') {
                this.buttonStates.right = false;
            }

            if (event.code === 'KeyK' || event.key === 'Shift') {
                this.buttonStates.b = false;
            }

            if (event.code === 'KeyL' || event.key === 'ArrowUp') {
                this.buttonStates.a = false;
            }
        });
    }

    initializeLevel() {
        this.level = 0;
        this.scrollX = 0;

        this.sprites = [this.possum];

        const levelSprites = sprites[this.level];
        for (const levelSprite of levelSprites) {
            if (levelSprite.type === 'jug') {
                const jug = new Jug(levelSprite.note, levelSprite.tileX, levelSprite.tileY);
                this.sprites.push(jug);
            }
        }
    }

    initializeSound() {
        this.transport = Tone.getTransport();

        // Create the banjo strings
        this.instrument = new Tone.Sampler({
                urls: {
                    B3: 'B3.wav',
                    D3: 'D3.wav',
                    D4: 'D4.wav',
                    G3: 'G3.wav',
                    G4: 'G4.wav'
                },
                baseUrl: './sounds/'
            }).toDestination();
    }

    loop(interval) {
        const level = levels[this.level];
        const levelWidth = level[0].length;

        // Clear the screen
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update the level left/right scroll position based on where the possum is
        if (this.possum.levelX + this.possum.spriteWidth / 2 >= SCREEN_WIDTH / 2 &&
            this.scrollX + SCREEN_WIDTH < levelWidth * TILE_SIZE ||
            (this.possum.levelX + SCREEN_WIDTH/2 + this.possum.spriteWidth / 2 <= levelWidth * TILE_SIZE && this.scrollX > 0)) {
            this.scrollX = this.possum.levelX - SCREEN_WIDTH / 2 + this.possum.spriteWidth / 2;
        }

        // TODO draw the background

        // Draw the level
        this.drawLevelTiles();

        // Update sprite positions, handle input, draw them, and process collisions
        for (const sprite of this.sprites) {
            sprite.refreshRenderPosition(this.scrollX);
            sprite.draw(this.context);
            const collisions = this.checkSpriteTileCollisions(sprite);
            const updateContext = {
              buttonStates: this.buttonStates,
              collisions: collisions,
              interval: interval,
              game: this,
              levelWidth: levelWidth * TILE_SIZE
            };
            sprite.update(updateContext);
        }
    }

    playNote(note) {
        this.instrument.triggerAttackRelease(note, '1n');
    }

    run() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(this.startCard, 0, 0, this.canvas.width, this.canvas.height);
    }
}

const game = new Game();
game.run();