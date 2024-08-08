import { Command } from './Command';
import { Rover } from '../models/Rover';

export class TurnRightCommand implements Command {
    constructor(private rover: Rover) {}

    execute(): void {
        this.rover.turnRight();
    }
}
