# create-react-component

Add new commands in the command line to create react components very fast and easily.

## Setup

To setup create-react-component, you need to run `npm install -g create-react-component-cli`.

This command will install the CLI globally, so that you can run it in any react project from now on.

## Usage

To create a new react component, you need to run `create-react-component add <ComponentName>`, or `crc add <ComponentName>`.
This will create a new component and its default dependencies in the default directory (src/components).

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

#### Advanced settings

You can use advanced settings for each file. For example, you can change the case type used in the file name.
To do that, you should add a comment at the beginning of the file you want to edit, like in the example:

```
/**
 * @caseType kebabCase
 */
```

In the previous example, the file will be saved in `kebabCase`. You can choose from one of the following: `kababCase`, `snakeCase`, `CamelCase`. By default, if you don't provide any value, it will be used `PascalCase`.

At this point, as your file name has been changed, you might need to change the name used in the dependencies. In order to do that, you need to edit slightly the file where you are including the dependency.
For example, if you want to include a css file in your project and you want that file to be saved with kebab case, you need to edit your file from

```
import styles from './$name.module.scss';
```

to

```
import styles from './$(name, {"caseType": "kebabCase"}).module.scss';
```

As you can see in the example about, you are passing a JSON object as second paramether of a function. In the JSON object, you provide the `caseType` to `kebabCase`.

## Contribution

Please, feel free to contribute to the project, in order to create something awesome!

Here are some things to be done:
-Convert to typescript
-Add linting
-Add tests

### Contributors

Gabriele Venturi (https://github.com/gventuri)

Gianni Valdambrini (https://github.com/gvaldambrini)

Roberto Di Lillo (https://github.com/koop4)

Valentino Gagliardi (https://github.com/valentinogagliardi/)

Giuseppe Chiarella (https://github.com/Ogek/)
