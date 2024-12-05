import * as vscode from 'vscode';

const utils = require('./utils')
const placer = require('./place_header')

export function place_header_in_all_files() : boolean
{
	// Precondition, check if an workspace is open
	if (vscode.workspace.workspaceFolders == undefined)
		return (vscode.window.showInformationMessage("Open a folder to execute this command"), false)

	//Check if all configuration values are set
	if (!check_settings())
		return (false);

	// We take as an assumption that just one folder is open in the workspace

	let current_dir = vscode.workspace.workspaceFolders[0].uri.fsPath;
	const files: string[] = utils.get_files(current_dir);

	for (let file of files)
		placer.place_header(file);

	vscode.window.showInformationMessage("42 Header has been placed");
	
	return (true);
}

export function place_header_in_single_file() : boolean
{
	if (!check_settings())
		return (false);

	// const editor = vscode.window.activeTextEditor; // Get the active editor
	// if (editor)
	// {
	// 	const filePath = editor.document.uri.fsPath; // Get the file path of the current file
	// 	vscode.window.showInformationMessage(`Current file: ${filePath}`);
	// } else
	// {
	// 	vscode.window.showInformationMessage('No file is currently open.');
	// }
	
	return (true);
}

//If a value isn't set
//	=> 'redirect' to the setting page
function check_settings()
{
	if (utils.getConfigValue("42Buddy.Email") == "" || utils.getConfigValue("42Buddy.Username") == "")
	{
		// Last '.' just to avoid appearing of other things that shouldn't appear
		vscode.commands.executeCommand('workbench.action.openSettings', '42Buddy.');

		vscode.window.showErrorMessage('This settings are required, plase fill all fields');
		return (false);
	}

	return (true);
}