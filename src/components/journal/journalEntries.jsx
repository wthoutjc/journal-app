// Components
import JournalEntry from "./journalEntry";

const JournalEntries = () => {
  const entries = [1, 2, 3, 4, 5];

  return (
    <>
      {entries?.map((entrie) => (
        <JournalEntry key={entrie} />
      ))}
    </>
  );
};

export default JournalEntries;
