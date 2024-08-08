"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Grid_1 = require("./models/Grid");
const Obstacle_1 = require("./models/Obstacle");
const Rover_1 = require("./models/Rover");
const MoveCommand_1 = require("./commands/MoveCommand");
const TurnLeftCommand_1 = require("./commands/TurnLeftCommand");
const TurnRightCommand_1 = require("./commands/TurnRightCommand");
const InputHandler_1 = require("./utils/InputHandler");
const Logger_1 = require("./utils/Logger");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputHandler = new InputHandler_1.InputHandler();
        const logger = new Logger_1.Logger();
        try {
            const gridWidth = parseInt(yield inputHandler.question('Enter grid width: '), 10);
            const gridHeight = parseInt(yield inputHandler.question('Enter grid height: '), 10);
            const startX = parseInt(yield inputHandler.question('Enter starting X position: '), 10);
            const startY = parseInt(yield inputHandler.question('Enter starting Y position: '), 10);
            const startDirection = yield inputHandler.question('Enter starting direction (N, S, E, W): ');
            const commandsInput = yield inputHandler.question('Enter commands (M, L, R) without spaces (e.g., MMRMLM): ');
            const obstaclesInput = yield inputHandler.question('Enter obstacles as comma-separated pairs (e.g., 1,1 2,2 3,3): ');
            const commands = commandsInput.split('');
            const obstacles = obstaclesInput.split(' ').map(pair => {
                const [x, y] = pair.split(',').map(Number);
                return new Obstacle_1.Obstacle(x, y);
            });
            // Initialize grid, rover, and command map
            const grid = new Grid_1.Grid(gridWidth, gridHeight);
            const rover = new Rover_1.Rover(startX, startY, startDirection, grid, obstacles, logger);
            const commandMap = {
                'M': new MoveCommand_1.MoveCommand(rover),
                'L': new TurnLeftCommand_1.TurnLeftCommand(rover),
                'R': new TurnRightCommand_1.TurnRightCommand(rover),
            };
            // Execute commands
            for (const command of commands) {
                const commandObject = commandMap[command];
                if (commandObject) {
                    commandObject.execute();
                }
                else {
                    logger.log(`Unknown command: ${command}`);
                }
            }
            // Output rover status
            console.log(rover.getStatus());
        }
        catch (error) {
            if (error instanceof Error) {
                logger.log(`Error: ${error.message}`);
            }
            else {
                logger.log(`Unknown error: ${error}`);
            }
        }
        finally {
            inputHandler.close();
        }
    });
}
main();
