import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// export allows to use this class in other files
export class FirstViewProvider implements vscode.WebviewViewProvider
{
	constructor(private readonly context: vscode.ExtensionContext) {}

	resolveWebviewView(webviewView: vscode.WebviewView, _context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken)
	{
		webviewView.webview.options = { enableScripts: true};

		webviewView.webview.html = this.getHtml(webviewView.webview);

		// This listens for messages that are sent from your Webview (HTML/JavaScript) to your extension's backend, and reacts to them
		webviewView.webview.onDidReceiveMessage(message =>
		{
			switch (message.command)
			{
				case 'place_header_in_all_files':
					vscode.commands.executeCommand('42buddy.place_header_in_all_files');
					break;

				case 'place_header':
					vscode.commands.executeCommand('42buddy.place_header');
					break;

				default:
					vscode.window.showErrorMessage(`Unknown command: ${message.command}`);
					break;
			}
		});
	}

	getHtml(webview: vscode.Webview): string
	{
		const	htmlPath = path.join(this.context.extensionPath, 'views', 'primarySidebar/firstView/index.html');
		const	cssPath = path.join(this.context.extensionPath, 'views', 'primarySidebar/firstView/style.css');

		let		html = fs.readFileSync(htmlPath, 'utf8');
		const	cssUri = webview.asWebviewUri(vscode.Uri.file(cssPath));
		
		html = html.replace('{{CSS_URI}}', cssUri.toString());

		return (html);
	}
}