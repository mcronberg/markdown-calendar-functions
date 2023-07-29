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

- **Calendar: Insert current date/time**
- **Calendar: Insert date**
- **Calendar: Reformat date**

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

For more information on date formats, see the [Moment.js display documentation](https://momentjs.com/docs/#/displaying/).

## License

MIT

