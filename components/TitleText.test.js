import React from "react";
import renderer from "react-test-renderer";

import { TitleText } from "./TitleText";

describe("<TitleText />", () => {
  it("renders correctly", () => {
    const testRenderer = renderer
      .create(<TitleText>Fantastic title text</TitleText>)
      .toJSON();
    expect(testRenderer).toMatchSnapshot();
  });
});
