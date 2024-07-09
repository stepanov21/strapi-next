import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { EditJob } from "@/components/custom/EditJob";
import { JobTable } from "@/components/custom/JobTable";

test("Dashboard", () => {
  render(<EditJob />);
});

test("Dashboard", () => {
  render(<JobTable jobItems={[]}/>);
});
