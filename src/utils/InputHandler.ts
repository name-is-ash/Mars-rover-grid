import * as readline from 'readline';

export class InputHandler {
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    question(query: string): Promise<string> {
        return new Promise(resolve => this.rl.question(query, resolve));
    }

    close(): void {
        this.rl.close();
    }
}
