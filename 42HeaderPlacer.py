import Utils
import FileManipulation

#f is used for string interpolation
intra_username = input(f" Enter intra unername: {Utils.GREEN}")

#Check input
if (not intra_username.isalpha()):
	print(f"{Utils.RED} INTRA USERNAME NOT VALID {Utils.RESETCOLOR}\n")
	exit(1)

files = Utils.Search_files()

for file in files:
	FileManipulation.Update_header(file, intra_username)
	print(f"{Utils.GREEN}UPDATED	[{file}]{Utils.RESETCOLOR}")