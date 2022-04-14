//Icons
import * as HiIcons from "react-icons/hi";

const NoteAppBar = () => {
  return (
    <div className="note__appbar">
      <div className="note__date">
        <span>27 de Junio de 2022</span>
      </div>
      <div className="note__options">
        <button className="note__btn-pic">
          <p>Picture</p>
          <HiIcons.HiOutlinePhotograph />
        </button>
        <button>Save</button>
      </div>
    </div>
  );
};

export default NoteAppBar;
