"activationEvents": ["*"],
	It active the extension as soon as vscode starts up, it's needed to rendere whitespaces and so forth



It contains the "main" pages in "activitybar" (left-side bar)
"viewsContainers": {
		"activitybar": [
			{
			"id": "42Buddy",
			"title": "42Buddy",
			"icon": "Imgs/robot-dog.png"
			}
		]
		},

		It says what the "viewsContainers" contain, in this case, the viewContainer "42Buddy" contains just a view
		"views": {
		"42Buddy": [
			{
				"id": "42Buddy",
				"name": "42Buddy",
				"icon": "Imgs/robot-dog.png"
			}
		]
	},