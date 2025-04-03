import * as fs from 'fs';
import * as path from 'path';

const	utils = require('./utils');

const	header_height : number = 11;
const	header_length: number = 81;

export function	placeHeader(file:string) :string
{
	// Extract file info
	let	info = fs.statSync(file);

	// Get all lines
	let	lines:string[] = fs.readFileSync(file, 'utf-8').split(/\r?\n/);

	// Establish if header already exists
	// headerExist() is required in two methods
	// => i created a variable to avoid double calling an expensive method
	let	header_already_exist : boolean = headerExist(lines);

	// If header already exist
	//	if the last change time in header is older than the actual last change time
	//	=> update the header
	//	=> else, do nothing
	if (header_already_exist)
	{
		let	header_last_change_time: String = lines[8].slice(14, 33);
		let	file_last_change_time: String = utils.getCorrectDateFormat(info.mtime);

		if (header_last_change_time == file_last_change_time)
			return (file);
	}

	// Get new header
	let	new_lines:string[] = formatNewHeader(file, header_already_exist, lines, info);

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
	if (lines.length - (header_height) <= 0 && header_already_exist)
		return (header_height);

	let	i: number = (header_already_exist) ? header_height : 0;

	// If there was already an empty line
	//	=> skip it because it's placed by new header
	if (lines[i] == "")
		i++;

	return (i);
}

// Check if in the file ther's already the header
function	headerExist(lines: string[]): boolean
{
	if (lines.length < header_height) {
		return false;
	}

	for (let i = 0; i < header_height; i++)
	{
		// Second condition in end of line because in linux vscode all the lines end with \r
		//	and in window with \n (char that's used to split lines during file reading)
		if (!(lines[i].startsWith("/*") && 
			(lines[i].endsWith("*/") || lines[i].endsWith("*/\r"))))
		{
			return (false);
		}
	}

	return (true);
}

// Lines is used to get creation datetime in case of header already exists
//	=> it prevent the need of reading file another time just to get the date
function	formatNewHeader(file_path: string, header_already_exist:boolean, lines:string[], info: fs.Stats): string[]
{
	let	correct_creation_datetime : string;

	// +1 for the empty row after the header
	let	header: string[] = new Array<string>(header_height + 1);

	// If header already exist
	//	=> get cretion date time form it
	if (header_already_exist)
	{
		// 14 & 33 are respectively start and end of datetime
		correct_creation_datetime = lines[7].slice(14, 33);
	}
	else
		correct_creation_datetime = utils.getCorrectDateFormat(info.mtime);

	// Removing all lines
	fs.writeFileSync(file_path, '');

	// Variable reused to calculate padding of ' ' to write
	let	padding = 0;

	// HeaderBuilding
	header[0] = "/* ************************************************************************** */";
	header[1] = "/*                                                                            */";
	header[2] = "/*                                                        :::      ::::::::   */";

	// header[3] (FileName)
	header[3] = `/*   ${path.basename(file_path)}`;
	padding = header_length - header[3].length - ":+:      :+:    :+:   */".length - 1;
	header[3] += ' '.repeat(padding) + ":+:      :+:    :+:   */";

	header[4] = "/*                                                    +:+ +:+         +:+     */";

	// header[5] (Author)
	header[5] = `/*   By: ${utils.getConfigValue("42Buddy.Username")} <${utils.getConfigValue("42Buddy.Email")}>`;
	padding = header_length - header[5].length - "+#+  +:+       +#+        */".length - 1;
	header[5] += ' '.repeat(padding) + "+#+  +:+       +#+        */";

	header[6] = "/*                                                +#+#+#+#+#+   +#+           */";

	// header[7] (Creation)
	header[7] = `/*   Created: ${correct_creation_datetime} by ${utils.getConfigValue("42Buddy.Username")}`;
	padding = header_length - header[7].length - "#+#    #+#             */".length - 1;
	header[7] += ' '.repeat(padding) + "#+#    #+#             */";

	// header[8] (Update)
	header[8] = `/*   Updated: ${utils.getCorrectDateFormat(new Date())} by ${utils.getConfigValue("42Buddy.Username")}`;
	padding = header_length - header[8].length - "###   ########.fr       */".length - 1;
	header[8] += ' '.repeat(padding) + "###   ########.fr       */";

	header[9] = "/*                                                                            */";
	header[10] = "/* ************************************************************************** */";

	// empty row after the header
	header[11] = "";

	return (header)
}