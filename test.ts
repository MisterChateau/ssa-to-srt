import * as fs from 'fs';

async function main() {
	fs.writeFileSync('./tmp.txt', 'hello', 'UTF-8');
}
