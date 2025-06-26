import * as vscode from 'vscode';

let	decorationType: vscode.TextEditorDecorationType;


export function initializeDecorations(context: vscode.ExtensionContext): void
{
	decorationType = vscode.window.createTextEditorDecorationType({
		after: {
			contentText: '👉 Hello from your extension!',
			color: 'blue',
			margin: '0 0 0 1em',
			fontWeight: 'light',
		}
	});

	// Update decorations for the current editor
	updateDecorations();

	// Listen for active editor changes
	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(() => {
			updateDecorations();
		})
	);

	// Listen for text document changes
	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(() => {
			updateDecorations();
		})
	);
}

function updateDecorations(): void
{
	const	editor = vscode.window.activeTextEditor;

	if (editor && decorationType)
	{
		const	decorations = [];

		// First decoration
		let	lineNumber = 20;
		let	range = new vscode.Range(lineNumber, 0, lineNumber, 0);
		decorations.push({ range: range, hoverMessage: 'Hover tooltip here' });

		// Second decoration
		lineNumber = 30;
		range = new vscode.Range(lineNumber, 0, lineNumber, 0);
		decorations.push({ range: range, hoverMessage: 'Another tooltip here' });

		// Add more decorations as needed
		lineNumber = 40;
		range = new vscode.Range(lineNumber, 0, lineNumber, 0);
		decorations.push({ range: range, hoverMessage: 'Third tooltip here' });

		// Apply all decorations at once
		editor.setDecorations(decorationType, decorations);
	}
}
