const DEFAULT_PATH = require("./config").DEFAULT_PATH;

const HELP_MSG = `
NAME
    create-react-component-cli — react cli to create templated component

DESCRIPTION
    Create-react-component-cli allows to create react component easilt providing an interface
    implement your own template.

SYNOPSIS
    create-react-component <command> [name] [options]

AVAILABLE COMMAND:
    init    initialize the cli
    config  change the default settings of the cli. you need to initialize the cli before
    add     creates a new component using the provided name. default path: '${DEFAULT_PATH}'

OPTIONS
    -path   override default path.

COPYRIGHT
    create-react-component-cli is available under the MIT license.
    create-react-component-cli also includes external libraries that are available under MIT license.

SEE ALSO
    GitHub repository & Issue Tracker: https://github.com/gventuri/create-react-component
    Npmjs: https://www.npmjs.com/package/create-react-component-cli
    Website:
    Documentation:

AUTHORS
    Gabriele Venturi (https://github.com/gventuri)

CONTRIBUTORS
    Gianni Valdambrini (https://github.com/gvaldambrini)
    Roberto Di Lillo (https://github.com/koop4)
    Valentino Gagliardi (https://github.com/valentinogagliardi/)
`;
const WRONG_PATH_MSG = `The path provided is wrong`;
const PROJ_INIT = `The project has been initialized`;
const ALREADY_INIT = `The project has already been initialized`;

module.exports = { HELP_MSG, WRONG_PATH_MSG, PROJ_INIT, ALREADY_INIT };
