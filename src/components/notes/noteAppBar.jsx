//Icons
import * as HiIcons from "react-icons/hi";
import * as GiIcons from "react-icons/gi";
import * as RiIcons from "react-icons/ri";

// Date
import moment from "moment";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Actions
import {
  saveNoteAction,
  startUploadingAction,
  startDeletingAction,
} from "../../actions/notes";

const NoteAppBar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);

  const { date } = active;

  const noteDate = moment(date);

  const handleUpdateNote = () => {
    dispatch(saveNoteAction(active));
  };

  const handleFileChange = (e) => {
    dispatch(startUploadingAction(e.target.files[0]));
  };

  const handleDelete = () => {
    dispatch(startDeletingAction(active.id));
  };

  return (
    <div className="note__appbar">
      <div className="note__date">
        <span>{noteDate.format("dddd, MMMM Do YYYY")} </span>
      </div>
      <input
        type="file"
        id="fileSelector"
        name="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div className="note__options">
        <label htmlFor="fileSelector" className="note__btn-pic">
          <p>Picture</p>
          <HiIcons.HiOutlinePhotograph />
        </label>
        <button className="note__btn-pic" onClick={handleUpdateNote}>
          <p>Save</p>
          <GiIcons.GiSave />
        </button>
        <button className="note__btn-pic" onClick={handleDelete}>
          <p>Delete</p>
          <RiIcons.RiDeleteBin5Line />
        </button>
      </div>
    </div>
  );
};

export default NoteAppBar;
