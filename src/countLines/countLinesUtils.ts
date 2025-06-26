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