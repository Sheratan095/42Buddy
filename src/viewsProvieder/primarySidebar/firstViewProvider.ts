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
			switch (message.command) {
				case 'executeInserHeader':
					vscode.commands.executeCommand('42buddy.place_header_in_all_files');
					break;
				
				case 'place_header':
					vscode.commands.executeCommand('42buddy.place_header');
					break;
				
				case 'saveSettings':
					this.saveSettings(message.data);
					break;
				
				case 'loadSettings':
					this.loadSettings(webviewView.webview);
					break;
				
				case 'format_code':
					// Add your format code logic here
					vscode.window.showInformationMessage('Format code feature coming soon!');
					break;
				
				case 'check_norminette':
					// Add your norminette check logic here
					vscode.window.showInformationMessage('Norminette check feature coming soon!');
					break;
			}
		});
	}

	private saveSettings(data: any) {
		const config = vscode.workspace.getConfiguration('42Buddy');
		if (data.username) {
			config.update('Username', data.username, vscode.ConfigurationTarget.Global);
		}
		if (data.email) {
			config.update('Email', data.email, vscode.ConfigurationTarget.Global);
		}
		vscode.window.showInformationMessage('Settings saved successfully!');
	}

	private loadSettings(webview: vscode.Webview) {
		const config = vscode.workspace.getConfiguration('42Buddy');
		const username = config.get<string>('Username', '');
		const email = config.get<string>('Email', '');
		
		webview.postMessage({
			command: 'loadedSettings',
			data: { username, email }
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