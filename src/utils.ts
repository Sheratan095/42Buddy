const fs = require('fs');
const path = require('path');

//Recursive searching of .c and .h files
export function get_files(root_dir: string): string[]
{
	const resulting_files: string[] = [];
	const readen_files = fs.readdirSync(root_dir);

	for (const file of readen_files)
	{
		const filePath = path.join(root_dir, file);

		//Is a synchronous function call to retrieve the statistics of a file or directory specified by filePath
		const stats = fs.statSync(filePath);

		if (stats.isDirectory())
		{
			// If the file is a directory, recursively call search_files
			const nestedFiles = get_files(filePath);

			//The spread operator (...) is used to "spread" each element of the nestedFiles array into the resulting_files array individually.
			resulting_files.push(...nestedFiles);
		}
		else
		{
			// If it's a file, check its extension
			const extension = path.extname(file);
			if (extension === ".c" || extension === ".h") {
				resulting_files.push(filePath);
			}
		}
	}

	return resulting_files;
}

export function get_correct_date_format(date: Date):string
{
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