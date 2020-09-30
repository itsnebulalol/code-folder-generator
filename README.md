# Code Folder Generator (JS)
An actually decent project folder generator, but it's made in Node.

## Installation
```
npm i -g
```

## Contribution
Feel free to open a pull request! I'm happy to see what you guys make!
Just please make sure it follows the [GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0-standalone.html) license.

### Add more templates
1. Make a folder in `templates` named your template name.
2. Add a `template.json` file containing:
```json
{
	"name": "Name of your template",
	"description": "What your template contains"
}
```
3. Add all of the files that will be needed in the template.
