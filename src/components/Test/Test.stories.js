import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Test from "./Test";

storiesOf("Test", module).add("default", () => <Test />);
