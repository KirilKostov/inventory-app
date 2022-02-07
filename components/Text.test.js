import React from "react";
import renderer from "react-test-renderer";

import { Text } from "./Text";

describe("<Text />", () => {
  it("renders correctly", () => {
    const testRenderer = renderer
      .create(<Text>Simple body text</Text>)
      .toJSON();
    expect(testRenderer).toMatchSnapshot();
  });
});
