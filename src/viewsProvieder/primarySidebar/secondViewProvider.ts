import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

const	utils = require('../../utils');

export class SecondViewProvider implements vscode.WebviewViewProvider
{
	constructor(private readonly context: vscode.ExtensionContext) {}

	resolveWebviewView(webviewView: vscode.WebviewView, _context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken)
	{
		webviewView.webview.options = { enableScripts: true };

		webviewView.webview.html = this.getHtml(webviewView.webview);

		webviewView.webview.onDidReceiveMessage(message =>
		{
			switch (message.command) {
				case 'save_flags':
					this.saveFlags(message.data);
					break;
				
				case 'openTerminal':
					vscode.commands.executeCommand('terminal.new');
					break;
				
				case 'openFile':
					vscode.commands.executeCommand('workbench.action.files.openFile');
					break;
				
				case 'showCommands':
					vscode.commands.executeCommand('workbench.action.showCommands');
					break;
			}
		});
	}

	private saveFlags(flags: { cFiles: boolean; cppFiles: boolean; makefile: boolean })
	{
		const config = vscode.workspace.getConfiguration('42Buddy');
		config.update('CFiles', flags.cFiles, vscode.ConfigurationTarget.Global);
		config.update('CppFiles', flags.cppFiles, vscode.ConfigurationTarget.Global);
		config.update('Makefile', flags.makefile, vscode.ConfigurationTarget.Global);
		
		vscode.window.showInformationMessage('Flags saved successfully!');
	}

	getHtml(webview: vscode.Webview): string
	{
		const	htmlPath = path.join(this.context.extensionPath, 'views', 'primarySidebar/secondView/index.html');
		const	cssPath = path.join(this.context.extensionPath, 'views', 'primarySidebar/secondView/style.css');

		let		html = fs.readFileSync(htmlPath, 'utf8');
		const	cssUri = webview.asWebviewUri(vscode.Uri.file(cssPath));
		
		html = html.replace('{{CSS_URI}}', cssUri.toString());


		// Replace the placeholders with the actual values from the configuration
		if (utils.getConfigValue("42Buddy.CFiles"))
			html = html.replace('{{C_FILES_CHECKED}}', 'checked');
		else
			html = html.replace('{{C_FILES_CHECKED}}', '');

		if (utils.getConfigValue("42Buddy.CppFiles"))
			html = html.replace('{{CPP_FILES_CHECKED}}', 'checked');
		else
			html = html.replace('{{CPP_FILES_CHECKED}}', '');

		if (utils.getConfigValue("42Buddy.Makefile"))
			html = html.replace('{{MAKEFILE_CHECKED}}', 'checked');
		else
			html = html.replace('{{MAKEFILE_CHECKED}}', '');

		return (html);
	}
}
