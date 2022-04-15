// Components
import JournalEntry from "./journalEntry";

// Redux
import { useSelector } from "react-redux";

const JournalEntries = () => {
  const { notes } = useSelector((state) => state.notes);

  return (
    <>
      {notes?.map((note) => (
        <JournalEntry key={note.id} {...note} />
      ))}
    </>
  );
};

export default JournalEntries;
