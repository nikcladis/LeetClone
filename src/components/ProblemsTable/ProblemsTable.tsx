import Link from "next/link";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import { problems } from "../../problems/problems";

type ProblemsTableProps = {};

const ProblemsTable: React.FC<ProblemsTableProps> = () => {
  return (
    <tbody>
      {problems.map((doc, index) => {
        const difficultyColor =
          doc.difficulty === "Easy"
            ? "text-dark-green-s"
            : doc.difficulty === "Medium"
            ? "text-dark-yellow"
            : "text-dark-pink";

        return (
          <tr
            key={doc.id}
            className={`${index % 2 === 1 ? "bg-dark-layer-1" : ""}`}
          >
            <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
              <BsCheckCircle fontSize={"18"} width="18" />
            </th>
            <td className="px-6 py-4">
              <Link
                href={`/problems/${doc.id}`}
                className="hover:text-blue-600 cursor-pointer"
              >
                {doc.title}
              </Link>
            </td>
            <td className={`px-6 py-4 ${difficultyColor}`}>{doc.difficulty}</td>
            <td className="px-6 py-4">{doc.category}</td>
            <td className="px-6 py-4">
              {doc.videoId ? (
                <AiFillYoutube
                  fontSize={"40"}
                  className="cursor-pointer hover:text-red-600"
                />
              ) : (
                <p className="text-gray-400">Coming soon</p>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
export default ProblemsTable;
