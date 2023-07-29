const path = require('path');

module.exports = {
    target: 'node', // VS Code extensions run in a Node.js context
    entry: './extension.js', // The entry point (your extension's main file)
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2',
    },
    externals: {
        vscode: 'commonjs vscode', // Exclude vscode module from the bundle
    },
    resolve: {
        extensions: ['.js'],
    },
};
