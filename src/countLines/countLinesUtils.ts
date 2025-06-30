import * as vscode from 'vscode';

const	utils = require('../utils');

const fs = require('fs');
const path = require('path');

const	cTypes:string[] = [".c"];
const	cppTypes:string[] = [".cpp", ".hpp", ".tpp"];

export function	isFileSupported(filePath : string) : boolean
{
	const	extension = path.extname(filePath);

	if (utils.getConfigValue("42Buddy.CFiles") == true)
		if (cTypes.includes(extension))
			return (true);

	// if (utils.getConfigValue("42Buddy.CppFiles") == true)
	// 	if (cppTypes.includes(extension))
	// 		return (true);

	return (false);
}
export function	getDecorationText(i: number, countLines: number) : vscode.DecorationOptions
{
	const	range: vscode.Range = new vscode.Range(i+1, 0, i+1, 0);
	var		decoration: vscode.DecorationOptions;

	if (countLines > 25)
	{
		decoration = {
			range: range,
			renderOptions:
			{
				after:
				{
					contentText: `⚠⚠ ${(countLines > 0)?  countLines - 1 : 0} FUNCTION LINES ⚠⚠ `,
				}
			}
		}
	}
	else
	{
		decoration = {
			range: range,
			renderOptions:
			{
				after:
				{
					contentText: `――― ${(countLines > 0)?  countLines - 1 : 0} FUNCTION LINES ―――`,
				}
			}
		}
	}	

	return (decoration);
}