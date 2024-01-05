import React from "react";
import Topbar from "../../components/Topbar/Topbar";
import Workspace from "../../components/Workspace/Workspace";
import { Problem } from "../../problems/problems";
import { problems } from "../../utils/problems";

type ProblemPageProps = {
  problem: Problem;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {
  console.log(problem);
  return (
    <div>
      <Topbar problemPage />
      <Workspace problem={problem} />
    </div>
  );
};
export default ProblemPage;

// fetch the local data
// SSG
// getStaticPaths => it creates the dynamic routes

export async function getStaticPaths() {
  const paths = Object.keys(problems).map((key) => ({
    params: { pid: key },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { pid: string } }) {
  const { pid } = params;
  const problem = problems[pid];

  if (!problem) {
    return {
      notFound: true,
    };
  }

  problem.handlerFunction = problem.handlerFunction.toString();

  return {
    props: {
      problem,
    },
  };
}
