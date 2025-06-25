import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class SecondaryViewProvider implements vscode.WebviewViewProvider
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
		return `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="color-scheme" content="light dark">
			<style>
				body {
					background-color: #1e1e1e;
					color: white;
					margin: 0;
					padding: 10px;
					font-family: sans-serif;
				}
				
				.action-button {
					background-color: #0078d4;
					color: white;
					padding: 10px 15px;
					border: none;
					border-radius: 4px;
					cursor: pointer;
					margin: 5px 0;
					width: 100%;
					text-align: left;
					font-size: 14px;
				}
				
				.action-button:hover {
					background-color: #106ebe;
				}
				
				.action-section {
					margin: 15px 0;
				}
				
				.action-section h4 {
					color: #cccccc;
					margin-bottom: 10px;
					border-bottom: 1px solid #3c3c3c;
					padding-bottom: 5px;
				}
			</style>
		</head>
		<body>
			<h3>42Buddy Actions</h3>
			
			<div class="action-section">
				<h4>Quick Actions</h4>
				<button class="action-button" onclick="sendCommand('openTerminal')">
					📁 Open Terminal
				</button>
				<button class="action-button" onclick="sendCommand('openFile')">
					📄 Open File
				</button>
				<button class="action-button" onclick="sendCommand('showCommands')">
					⚡ Show Commands
				</button>
			</div>
			
			<div class="action-section">
				<h4>42 School Tools</h4>
				<button class="action-button" onclick="alert('Feature coming soon!')">
					🏫 Check Intra Profile
				</button>
				<button class="action-button" onclick="alert('Feature coming soon!')">
					📊 Project Status
				</button>
				<button class="action-button" onclick="alert('Feature coming soon!')">
					🎯 Peer Evaluation Helper
				</button>
			</div>

			<script>
				const vscode = acquireVsCodeApi();

				function sendCommand(command) {
					vscode.postMessage({ command: command });
				}
			</script>

		</body>
		</html>
		`;
	}
}
