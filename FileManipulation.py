import os
import Utils
import datetime

header_heigth = 11
header_length = 81

def Header_exist(lines):
	i = 0

	#Check if enough lines have been read
	if not lines or len(lines) < header_heigth:
		return (False)

	#Check first line
	if (not lines[i] == "/* ************************************************************************** */\n"):
		return (False)

	i += 1

	#-1 to don't consider last row
	while i < 11 - 1:
		if not (lines[i].startswith("/*   ") and lines[i].endswith("   */\n")):
			return (False)
		i += 1

	#Check last line
	if not lines[i] == "/* ************************************************************************** */":
		if not lines[i] == "/* ************************************************************************** */\n":
			return (False)

	return (True)

#Generate new header, input file is already open in write mode
def Generate_new_header(file_path, intra_username):
	
	#Only way i found to initialize an array of dinamyc size
	header = [""] * (header_heigth)

	padding = 0 #Used to calculate space of padding to insert
	i = 0
	
	creation_time = Utils.Format_time(datetime.datetime.fromtimestamp(os.path.getctime(file_path)))

	#Not using file info cause the last update it that one is going on now
	last_update_time = Utils.Format_time(datetime.datetime.now())

	file_name = os.path.basename(file_path)

	header[0] = "/* ************************************************************************** */\n"
	header[1] = "/*                                                                            */\n"
	header[2] = "/*                                                        :::      ::::::::   */\n"
	
	#region header[3] (file name)

	#Start of line + file name
	header[3] = f"/*   {file_name}"
	
	#Padding: total length - length of already placed chars - end line chars
	padding = header_length - len(header[3]) - len(":+:      :+:    :+:   */")
	while(i < padding - 1): #-1 BOH
		header[3] += ' '
		i += 1

	#End of line
	header[3] += ":+:      :+:    :+:   */\n"

	#endregion

	i = 0

	header[4] = "/*                                                    +:+ +:+         +:+     */\n"

	#region header[5] (Autor)

	#Start of line + Username + mail
	header[5] = f"/*   By: {intra_username} <{intra_username}@student.42.fr>"

	#Padding: total length - length of already placed chars - end line chars
	padding = header_length - len(header[5]) - len("+#+  +:+       +#+        */")
	while (i < padding - 1): #-1 BOH
		header[5] += ' '
		i += 1

	#End of line
	header[5] += "+#+  +:+       +#+        */\n"

	#endregion

	i = 0

	header[6] = "/*                                                +#+#+#+#+#+   +#+           */\n"

	#region header[7] (Creation time)

	#Start of line + creation time
	header[7] = f"/*   Created: {creation_time} by {intra_username}"

	#Padding: total length - length of already placed chars - end line chars
	padding = header_length - len(header[7]) - len("#+#    #+#             */")
	while(i < padding - 1): #-1 BOH
		header[7] += ' '
		i += 1

	#End of line
	header[7] += "#+#    #+#             */\n"

	#endregion

	i = 0

	#region header[8] (Last update time)

	#Start of line + last update time
	header[8] = f"/*   Updated: {last_update_time} by {intra_username}"

	#Padding: total length - length of already placed chars - end line chars
	padding = header_length - len(header[8]) - len("###   ########.fr       */")
	while (i < padding - 1): #-1 BOH
		header[8] += ' '
		i += 1

	#End of line
	header[8] += "###   ########.fr       */\n"

	#endregion

	header[9] = "/*                                                                            */\n"

	header[10] = "/* ************************************************************************** */\n"

	return (header)

#Deleting and rewriting all line except header
def Update_header(file_path, intra_username):

	file = open(file_path)
	lines = file.readlines()
	i = 0

	#If ther's already the header
	#	start copying line from line n. 11 (end of header)
	if (Header_exist(lines)):
		i = header_heigth

	file.close()#close that one used for reading
	file = open (file_path, 'w')#empty file and prepare it for writing


	new_header = Generate_new_header(file_path, intra_username)
	file.writelines(new_header)
	
	#If ther're some lines apart from header
	#And there isn't an empty line after the header
	#	=> add it
	#TO DO: i could make a loop to delete all empty line after the header
	#	but it would affect the code because it would modify
	#	lines of the file outside the context of the header
	if (len(lines) - header_heigth > 0 and lines[i] != "\n"):
		file.write("\n")

	file.writelines(lines[i:])

	file.close()
