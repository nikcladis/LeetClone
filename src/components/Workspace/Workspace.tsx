import React from "react";
import Split from "react-split";
import { Problem } from "../../utils/types/problem";
import Playground from "./Playground/Playground";
import ProblemDescription from "./ProblemDescription/ProblemDescription";

type WorkspaceProps = {
  problem: Problem;
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
  return (
    <Split className="split" minSize={0}>
      <ProblemDescription problem={problem} />
      <Playground problem={problem} />
    </Split>
  );
};
export default Workspace;
