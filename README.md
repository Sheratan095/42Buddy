<p align="center">
  <img src="./Imgs/robot-dog.png"  width="150" height="150"/>
</p>

# 42 BUDDY

A vscode extension to help all [42](https://42.fr/) students during their path in the school

Vs code marketplace link: [Sheratan.42buddy](https://marketplace.visualstudio.com/items?itemName=Sheratan.42buddy)

GitHub profile: [Sheratan095](https://github.com/Sheratan095)

42 intra profile: [Maceccar](https://profile.intra.42.fr/users/maceccar)

<br>

## Configuration

To configure the extension, access the configuration panel in the sidebar. You can set your username, email, and choose which file types should have headers automatically placed.

<br>

## Features

  * [Header placer](#header-placer)
  * [Count lines](#count-lines)

<br>





### Header placer

This feature inserts a 42 header in .c, .h, .cpp, and .hpp files.

You can chose to don't place 42 header in .cpp and .hpp files from the settings

It can be activated by:
- Buttons in sidebar menù
- ctrl + shift + h : Inserts the header only in the currently open file
- ctrl + h : Inserts the header recursively in all files within the first folder of the workspace.

**Note:** The `Updated` timestamp in the header reflects the time when the header was last placed and not when the code has been modified last time.

<br>

``` C
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   prova.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: marvin <marvin@student.42firenze.it>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/04/09 11:28:30 by marvin            #+#    #+#             */
/*   Updated: 2024/04/09 11:36:17 by marvin           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
```

<br>





### Count lines

This feature analyzes the source code to identify all function definitions and calculates the number of lines each function occupies.

``` C
void	42(void)
{

	printf("42\n");

}
――― 3 FUNCTION LINES ―――
```


If there is no line after the closing bracket, the message will be placed on the last available line.

``` C
void	42(void)
{

	printf("42\n");

}――― 3 FUNCTION LINES ―――
```

<br>

## TABLE OF CONTENT

- [42 BUDDY](#42-buddy)
  - [Configuration](#configuration)
  - [Features](#features)
    - [Header placer](#header-placer)
    - [Count lines](#count-lines)
  - [TABLE OF CONTENT](#table-of-content)
