import React from "react";

type verseProps = {
  verse: String;
  reference: String;
  version: String;
};
const VerseDisplay: React.FC<verseProps> = ({ verse, reference, version }) => {
  return (
    <div
      className="flex flex-col w-10/12 mx-auto bg-red-100 shadow-sm 
            border border-gray-300 rounded-3xl shadow-md p-6 items-center gap-2"
    >
      <p className="text-xl font-semibold">{verse}</p>
      <p className="text-sm text-gray-700">{reference}</p>
      <p className="text-xs text-gray-500">{version}</p>
    </div>
  );
};

export default VerseDisplay;
