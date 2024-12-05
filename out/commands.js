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
exports.place_header_in_single_file = exports.place_header_in_all_files = void 0;
const vscode = __importStar(require("vscode"));
const utils = require('./utils');
const placer = require('./place_header');
function place_header_in_all_files() {
    // Precondition, check if an workspace is open
    if (vscode.workspace.workspaceFolders == undefined)
        return (vscode.window.showInformationMessage("Open a folder to execute this command"), false);
    //Check if all configuration values are set
    if (!check_settings())
        return (false);
    // We take as an assumption that just one folder is open in the workspace
    let current_dir = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const files = utils.get_files(current_dir);
    for (let file of files)
        placer.place_header(file);
    vscode.window.showInformationMessage("42 Header has been placed");
    return (true);
}
exports.place_header_in_all_files = place_header_in_all_files;
function place_header_in_single_file() {
    if (!check_settings())
        return (false);
    vscode.window.showInformationMessage(`Current file:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`);
    // const editor = vscode.window.activeTextEditor; // Get the active editor
    // if (editor)
    // {
    // 	const filePath = editor.document.uri.fsPath; // Get the file path of the current file
    // 	vscode.window.showInformationMessage(`Current file: ${filePath}`);
    // } else
    // {
    // 	vscode.window.showInformationMessage('No file is currently open.');
    // }
    return (true);
}
exports.place_header_in_single_file = place_header_in_single_file;
//If a value isn't set
//	=> 'redirect' to the setting page
function check_settings() {
    if (utils.getConfigValue("42Buddy.Email") == "" || utils.getConfigValue("42Buddy.Username") == "") {
        // Last '.' just to avoid appearing of other things that shouldn't appear
        vscode.commands.executeCommand('workbench.action.openSettings', '42Buddy.');
        vscode.window.showErrorMessage('This settings are required, plase fill all fields');
        return (false);
    }
    return (true);
}
//# sourceMappingURL=commands.js.map