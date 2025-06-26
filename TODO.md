[X] Add support for .cpp and .hpp files

[X] Possibility to place header also just in the current file with another shortcut

[] Display newline, tab, spaces and so forth (render whitespaces)
	=> instead of creating a new properties should be better to place a reference in the future "menù" in the lower bar

[] Count line in a function

[X] Flag to active and deactive inserting header in cpp and hpp files

[x] Empty the file when it contains this:
{
	#ifndef C_HPP
	#define C_HPP

	#include "Base.hpp"

	class C : public Base
	{
	};

	#endif
}

[x] To be more efficent, check if the last change date of the file is the same as in the header, if so, don't do anithing 

[X] Add the icon of extension in the side bar, on click it open a menù that contains all avaible commands of 42Buddy, it would improve the concept of buddy

[] Be able to add more file extension where to place 42 header
	=> the best optio should be to have a list of extension with some default options
		and the capability to add a custom extension to that list

[X] Modify features and last updates in manifetst?
