"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnLeftCommand = void 0;
class TurnLeftCommand {
    constructor(rover) {
        this.rover = rover;
    }
    execute() {
        this.rover.turnLeft();
    }
}
exports.TurnLeftCommand = TurnLeftCommand;
