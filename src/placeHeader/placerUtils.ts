
const	utils = require('../utils');

const fs = require('fs');
const path = require('path');

const	cTypes:string[] = [".c", ".h"];
const	cppTypes:string[] = [".cpp", ".hpp", ".tpp"];
const	makefileNames:string[] = ["Makefile", "makefile"];

export const	header_height : number = 11;
export const	header_length: number = 80;

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

	if (utils.getConfigValue("42Buddy.CFiles") == true)
		if (cTypes.includes(extension))
			return (true);

	if (utils.getConfigValue("42Buddy.CppFiles") == true)
		if (cppTypes.includes(extension))
			return (true);

	if (utils.getConfigValue("42Buddy.Makefile") == true)
		if (isMakefile(filePath))
			return (true);
	return (false);
}

export function	isMakefile(filePath: string): boolean
{
	const	fileName = path.basename(filePath);

	if (makefileNames.includes(fileName))
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
