"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeHeader = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const utils = require('./utils');
const header_height = 11;
const header_length = 81;
function placeHeader(file) {
    // Get all lines
    let lines = fs.readFileSync(file, 'utf-8').split(/\r?\n/);
    // Establish if header already exists
    // headerExist() is required in two methods
    // => i created a variable to avoid double calling an expensive method
    let header_already_exist = headerExist(lines);
    // Get new header
    let new_lines = formatNewHeader(file, header_already_exist, lines);
    // Get the lines to copy
    let elements_to_copy = lines.slice(getCopyStartingPosition(lines, header_already_exist));
    // Conditionally insert the newline at the end of file
    if (lines[lines.length - 1] != "")
        elements_to_copy.push("");
    // Adding all the test to the file
    fs.appendFileSync(file, new_lines.concat(elements_to_copy).join('\n'));
    return (file);
}
exports.placeHeader = placeHeader;
// Return the position where start to copy 
function getCopyStartingPosition(lines, header_already_exist) {
    //Check if there's something else to write
    if (lines.length - (header_height) <= 0)
        return (header_height);
    let i = (header_already_exist) ? header_height : 0;
    // If there was already an empty line
    //	=> skip it because it's placed by new header
    if (lines[i] == "")
        i++;
    return (i);
}
// Check if in the file ther's already the header
function headerExist(lines) {
    if (lines.length < header_height) {
        return false;
    }
    for (let i = 0; i < header_height; i++) {
        //Second condition in end of line because in linux vscode all the lines end with \r
        //	and in window with \n (char that's used to split lines during file reading)
        if (!(lines[i].startsWith("/*") &&
            (lines[i].endsWith("*/") || lines[i].endsWith("*/\r")))) {
            return (false);
        }
    }
    return (true);
}
// Lines is used to get creation datetime in case of header already exists
//	=> it prevent the need of reading file another time just to get the date
function formatNewHeader(file_path, header_already_exist, lines) {
    let correct_creation_datetime;
    // Extract file info
    let info = fs.statSync(file_path);
    // +1 for the empty row after the header
    let header = new Array(header_height + 1);
    // If header already exist
    //	=> get cretion date time form it
    if (header_already_exist) {
        // 14 & 33 are respectively start and end of datetime
        correct_creation_datetime = lines[7].slice(14, 33);
    }
    else
        correct_creation_datetime = utils.getCorrectDateFormat(info.mtime);
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
    header[8] = `/*   Updated: ${utils.getCorrectDateFormat(info.mtime)} by ${utils.getConfigValue("42Buddy.Username")}`;
    padding = header_length - header[8].length - "###   ########.fr       */".length - 1;
    header[8] += ' '.repeat(padding) + "###   ########.fr       */";
    header[9] = "/*                                                                            */";
    header[10] = "/* ************************************************************************** */";
    // empty row after the header
    header[11] = "";
    return (header);
}
//# sourceMappingURL=placeHeader.js.map