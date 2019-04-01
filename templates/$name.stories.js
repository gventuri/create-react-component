import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import $name from "./$name";

storiesOf("$name", module).add("default", () => <$name />);
