import * as vscode from 'vscode';

// export allows to use this class in other files
export class SidebarViewProvider implements vscode.WebviewViewProvider
{
	constructor(private readonly context: vscode.ExtensionContext) {}

	resolveWebviewView(webviewView: vscode.WebviewView, _context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken)
	{
		webviewView.webview.options = { enableScripts: true};

	webviewView.webview.html = this.getHtml(webviewView.webview);

	// Listen for message from webview
	webviewView.webview.onDidReceiveMessage(message =>
	{
		if (message.command === 'sayHello')
			vscode.commands.executeCommand('sheratan.sayHello');
	});
  }

	getHtml(webview: vscode.Webview): string {
	return `
		<html>
		<head>
			<style>
			body {
				color: white;
				margin: 0;
				padding: 10px;
				font-family: sans-serif;
			}

			button {
				background-color: #007acc;
				color: white;
				padding: 8px 12px;
				border: none;
				border-radius: 4px;
				cursor: pointer;
			}

			button:hover {
				background-color: #005fa3;
			}
			</style>
		</head>
		<body>
			<h3>42Buddy</h3>
			<button onclick="sendHello()">Say Hello</button>

			<script>
			const vscode = acquireVsCodeApi();
			function sendHello() {
				vscode.postMessage({ command: 'sayHello' });
			}
			</script>
		</body>
		</html>
	`;
  }
}