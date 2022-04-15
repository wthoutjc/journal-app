// Dates
import moment from "moment";

// Redux
import { useDispatch } from "react-redux";
import { activeNoteAction } from "../../actions/notes";

const JournalEntry = ({ id, date, title, body, url }) => {
  const noteDate = moment(date);
  const dispatch = useDispatch();

  const handleSelectNote = () => {
    dispatch(activeNoteAction(id, { date, title, body, url }));
  };

  return (
    <div className="journal__entry-card" onClick={handleSelectNote}>
      {url && (
        <div className="journal__card-img">
          <img src={url} alt="Journal-App" />
        </div>
      )}
      <div className="journal__card-content">
        <h5>{title}</h5>
        <p>{body}</p>
      </div>
      <div className="journal__card-date">
        <p>{noteDate.format("dddd")} </p>
        <h5>{noteDate.format("Do")}</h5>
      </div>
    </div>
  );
};

export default JournalEntry;
