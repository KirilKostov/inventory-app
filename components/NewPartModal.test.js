import React from "react";
import renderer from "react-test-renderer";
import { NewPartModal } from "./NewPartModal";

describe("<NewPartModal />", () => {
  it("renders correctly", () => {
    const testRenderer = renderer
      .create(<NewPartModal modalVisible />)
      .toJSON();
    expect(testRenderer).toMatchSnapshot();
  });
});
