import * as vscode from 'vscode';

// Function to retrieve a configuration value
export function	getConfigValue(key: string): any
{
	return (vscode.workspace.getConfiguration().get(key));
}

export function	setConfigValue(key: string, value: any): void
{
	vscode.workspace.getConfiguration().update(key, value, vscode.ConfigurationTarget.Global);
}

// if a value isn't set
//	=> 'redirect' to the setting page
export function	checkSettings()
{
	if (getConfigValue("42Buddy.Email") == "" || getConfigValue("42Buddy.Username") == "")
	{
		// Last '.' just to avoid appearing of other things that shouldn't appear
		vscode.commands.executeCommand('workbench.action.openSettings', '42Buddy.');

		vscode.window.showErrorMessage('This settings are required, plase fill all fields');
		return (false);
	}

	return (true);
}