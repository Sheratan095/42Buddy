import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

const utils = require('./utils')

const header_height : number = 11;
const header_length: number = 81;

export function place_header() : boolean
{
	// Precondition, check if an workspace is open
	if (vscode.workspace.workspaceFolders == undefined)
		return (vscode.window.showInformationMessage("Open a folder to execute this command"), false)

	// We take as an assumption that just on folder is open in the workspace
	// TO DO, do the same thing in all folder in the workspace

	let current_dir = vscode.workspace.workspaceFolders[0].uri.fsPath;
	const files: string[] = utils.get_files(current_dir);

	for (let file of files)
	{
		// Get all lines
		let lines:string[] = fs.readFileSync(file, 'utf-8').split(/\r?\n/);

		// Establish if header already exists
		// Header_exist() is required in two methods
		// => i created a variable to avoid double calling an expensive method
		let header_already_exist : boolean = header_exist(lines);

		//Get new header
		let new_lines :string[] = format_new_header(file, header_already_exist, lines);

		//Get the lines to copy
		let elements_to_copy:string[] = lines.slice(get_copy_starting_position(lines, header_already_exist));

		//Conditionally insert the newline at the end of file
		if (lines[lines.length - 1] != "")
			elements_to_copy.push("");

		//Adding all the test to the file
		fs.appendFileSync(file, new_lines.concat(elements_to_copy).join('\n'));
	}

	vscode.window.showInformationMessage("42 Header has been placed");
	return (true);
}

// Return the position where start to copy 
function get_copy_starting_position(lines:string[], header_already_exist:boolean) :number
{
	//Check if there's something else to write
	if (lines.length - (header_height) <= 0)
		return (header_height);

	let i: number = (header_already_exist) ? header_height : 0;

	// If there was already an empty line
	//	=> skip it because it's placed by new header
	if (lines[i] == "")
		i++;

	return (i);
}

// Check if in the file ther's already the header
function header_exist(lines: string[]): boolean
{
	if (lines.length < header_height) {
		return false;
	}

	for (let i = 0; i < header_height; i++)
	{
		//Second condition in end of line because in linux vscode all the lines end with \r
		//	and in window with \n (char that's used to split lines during file reading)
		if (!(lines[i].startsWith("/*") && 
			(lines[i].endsWith("*/") || lines[i].endsWith("*/\r"))))
		{
			return false;
		}
	}

	return true;
}

// Lines is used to get creation datetime in case of header already exists
//	=> it prevent the need of reading file another time just to get the date
function format_new_header(file_path: string, header_already_exist:boolean, lines:string[]): string[]
{
	let correct_creation_datetime : string;

	// Extract file info
	let info = fs.statSync(file_path);

	// +1 for the empty row after the header
	let header: string[] = new Array<string>(header_height + 1);

	// If header already exist
	//	=> get cretion date time form it
	if (header_already_exist)
	{
		console.log(header_already_exist);
		// 14 & 33 are respectively start and end of datetime
		correct_creation_datetime = lines[7].slice(14, 33);
	}
	else
		correct_creation_datetime = utils.get_correct_date_format(info.mtime);

	console.log(correct_creation_datetime);

	// Removing all lines
	fs.writeFileSync(file_path, '');

	// Variable reused to calculate padding of ' ' to write
	let padding = 0;

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
	header[8] = `/*   Updated: ${utils.get_correct_date_format(info.mtime)} by ${utils.getConfigValue("42Buddy.Username")}`;
	padding = header_length - header[8].length - "###   ########.fr       */".length - 1;
	header[8] += ' '.repeat(padding) + "###   ########.fr       */";

	header[9] = "/*                                                                            */";
	header[10] = "/* ************************************************************************** */";

	// empty row after the header
	header[11] = "";

	return (header)
}