import React from "react";
import renderer from "react-test-renderer";

import { Input } from "./Input";

describe("<Input />", () => {
  it("renders correctly", () => {
    const testRenderer = renderer.create(<Input />).toJSON();
    expect(testRenderer).toMatchSnapshot();
  });
  it("turns autoCorrect off", () => {
    const testRenderer = renderer.create(<Input autoCorrect={false} />);
    const testInstance = testRenderer.root;
    expect(testInstance.props.autoCorrect).toBe(false);
  });
  it("displays the correct placeholder", () => {
    const testRenderer = renderer.create(<Input placeholder="barcode" />);
    const testInstance = testRenderer.root;
    expect(testInstance.props.placeholder).toBe("barcode");
  });
});
