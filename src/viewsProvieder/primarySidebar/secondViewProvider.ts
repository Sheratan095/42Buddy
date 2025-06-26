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
			}
		});
	}

	private saveFlags(flags: { cFiles: boolean; cppFiles: boolean; makefile: boolean, username: string, email: string, countLines: boolean })
	{
		utils.setConfigValue("42Buddy.CFiles", flags.cFiles);
		utils.setConfigValue("42Buddy.CppFiles", flags.cppFiles);
		utils.setConfigValue("42Buddy.Makefile", flags.makefile);
		utils.setConfigValue("42Buddy.Username", flags.username);
		utils.setConfigValue("42Buddy.Email", flags.email);
		utils.setConfigValue("42Buddy.CountLines", flags.countLines);
	}

	getHtml(webview: vscode.Webview): string
	{
		const	htmlPath = path.join(this.context.extensionPath, 'views', 'primarySidebar/secondView/secondView.html');
		const	cssPath = path.join(this.context.extensionPath, 'views', 'primarySidebar/secondView/secondView.css');

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

		if (utils.getConfigValue("42Buddy.CountLines"))
			html = html.replace('{{COUNT_LINES_CHECKED}}', 'checked');
		else
			html = html.replace('{{COUNT_LINES_CHECKED}}', '');


		html = html.replace('{{USERNAME_VALUE}}', utils.getConfigValue("42Buddy.Username"));

		html = html.replace('{{EMAIL_VALUE}}', utils.getConfigValue("42Buddy.Email"));

		return (html);
	}
}
