import * as fs from 'fs';
import * as path from 'path';

const	placer = require('./placeHeader');
const	utils = require('./utils');

// Check if in the file ther's already the header
export function	headerExist_normal(lines: string[]): boolean
{
	if (lines.length < placer.header_height) {
		return false;
	}

	for (let i = 0; i < placer.header_height; i++)
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
export function	formatNewHeader_normal(file_path: string, header_already_exist:boolean, lines:string[], info: fs.Stats): string[]
{
	let	correct_creation_datetime : string;

	// +1 for the empty row after the header
	let	header: string[] = new Array<string>(placer.header_height + 1);

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
	padding = placer.header_length - header[3].length - ":+:      :+:    :+:   */".length - 1;
	header[3] += ' '.repeat(padding) + ":+:      :+:    :+:   */";

	header[4] = "/*                                                    +:+ +:+         +:+     */";

	// header[5] (Author)
	header[5] = `/*   By: ${utils.getConfigValue("42Buddy.Username")} <${utils.getConfigValue("42Buddy.Email")}>`;
	padding = placer.header_length - header[5].length - "+#+  +:+       +#+        */".length - 1;
	header[5] += ' '.repeat(padding) + "+#+  +:+       +#+        */";

	header[6] = "/*                                                +#+#+#+#+#+   +#+           */";

	// header[7] (Creation)
	header[7] = `/*   Created: ${correct_creation_datetime} by ${utils.getConfigValue("42Buddy.Username")}`;
	padding = placer.header_length - header[7].length - "#+#    #+#             */".length - 1;
	header[7] += ' '.repeat(padding) + "#+#    #+#             */";

	// header[8] (Update)
	header[8] = `/*   Updated: ${utils.getCorrectDateFormat(new Date())} by ${utils.getConfigValue("42Buddy.Username")}`;
	padding = placer.header_length - header[8].length - "###   ########.fr       */".length - 1;
	header[8] += ' '.repeat(padding) + "###   ########.fr       */";

	header[9] = "/*                                                                            */";
	header[10] = "/* ************************************************************************** */";

	// empty row after the header
	header[11] = "";

	return (header)
}