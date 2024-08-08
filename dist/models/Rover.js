"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rover = void 0;
const MoveCommand_1 = require("../commands/MoveCommand");
const TurnLeftCommand_1 = require("../commands/TurnLeftCommand");
const TurnRightCommand_1 = require("../commands/TurnRightCommand");
class Rover {
    constructor(x, y, direction, grid, obstacles, logger) {
        this.x = x;
        this.y = y;
        this.grid = grid;
        this.obstacles = obstacles;
        this.logger = logger;
        this.directions = ['N', 'E', 'S', 'W'];
        this.directionIndex = this.directions.indexOf(direction);
        this.commandMap = {
            'M': new MoveCommand_1.MoveCommand(this),
            'L': new TurnLeftCommand_1.TurnLeftCommand(this),
            'R': new TurnRightCommand_1.TurnRightCommand(this),
        };
        this.obstacleSet = new Set(obstacles.map(obstacle => `${obstacle.x},${obstacle.y}`));
    }
    execute(command) {
        const commandExecutor = this.commandMap[command];
        if (commandExecutor) {
            commandExecutor.execute();
        }
        else {
            this.logger.log(`Unknown command: ${command}`);
        }
    }
    move() {
        const moveActions = {
            'N': () => this.moveTo(this.x - 1, this.y),
            'E': () => this.moveTo(this.x, this.y + 1),
            'S': () => this.moveTo(this.x + 1, this.y),
            'W': () => this.moveTo(this.x, this.y - 1),
        };
        const currentDirection = this.directions[this.directionIndex];
        if (moveActions[currentDirection]) {
            moveActions[currentDirection](); // Execute  based on direction
        }
        else {
            this.logger.log(`Invalid direction: ${currentDirection}`);
        }
    }
    moveTo(newX, newY) {
        if (this.isValidPosition(newX, newY)) {
            this.x = newX;
            this.y = newY;
        }
        else {
            this.logger.log(`Obstacle detected or out of bounds at (${newX}, ${newY}). Rover did not move.`);
        }
    }
    turnLeft() {
        this.directionIndex = (this.directionIndex + 3) % 4;
    }
    turnRight() {
        this.directionIndex = (this.directionIndex + 1) % 4;
    }
    isValidPosition(x, y) {
        const withinBounds = x >= 0 && x < this.grid.width && y >= 0 && y < this.grid.height;
        const positionKey = `${x},${y}`; // Create a key for the position
        const noObstacle = !this.obstacleSet.has(positionKey); // Check for obstacle using the Set
        return withinBounds && noObstacle;
    }
    getStatus() {
        return `Rover is at (${this.x}, ${this.y}) facing ${this.directions[this.directionIndex]}.`;
    }
}
exports.Rover = Rover;
