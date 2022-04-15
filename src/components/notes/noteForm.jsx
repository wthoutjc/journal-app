import { useEffect, useRef } from "react";
// Icons
import * as BsIcons from "react-icons/bs";

// Hooks
import useForm from "../../hooks/useForm";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { activeNoteAction } from "../../actions/notes";

const NoteForm = () => {
  const { active } = useSelector((state) => state.notes);

  const dispatch = useDispatch();

  const [values, handleInputChange, reset] = useForm(active);

  const { title, body, url } = active;

  const activeId = useRef(active.id);

  useEffect(() => {
    if (active.id !== activeId.current) {
      reset(active);
      activeId.current = active.id;
    }
  }, [active, reset]);

  useEffect(() => {
    dispatch(activeNoteAction(values.id, { ...values }));
  }, [values, dispatch]);

  return (
    <div className="note__form">
      <div className="note__container">
        <div className="note__input-data">
          <div className="note__icon">
            <BsIcons.BsJournalBookmarkFill />
          </div>
          <input
            type="text"
            placeholder="Title"
            autoComplete="off"
            name="title"
            onChange={handleInputChange}
            value={title || ""}
          />
        </div>
        <textarea
          placeholder="Type something"
          name="body"
          onChange={handleInputChange}
          value={body || ""}
        ></textarea>
        {url && (
          <div className="notes__image-container">
            <img src={url} alt="Journal-App" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteForm;
