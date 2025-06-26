import * as vscode from 'vscode';

const	utils = require('./utils');
const	placerUtils = require('./placeHeader/placerUtils');
const	placer = require('./placeHeader/placeHeader');
const	path = require('path');

export function	placeHeaderInAllFiles() : boolean
{
	// Precondition, check if an workspace is open
	if (vscode.workspace.workspaceFolders == undefined)
		return (vscode.window.showInformationMessage("Open a folder to execute this command"), false)

	// Check if all configuration values are set
	if (!utils.checkSettings())
		return (false);

	// We take as an assumption that just one folder is open in the workspace

	let		current_dir = vscode.workspace.workspaceFolders[0].uri.fsPath;
	const	files: string[] = placerUtils.getFiles(current_dir);

	for (let file of files)
		placer.placeHeader(file);

	vscode.window.showInformationMessage("42 Header has been placed");
	
	return (true);
}

export function	placeHeaderInSingleFile() : boolean
{
	if (!utils.checkSettings())
		return (false);
	
	const	activeEditor = vscode.window.activeTextEditor;

	// Check if the function has been called on a text editor
	if (!activeEditor)
		return (false);

	const	fileName = activeEditor.document.fileName;

	// Check if the file has a valid extension
	if (!placerUtils.isFileSupported(fileName))
		return (false);

	placer.placeHeader(fileName);
	vscode.window.showInformationMessage(`42 Header has been placed in ${path.basename(fileName)}`);

	return (true);
}
