import os
import datetime

RESETCOLOR = "\u001b[0m"
GREEN = "\u001b[32m"
RED = "\u001b[31;1m"

def Search_files():
	result = []
	directory = "."
	for root, directory, files in os.walk(directory):
		for file in files:
			if (file.endswith(".c") or file.endswith(".h")):
				result.append(os.path.join(root, file))

	return (result)

def Format_time(time:datetime):

	padding_month = ""
	padding_day = ""

	padding_second = ""
	padding_minute = ""
	padding_hour = ""

	year = time.year

	month = time.month
	if (month < 10):
		padding_month = "0"

	day = time.day
	if (day < 10):
		padding_day = "0"

	hour = time.hour
	if (hour < 10):
		padding_minute = "0"

	minute = time.minute
	if (minute < 10):
		padding_minute = "0"

	second = time.second
	if (second < 10):
		padding_second = "0"

	return (f"{year}/{padding_month}{month}/{padding_day}{day} {padding_hour}{hour}:{padding_minute}{minute}:{padding_second}{second}")