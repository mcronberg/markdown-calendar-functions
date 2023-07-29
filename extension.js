const vscode = require("vscode");
const moment = require("moment");

function insertDate(context, days) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage("editor does not exist!");
        return;
    }

    // Get the current settings
    const config = vscode.workspace.getConfiguration(
        "markdown-calendar-functions"
    );
    let dateFormats = config.get("dateFormats");
    let locale = config.get("locale");

    // Set the locale in moment
    moment.locale(locale);

    // Add an extra option to the formats list
    dateFormats.push("Enter a new format...");

    // Get the currently selected text
    const selectedText = editor.document.getText(editor.selection);
    let date;
    // If the selected text can be parsed as a date, use it. Otherwise, use the current date.
    if (moment(selectedText, dateFormats, true).isValid()) {
        date = moment(selectedText, dateFormats);
    } else {
        date = moment().add(days, "days");
    }

    // Show a quick pick with the current date format settings as options
    vscode.window
        .showQuickPick(dateFormats, { placeHolder: "Select a date format" })
        .then((selectedFormat) => {
            if (selectedFormat) {
                // If the user selected the extra option, show an input box
                if (selectedFormat === "Enter a new format...") {
                    vscode.window
                        .showInputBox({ prompt: "Enter a new date format" })
                        .then((inputFormat) => {
                            if (inputFormat) {
                                const formattedDate = date.format(inputFormat);

                                editor.edit((editBuilder) => {
                                    editBuilder.replace(
                                        editor.selection,
                                        formattedDate
                                    );
                                });
                            }
                        });
                } else {
                    const formattedDate = date.format(selectedFormat);

                    editor.edit((editBuilder) => {
                        editBuilder.replace(editor.selection, formattedDate);
                    });
                }
            }
        });
}

function activate(context) {
    let disposableCurrentDate = vscode.commands.registerCommand(
        "markdown-calendar-functions.insertCurrentDate",
        function () {
            insertDate(context, 0);
        }
    );

    let disposableDate = vscode.commands.registerCommand(
        "markdown-calendar-functions.insertDate",
        function () {
            vscode.window
                .showInputBox({
                    prompt: "Enter the number of days from today (can be negative)",
                })
                .then((days) => {
                    if (days !== undefined && days !== null) {
                        insertDate(context, Number(days));
                    }
                });
        }
    );

    let disposableReformatDate = vscode.commands.registerCommand(
        "markdown-calendar-functions.reformatDate",
        function () {
            insertDate(context, 0);
        }
    );

    let disposableInsertUpcomingWeek = vscode.commands.registerCommand(
        "markdown-calendar-functions.insertUpcomingWeek",
        function () {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage("editor does not exist!");
                return;
            }

            // Get the current settings
            const config = vscode.workspace.getConfiguration(
                "markdown-calendar-functions"
            );
            let dateFormats = config.get("dateFormats");
            let locale = config.get("locale");
            let firstDayOfWeek = config.get("firstDayOfWeek");

            // Set the locale in moment
            moment.locale(locale);

            // Change the first day of the week
            moment.updateLocale(locale, { week: { dow: firstDayOfWeek } });

            // Add an extra option to the formats list
            dateFormats.push("Enter a new format...");

            // Show a quick pick with the current date format settings as options
            vscode.window
                .showQuickPick(dateFormats, {
                    placeHolder: "Select a date format",
                })
                .then((selectedFormat) => {
                    if (selectedFormat) {
                        // Ask the user for a date prefix
                        vscode.window
                            .showInputBox({
                                prompt: "Enter a prefix for the date (optional)",
                            })
                            .then((prefix) => {
                                // If the user selected the extra option, show an input box
                                if (
                                    selectedFormat === "Enter a new format..."
                                ) {
                                    vscode.window
                                        .showInputBox({
                                            prompt: "Enter a new date format",
                                        })
                                        .then((inputFormat) => {
                                            if (inputFormat) {
                                                insertUpcomingWeek(
                                                    editor,
                                                    inputFormat,
                                                    firstDayOfWeek,
                                                    prefix
                                                );
                                            }
                                        });
                                } else {
                                    insertUpcomingWeek(
                                        editor,
                                        selectedFormat,
                                        firstDayOfWeek,
                                        prefix
                                    );
                                }
                            });
                    }
                });
        }
    );

    context.subscriptions.push(
        disposableCurrentDate,
        disposableDate,
        disposableReformatDate,
        disposableInsertUpcomingWeek
    );
}

function insertUpcomingWeek(editor, format, firstDayOfWeek, prefix) {
    console.log(format + " " + firstDayOfWeek);

    // Find the next first day of the week
    let nextFirstDay = moment();

    // Keep adding days until we reach the desired first day of the week
    while (nextFirstDay.day() !== firstDayOfWeek) {
        nextFirstDay = nextFirstDay.clone().add(1, "days");
    }

    let dates = "";
    for (let i = 0; i < 7; i++) {
        let date = nextFirstDay.clone().add(i, "days").format(format);
        dates += `${prefix} ${date}\n\n`;
    }

    editor.edit((editBuilder) => {
        editBuilder.insert(editor.selection.start, dates);
    });
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
