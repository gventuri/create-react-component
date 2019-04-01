# create-react-component

Add new command in the command line to create a react component

## Setup

To setup crete-react-component, you can run `npm install -g create-react-component-cli`.

This command will install the CLI globally, so that you can use it in any react project.

If you prefer to install only in your current project, use `npm install create-react-component-cli --save-dev` instead.

## Usage

To create a new react component, you just need to run `create-react-component <ComponentName>`.
This will create a new component in src/components (the filesystem structure follows the [redux ducks proposal](https://github.com/erikras/ducks-modular-redux)).

If you don't want to use the default folder, you can pass a custom path as a parameter (`create-react-component <ComponentName> --path=my/dir`) and it will create the element in your custom directory.

To have a look at all the functionalities of the the CLI, you can run `create-react-component --help`.

### Manage templates

You can manage the templates by adding/removing or editing the files inside the `templates` folder.
Use `$name` inside the file or inside the file name. Each `$name` will be replaced with the actual name of the component provided when you run the command.

Please, note that if you want to customize the templates, you probably don't want to install it globally. In this case, use `npm install create-react-component-cli --save-dev` to install only in your current project as a developer dependency.

## Contribution

Please, feel free to contribute to the project, in order to create something awesome!

### Contributors

Gabriele Venturi (https://github.com/gventuri)

Gianni Valdanbrini (https://github.com/gvaldambrini)
