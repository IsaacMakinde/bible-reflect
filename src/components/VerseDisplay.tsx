import React from "react";

type verseProps = {
  verse: String;
  reference: String;
  version: String;
};
const VerseDisplay: React.FC<verseProps> = ({ verse, reference, version }) => {
  return (
    <div className="flex flex-col p-12 h-48 w-10/12 self-center justify-center text-center align-middle items-center rounded-2xl border border-1 border-gray-400 bg-gray-100 text-black">
      <p className=" md:text-lg sm:text-sm">{verse}</p>
      <p>{reference}</p>
      <p>{version}</p>
    </div>
  );
};

export default VerseDisplay;
