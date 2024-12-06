import * as vscode from 'vscode';

//Musn't specify extension like this ('./header_placer.ts')
const commands = require('./commands')

export function activate(context: vscode.ExtensionContext)
{

	let placeHeaderInAllFiles = vscode.commands.registerCommand('42buddy.place_header_in_all_files', () => {
		commands.placeHeaderInAllFiles();
	});
	context.subscriptions.push(placeHeaderInAllFiles);

	let place_header = vscode.commands.registerCommand('42buddy.place_header', () => {
		commands.placeHeaderInSingleFile();
	});
	context.subscriptions.push(place_header);

}