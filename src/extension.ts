import * as vscode from 'vscode';

//Musn't specify extension like this ('./header_placer.ts')
const commands = require('./commands')

export function activate(context: vscode.ExtensionContext)
{

	let place_header_in_all_files = vscode.commands.registerCommand('42buddy.place_header_in_all_files', () => {
		vscode.window.showInformationMessage(`all`);
		commands.place_header_in_all_files();
	});
	context.subscriptions.push(place_header_in_all_files);

	let place_header = vscode.commands.registerCommand('42buddy.place_header', () => {
		vscode.window.showInformationMessage(`singler`);
		commands.place_header_in_single_file();
	});
	context.subscriptions.push(place_header);

}