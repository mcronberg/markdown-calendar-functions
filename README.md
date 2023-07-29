# Markdown Calendar Functions

**Markdown Calendar Functions** is a VS Code extension that allows you to insert dates and calendars in different formats in markdown files. 

## Features

- Insert the current date/time at the cursor position in a markdown file.
- Insert a specific date at the cursor position in a markdown file.
- Reformat an existing date at the cursor position in a markdown file.

You can configure your preferred date formats and locale in the settings.

## Installation

1. Open **Visual Studio Code**
2. Press `Ctrl+P` to open the Quick Open dialog
3. Type `ext install markdown-calendar-functions` to find the extension
4. Click the `Install` button, then the `Enable` button

## Usage

Once installed, you can use the following commands by pressing `F1` and typing the command name:

- **Calendar: Insert current date/time**: Inserts the current date/time at the cursor position in the markdown file, formatted according to your chosen or entered format.

- **Calendar: Insert date**: Prompts you to enter a number (which could be positive, negative, or zero) and then inserts a date at the cursor position that is the entered number of days from the current date, formatted according to your chosen or entered format.

- **Calendar: Reformat date**: Reads the date at the cursor position in the markdown file, prompts you to choose or enter a format, and then replaces the date with its reformatted version.

## Settings

You can specify your preferred date formats and locale in the settings:

```json
"markdown-calendar-functions.dateFormats": {
    "type": "array",
    "default": [
        "YYYY-MM-DD",
        "MM-DD-YYYY",
        "DD-MM-YYYY",
        "MMMM Do YYYY",
        "dddd, MMMM Do YYYY"
    ],
    "description": "Date formats to use when inserting dates."
},
"markdown-calendar-functions.locale": {
    "type": "string",
    "default": "en",
    "description": "Locale to use when formatting dates."
}
```

The `dateFormats` setting expects an array of strings, where each string is a date format. The `locale` setting expects a string that represents the locale to use when formatting dates. The default is `"en"` for English.

Here are the 10 most commonly used locales:

- English (`"en"`)
- Spanish (`"es"`)
- French (`"fr"`)
- German (`"de"`)
- Italian (`"it"`)
- Dutch (`"nl"`)
- Russian (`"ru"`)
- Japanese (`"ja"`)
- Chinese (`"zh-cn"`)
- Portuguese (`"pt"`)

For more information on date formats, see the [Moment.js display documentation](https://momentjs.com/docs/#/displaying/).

## Credits

This project was developed with the help of the following resources:

- [Moment.js](https://momentjs.com/): A powerful library for parsing, validating, manipulating, and displaying dates and times in JavaScript.
- [ChatGPT](https://www.openai.com/chatgpt/): An advanced language model developed by OpenAI, which assisted in generating the code and providing guidance during the development process.
- [Visual Studio Code](https://code.visualstudio.com/): A highly customizable and versatile text editor with integrated development environment features that was used for creating and testing this extension.


## License

MIT

