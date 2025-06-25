import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

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

	getHtml(webview: vscode.Webview): string
	{
		const	htmlPath = path.join(this.context.extensionPath, 'views', 'primarySidebar/secondView/index.html');
		const	cssPath = path.join(this.context.extensionPath, 'views', 'primarySidebar/secondView/style.css');

		let		html = fs.readFileSync(htmlPath, 'utf8');
		const	cssUri = webview.asWebviewUri(vscode.Uri.file(cssPath));
		
		html = html.replace('{{CSS_URI}}', cssUri.toString());

		return (html);
	}
}
