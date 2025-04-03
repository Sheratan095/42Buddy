[X] Add support for .cpp and .hpp files

[X] Possibility to place header also just in the current file with another shortcut

[] Display newline, tab, spaces and so forth

[] Count line in a function

[] Flag to active and deactive inserting header in cpp and hpp files

[] Empty the file when it contains this:
{
	#ifndef C_HPP
	#define C_HPP

	#include "Base.hpp"

	class C : public Base
	{
	};

	#endif
}