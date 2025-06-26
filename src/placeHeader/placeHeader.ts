import * as fs from 'fs';

const	placerUtils = require('./placerUtils');
const	normalPlacer = require('./normalHeader');
const	makefilePlacer = require('./makefileHeader');

export function	placeHeader(file:string) :string
{
	// Extract file info
	let	info = fs.statSync(file);

	// Get all lines
	let	lines:string[] = fs.readFileSync(file, 'utf-8').split(/\r?\n/);

	// Establish if header already exists
	// headerExist() is required in two methods
	// => i created a variable to avoid double calling an expensive method
	let	header_already_exist : boolean;

	if (placerUtils.isMakefile(file))
		header_already_exist = makefilePlacer.headerExist_makefile(lines);
	else
		header_already_exist = normalPlacer.headerExist_normal(lines);

	// If header already exist
	//	if the last change time in header is older than the actual last change time
	//	=> update the header
	//	=> else, do nothing
	if (header_already_exist)
	{
		let	header_last_change_time: String = lines[8].slice(14, 33);
		let	file_last_change_time: String = placerUtils.getCorrectDateFormat(info.mtime);

		if (header_last_change_time == file_last_change_time)
			return (file);
	}

	// Get new header
	let	new_lines:string[];

	if (placerUtils.isMakefile(file))
		new_lines = makefilePlacer.formatNewHeader_makefile(file, header_already_exist, lines, info);
	else
		new_lines = normalPlacer.formatNewHeader_normal(file, header_already_exist, lines, info);

	// Get the lines to copy
	let	elements_to_copy:string[] = lines.slice(getCopyStartingPosition(lines, header_already_exist));

	// Conditionally insert the newline at the end of file
	if (lines[lines.length - 1] != "")
		elements_to_copy.push("");

	// Adding all the test to the file
	fs.appendFileSync(file, new_lines.concat(elements_to_copy).join('\n'));

	return (file);
}

// Return the position where start to copy 
// 	=> start of the file if header doesn't exist
//	=> start of the first line after the header if it exists (skipping the empty line)
function	getCopyStartingPosition(lines:string[], header_already_exist:boolean) :number
{
	// If header already exist && there are no lines to copy
	//	=> return the header height to skip it
	if (lines.length - (placerUtils.header_height) <= 0 && header_already_exist)
		return (placerUtils.header_height);

	let	i: number = (header_already_exist) ? placerUtils.header_height : 0;

	// If there was already an empty line
	//	=> skip it because it's placed by new header
	if (lines[i] == "")
		i++;

	return (i);
}

