import * as vscode from 'vscode';
//const utils = require('./utils')

//Musn't specify extension like this ('./header_placer.ts')
const header_placer = require('./header_placer')

export function activate(context: vscode.ExtensionContext) {

	let place_header = vscode.commands.registerCommand('42buddy.place_header', () => {
		header_placer.place_header();
	});
	context.subscriptions.push(place_header);
}