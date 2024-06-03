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
exports.getConfigValue = exports.get_correct_date_format = exports.get_files = void 0;
const vscode = __importStar(require("vscode"));
const fs = require('fs');
const path = require('path');
//Recursive searching of .c and .h files
function get_files(root_dir) {
    const resulting_files = [];
    const readen_files = fs.readdirSync(root_dir);
    for (const file of readen_files) {
        const filePath = path.join(root_dir, file);
        //Is a synchronous function call to retrieve the statistics of a file or directory specified by filePath
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            // If the file is a directory, recursively call search_files
            const nestedFiles = get_files(filePath);
            //The spread operator (...) is used to "spread" each element of the nestedFiles array into the resulting_files array individually.
            resulting_files.push(...nestedFiles);
        }
        else {
            // If it's a file, check its extension
            const extension = path.extname(file);
            if (extension === ".c" || extension === ".h") {
                resulting_files.push(filePath);
            }
        }
    }
    return resulting_files;
}
exports.get_files = get_files;
function get_correct_date_format(date) {
    //String.padStart() is used to ensure that each component
    //	has at least two digits, padding with a leading zero if necessary
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because it's zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}
exports.get_correct_date_format = get_correct_date_format;
// Function to retrieve a configuration value
function getConfigValue(key) {
    return vscode.workspace.getConfiguration().get(key);
}
exports.getConfigValue = getConfigValue;
//# sourceMappingURL=utils.js.map