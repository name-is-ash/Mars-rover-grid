import { Grid } from './Grid';
import { Obstacle } from './Obstacle';
import { Logger } from '../utils/Logger';
import { Command } from '../commands/Command';
import { MoveCommand } from '../commands/MoveCommand';
import { TurnLeftCommand } from '../commands/TurnLeftCommand';
import { TurnRightCommand } from '../commands/TurnRightCommand';

export class Rover {
    private directions = ['N', 'E', 'S', 'W'];
    private directionIndex: number;
    private commandMap: { [key: string]: Command };
    private obstacleSet: Set<string>; 

    constructor(
        public x: number,
        public y: number,
        direction: string,
        private grid: Grid,
        private obstacles: Obstacle[],
        private logger: Logger
    ) {
        this.directionIndex = this.directions.indexOf(direction);
        this.commandMap = {
            'M': new MoveCommand(this),
            'L': new TurnLeftCommand(this),
            'R': new TurnRightCommand(this),
        };
        
        this.obstacleSet = new Set(obstacles.map(obstacle => `${obstacle.x},${obstacle.y}`));
    }

    execute(command: string): void {
        const commandExecutor = this.commandMap[command];
        if (commandExecutor) {
            commandExecutor.execute();
        } else {
            this.logger.log(`Unknown command: ${command}`);
        }
    }

    move(): void {
        const moveActions: { [key: string]: () => void } = {
            'N': () => this.moveTo(this.x-1, this.y ),
            'E': () => this.moveTo(this.x , this.y+1),
            'S': () => this.moveTo(this.x+1, this.y),
            'W': () => this.moveTo(this.x, this.y-1),
        };

        const currentDirection = this.directions[this.directionIndex];
        if (moveActions[currentDirection]) {
            moveActions[currentDirection](); // Execute  based on direction
        } else {
            this.logger.log(`Invalid direction: ${currentDirection}`);
        }
    }

    private moveTo(newX: number, newY: number): void {
        if (this.isValidPosition(newX, newY)) {
            this.x = newX;
            this.y = newY;
        } else {
            this.logger.log(`Obstacle detected or out of bounds at (${newX}, ${newY}). Rover did not move.`);
        }
    }

    turnLeft(): void {
        this.directionIndex = (this.directionIndex + 3) % 4; 
    }

    turnRight(): void {
        this.directionIndex = (this.directionIndex + 1) % 4; 
    }

    private isValidPosition(x: number, y: number): boolean {
        const withinBounds = x >= 0 && x < this.grid.width && y >= 0 && y < this.grid.height;
        const positionKey = `${x},${y}`; // Create a key for the position
        const noObstacle = !this.obstacleSet.has(positionKey); // Check for obstacle using the Set
        return withinBounds && noObstacle;
    }

    getStatus(): string {
        return `Rover is at (${this.x}, ${this.y}) facing ${this.directions[this.directionIndex]}.`;
    }
}
