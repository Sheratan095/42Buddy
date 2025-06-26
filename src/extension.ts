import * as vscode from 'vscode';
import { FirstViewProvider } from './viewsProvieder/primarySidebar/firstViewProvider';
import { SecondViewProvider } from './viewsProvieder/primarySidebar/secondViewProvider';

// Musn't specify extension like this ('./commands.ts')
const	commands = require('./commands');
const	countLines = require('./countLines/countLines');

const	utils = require('./utils');

export function	activate(context: vscode.ExtensionContext)
{
	let	placeHeaderInAllFiles = vscode.commands.registerCommand('42buddy.place_header_in_all_files', () => {
		commands.placeHeaderInAllFiles();
	});
	context.subscriptions.push(placeHeaderInAllFiles);

	let	place_header = vscode.commands.registerCommand('42buddy.place_header', () => {
		commands.placeHeaderInSingleFile();
	});
	context.subscriptions.push(place_header);

	// Register the first sidebar view for commands
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('commandsView', new FirstViewProvider(context))
	);

	// Register the second view for actions
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('configurationView', new SecondViewProvider(context))
	);


	countLines.initializeDecorations(context);

}

