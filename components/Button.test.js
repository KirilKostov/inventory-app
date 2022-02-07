import React from "react";
import renderer from "react-test-renderer";

import { Button } from "./Button";

describe("<Button />", () => {
  it("renders correctly", () => {
    const testRenderer = renderer.create(<Button />).toJSON();
    expect(testRenderer).toMatchSnapshot();
  });
  it("displays the correct title", () => {
    const testRenderer = renderer.create(<Button title="Test" />);
    const testInstance = testRenderer.root;
    expect(testInstance.props.title).toBe("Test");
  });
});
