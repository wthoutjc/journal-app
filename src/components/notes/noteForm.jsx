// Icons
import * as BsIcons from "react-icons/bs";

const NoteForm = () => {
  return (
    <div className="note__form">
      <form action="">
        <div className="note__input-data">
          <div className="note__icon">
            <BsIcons.BsJournalBookmarkFill />
          </div>
          <input type="text" placeholder="Tittle" autoComplete="off" />
        </div>
        <textarea name="" placeholder="Type something"></textarea>
        <div className="notes__image-container">
          <img
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
            alt=""
          />
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
