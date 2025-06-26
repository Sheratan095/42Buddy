import * as vscode from 'vscode';

const	utils = require('../utils');

let	decorationType: vscode.TextEditorDecorationType;


export function initializeDecorations(context: vscode.ExtensionContext): void
{
	decorationType = vscode.window.createTextEditorDecorationType({
		after: {
			color: '#888888', // Gray color for the text
			fontWeight: 'bold',
			fontStyle: 'italic',
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
	if (utils.getConfigValue("42Buddy.CountLines") === false)
		return;

	const	editor = vscode.window.activeTextEditor;
	// If no active editor, do nothing
	if (!editor)
		return;

	// Use editor document content instead of reading from file
	const	document = editor.document;
	const	text = document.getText();
	let	lines: string[] = text.split(/\r?\n/);
	
	var	openBrace = 0;
	var	decorations: vscode.DecorationOptions[] = [];
	var	countLines = 0;

	for (let i = 0; i < lines.length; i++)
	{
		const	line = lines[i];
		countLines++;
		
		// Count all braces on the line
		for (const char of line)
		{
			if (char === '{')
			{
				if (openBrace == 0)
					countLines = 0;
				openBrace++;
			}
			else if (char === '}')
			{
				openBrace--;
				
				if (openBrace === 0)
				{
					const	range = new vscode.Range(i+1, 0, i+1, 0);
					const	decoration = {
						range: range,
						renderOptions:
						{
							after:
							{
								contentText: `――― ${(countLines > 0)?  countLines - 1 : 0} FUNCTION LINES ―――`,
							}
						}
					}

					decorations.push(decoration);
				}
			}
		}
	}

	editor.setDecorations(decorationType, decorations);
}
