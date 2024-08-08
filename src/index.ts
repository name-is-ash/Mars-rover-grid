import { Grid } from './models/Grid';
import { Obstacle } from './models/Obstacle';
import { Rover } from './models/Rover';
import { MoveCommand } from './commands/MoveCommand';
import { TurnLeftCommand } from './commands/TurnLeftCommand';
import { TurnRightCommand } from './commands/TurnRightCommand';
import { InputHandler } from './utils/InputHandler';
import { Logger } from './utils/Logger';

async function main() {
    const inputHandler = new InputHandler();
    const logger = new Logger();

    try {
        const gridWidth = parseInt(await inputHandler.question('Enter grid width: '), 10);
        const gridHeight = parseInt(await inputHandler.question('Enter grid height: '), 10);
        const startX = parseInt(await inputHandler.question('Enter starting X position: '), 10);
        const startY = parseInt(await inputHandler.question('Enter starting Y position: '), 10);
        const startDirection = await inputHandler.question('Enter starting direction (N, S, E, W): ');
        const commandsInput = await inputHandler.question('Enter commands (M, L, R) without spaces (e.g., MMRMLM): ');
        const obstaclesInput = await inputHandler.question('Enter obstacles as comma-separated pairs (e.g., 1,1 2,2 3,3): ');

        const commands = commandsInput.split('');
        const obstacles = obstaclesInput.split(' ').map(pair => {
            const [x, y] = pair.split(',').map(Number);
            return new Obstacle(x, y);
        });

        // Initialize grid, rover, and command map
        const grid = new Grid(gridWidth, gridHeight);
        const rover = new Rover(startX, startY, startDirection, grid, obstacles, logger);

        const commandMap: { [key: string]: { execute: () => void } } = {
            'M': new MoveCommand(rover),
            'L': new TurnLeftCommand(rover),
            'R': new TurnRightCommand(rover),
        };

        // Execute commands
        for (const command of commands) {
            const commandObject = commandMap[command];
            if (commandObject) {
                commandObject.execute();
            } else {
                logger.log(`Unknown command: ${command}`);
            }
        }

        // Output rover status
        console.log(rover.getStatus());
    } catch (error) {
        if (error instanceof Error) {
            logger.log(`Error: ${error.message}`);
        } else {
            logger.log(`Unknown error: ${error}`);
        }
    } finally {
        inputHandler.close();
    }
}

main();
