"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnRightCommand = void 0;
class TurnRightCommand {
    constructor(rover) {
        this.rover = rover;
    }
    execute() {
        this.rover.turnRight();
    }
}
exports.TurnRightCommand = TurnRightCommand;
