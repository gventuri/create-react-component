# create-react-component

Add new commands in the command line to create react components very fast and easily.

## Setup

To setup crete-react-component, you need to run `npm install -g create-react-component-cli`.

This command will install the CLI globally, so that you can run it in any react project from now on.

## Usage

To create a new react component, you need to run `create-react-component add <ComponentName>`, or `crc add <ComponentName>`.
This will create a new component and its default dependencies in the default directory (src/components).
Please. note that the default filesystem structure follows the [redux ducks proposal](https://github.com/erikras/ducks-modular-redux).

In case you don't want to use the default directory, you can pass a custom path as a parameter (i.e. `crc add <ComponentName> --path=my/custom/dir`) This will create the element in the provided directory.

If you want to have a look at all the functionalities of the the CLI, just run `crc help`, and all the functionalities will be explained.

### Initialize a new project

If you need a more advanced experience with the CLI, you'd probabily want to instantiate the CLI for your current project, so that you will be able to customize some more settings.
In order to do that, you need to run `crc init`. This will create a folder `.react-templates` in the path where you run the command.
During the setup, you will be asked a few questions required to create the configuration file.

You will be able to customize the file by editing it directly (`.react-templates/config.json`) or by running `crc config`.

### Manage templates

You can manage the templates by adding/removing or editing the files inside the `.react-templates` folder.
Use `$name` inside the file or inside the file name. Each `$name` will be replaced with the actual name of the component provided when you run the command.

## Contribution

Please, feel free to contribute to the project, in order to create something awesome!

### Contributors

Gabriele Venturi (https://github.com/gventuri)

Gianni Valdambrini (https://github.com/gvaldambrini)

Roberto Di Lillo (https://github.com/koop4)

Filippo Calabrese (https://github.com/filippocalabrese)
