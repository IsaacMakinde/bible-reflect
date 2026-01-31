import { useState } from "react";
import VerseDisplay from "../components/VerseDisplay";
import ReflectionForm from "../components/ReflectionForm";
import { useEffect } from "react";
import ReflectionService from "../services/ReflectionService";
import MessageBoard from "../components/MessageBoard";
import { useAuth } from "../context/AuthContext";
import DailyStatistics from "../components/DailyStatistics";
import { Reflection, NewReflection } from "../types/reflection";
import React from "react";

// Todo  add post context
const Home = () => {
  const [VOD, setVOD] = useState("");
  const [reference, setReference] = useState("");
  const [version, setVersion] = useState("");
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [allReflections, setAllReflections] = useState<Reflection[]>([]);
  const { currentUser, loading } = useAuth();

  const fetchReflection = async () => {
    try {
      const data = await ReflectionService.getReflections();
      setReflections(data);
      setAllReflections(data); // backup copy for reset

      console.log(" fetch update made", data);
    } catch (err: any) {
      throw Error(`Failed to get reflection: ${err.message}`);
    }
  };

  const filterEmotion = async (emotion: String) => {
    const copy = allReflections.filter(
      (reflection) =>
        reflection.tone.toLocaleLowerCase() == emotion.toLocaleLowerCase()
    );
    setReflections(copy);
  };

  const deleteReflection = async (id: number) => {
    if (!currentUser) {
      return;
    }
    try {
      const token = await currentUser.getIdToken();
      const response = await ReflectionService.deleteReflection(id, token);
      console.log(response);
      await fetchReflection();
    } catch (err) {
      console.log(err);
    }
  };

  const addReflection = async (
    content: string,
    tone: string,
    word_count: number
  ) => {
    if (!currentUser) {
      return;
    }
    console.log("addReflection was hit", content, tone, word_count, reference);

    const newReflection: NewReflection = {
      content: content,
      tone: tone,
      word_count: word_count,
      reference_verse: reference,
    };

    console.log(newReflection);

    try {
      const token = await currentUser.getIdToken();
      const response = await ReflectionService.createReflection(
        newReflection,
        token
      );
      console.log(response, " from add");
      await fetchReflection();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    
    const fetchVerse = async () => {
      const verseOfDay = await ReflectionService.getVerseOfTheDay();
      setVOD(verseOfDay.verse.details.text);
      setReference(verseOfDay.verse.details.reference);
      setVersion(verseOfDay.verse.details.version);
    };
    console.log("✅ Home mounted");
    fetchVerse();
    fetchReflection();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white max-w-full gap-4 py-4">
      <div className=" bg-black  flex  justify-center items-center text-white h-12 w-3/4 just rounded-2xl">
        Let's be those who reflect{" "}
      </div>
      {loading ? (
        <div> Processing...</div>
      ) : (
        <div className="flex flex-col w-full justify-center align-center text-center gap-20 mt-4">
          <VerseDisplay
            verse={VOD}
            reference={reference}
            version={version}
          ></VerseDisplay>
          <div className="h-full flex flex-col justify-between items-center w-10/12 mx-auto gap-20 text-black">
            <ReflectionForm addReflection={addReflection} />

            <>
              <div className="flex flex-col bg-white w-full border border-gray-300 p-4 h-auto rounded-3xl shadow-md gap-4">
                {reflections.map((reflection) => (
                  <MessageBoard
                    key={reflection.id}
                    reflect={reflection}
                    deleteFunc={deleteReflection}
                  />
                ))}
              </div>

              <DailyStatistics
                reflections={allReflections}
                onSliceClick={filterEmotion}
              />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
