import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// export allows to use this class in other files
export class SidebarViewProvider implements vscode.WebviewViewProvider
{
	constructor(private readonly context: vscode.ExtensionContext) {}

	resolveWebviewView(webviewView: vscode.WebviewView, _context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken)
	{
		webviewView.webview.options = { enableScripts: true};

	webviewView.webview.html = this.getHtml(webviewView.webview);

	// This listens for messages that are sent from your Webview (HTML/JavaScript) to your extension's backend, and reacts to them
	webviewView.webview.onDidReceiveMessage(message =>
	{
		if (message.command === 'sayHello')
			vscode.commands.executeCommand('sheratan.sayHello');
	});
  }

	getHtml(webview: vscode.Webview): string
	{
		const	htmlPath = path.join(this.context.extensionPath, 'views', 'primarySidebar/index.html');
		console.log(`htmlPath: ${htmlPath}`);

		let		html = fs.readFileSync(htmlPath, 'utf8');

		return (html);
	}
}