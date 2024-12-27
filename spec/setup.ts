import "@testing-library/jest-dom";
import { configure } from "@testing-library/react";

configure({ testIdAttribute: "data-testid" });

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
