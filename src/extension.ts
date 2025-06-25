import * as vscode from 'vscode';
import { SidebarViewProvider } from './sidebarProvider';
import { SecondaryViewProvider } from './secondaryViewProvider';

// Musn't specify extension like this ('./commands.ts')
const	commands = require('./commands');

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

	// Register the primary sidebar view (with tabs)
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('primarySideBar', new SidebarViewProvider(context))
	);

	// Register the secondary view for actions
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('sheratanView2', new SecondaryViewProvider(context))
	);
}

