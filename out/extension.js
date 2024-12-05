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
exports.activate = void 0;
const vscode = __importStar(require("vscode"));
//const utils = require('./utils')
//Musn't specify extension like this ('./header_placer.ts')
const commands = require('./commands');
function activate(context) {
    let place_header_in_all_files = vscode.commands.registerCommand('42buddy.place_header_in_all_files', () => {
        vscode.window.showInformationMessage(`all`);
        commands.place_header_in_all_files();
    });
    context.subscriptions.push(place_header_in_all_files);
    let place_header = vscode.commands.registerCommand('42buddy.place_header', () => {
        vscode.window.showInformationMessage(`singler`);
        commands.place_header_in_single_file();
    });
    context.subscriptions.push(place_header);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map