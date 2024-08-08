import { Command } from './Command';
import { Rover } from '../models/Rover';

export class MoveCommand implements Command {
    constructor(private rover: Rover) {}

    execute(): void {
        this.rover.move();
    }
}