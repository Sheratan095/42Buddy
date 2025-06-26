import * as vscode from 'vscode';

const fs = require('fs');
const path = require('path');

const	cTypes:string[] = [".c", ".h"];
const	cppTypes:string[] = [".cpp", ".hpp", ".tpp"];
const	makefileNames:string[] = ["Makefile", "makefile"];

// Recursive searching of .c and .h files
export function	getFiles(root_dir: string): string[]
{
	const resulting_files: string[] = [];
	const readen_files = fs.readdirSync(root_dir);

	for (const file of readen_files)
	{
		const filePath = path.join(root_dir, file);

		// Is a synchronous function call to retrieve the statistics of a file or directory specified by filePath
		const stats = fs.statSync(filePath);

		if (stats.isDirectory())
		{
			// if the file is a directory
			//	recursively call search_files
			const nestedFiles = getFiles(filePath);

			// The spread operator (...) is used to "spread" each element of the nestedFiles array into the resulting_files array individually.
			resulting_files.push(...nestedFiles);
		}
		else
		{
			// If it's a file, check its extension
			if (isFileSupported(file))
				resulting_files.push(filePath);
		}
	}

	return (resulting_files);
}

export function	isFileSupported(filePath : string) : boolean
{
	const	extension = path.extname(filePath);
	const	fileName = path.basename(filePath);

	if (getConfigValue("42Buddy.CFiles") == true)
		if (cTypes.includes(extension))
			return (true);

	if (getConfigValue("42Buddy.CppFiles") == true)
		if (cppTypes.includes(extension))
			return (true);

	if (getConfigValue("42Buddy.Makefile") == true)
		if (extension === ".mk" || makefileNames.includes(fileName))
			return (true);

	return (false);
}

export function	getCorrectDateFormat(date: Date):string
{
	// String.padStart() is used to ensure that each component
	//	has at least two digits, padding with a leading zero if necessary

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because it's zero-based
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	return (`${year}/${month}/${day} ${hours}:${minutes}:${seconds}`);
}

// Function to retrieve a configuration value
export function	getConfigValue(key: string): any
{
	return (vscode.workspace.getConfiguration().get(key));
}

// if a value isn't set
//	=> 'redirect' to the setting page
export function	checkSettings()
{
	if (getConfigValue("42Buddy.Email") == "" || getConfigValue("42Buddy.Username") == "")
	{
		// Last '.' just to avoid appearing of other things that shouldn't appear
		vscode.commands.executeCommand('workbench.action.openSettings', '42Buddy.');

		vscode.window.showErrorMessage('This settings are required, plase fill all fields');
		return (false);
	}

	return (true);
}