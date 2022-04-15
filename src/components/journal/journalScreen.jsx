// Components
import Sidebar from "../sidebar/sidebar";
import NoteScreen from "../notes/noteScreen";
import NoteForm from "../notes/noteForm";

//Icons
import * as BiIcons from "react-icons/bi";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Actions
import { startNewNote } from "../../actions/notes";

const NothingSelected = () => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(startNewNote());
  };

  return (
    <>
      <h1>Journal App</h1>
      <span>Please, select an entry or create one</span>
      <button onClick={handleAdd}>
        <BiIcons.BiAddToQueue />
        <p>Create</p>
      </button>
    </>
  );
};

const JournalScreen = () => {
  const { active } = useSelector((state) => state.notes);

  return (
    <div className="journal__main">
      <Sidebar />
      <div className="journal__container">
        <div className="journal__header">
          {active ? <NoteScreen /> : <NothingSelected />}
        </div>
        {active && (
          <div className="journal__body">
            <NoteForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalScreen;
