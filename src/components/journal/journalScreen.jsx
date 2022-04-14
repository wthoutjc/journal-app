import { useState } from "react";

// Components
import Sidebar from "../sidebar/sidebar";
import NoteScreen from "../notes/noteScreen";
import NoteForm from "../notes/noteForm";

//Icons
import * as BiIcons from "react-icons/bi";

const NothingSelected = () => {
  return (
    <>
      <h1>Journal App</h1>
      <span>Please, select an entry or create one</span>
      <button>
        <BiIcons.BiAddToQueue />
        <p>Create</p>
      </button>
    </>
  );
};

const JournalScreen = () => {
  const [temporal, setTemporal] = useState(false);
  return (
    <div className="journal__main">
      <Sidebar />
      <div className="journal__container">
        <button onClick={() => setTemporal(!temporal)}>x</button>
        <div className="journal__header">
          {temporal ? <NoteScreen /> : <NothingSelected />}
        </div>
        {temporal && (
          <div className="journal__body">
            <NoteForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalScreen;
