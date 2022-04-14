const JournalEntry = () => {
  return (
    <div className="journal__entry-card">
      <div className="journal__card-img">
        <img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          alt=""
        />
      </div>
      <div className="journal__card-content">
        <h5>Tittle</h5>
        <p>Lorem ipsum dolor sit amet</p>
      </div>
      <div className="journal__card-date">
        <p>Monday</p>
        <h5>25</h5>
      </div>
    </div>
  );
};

export default JournalEntry;
