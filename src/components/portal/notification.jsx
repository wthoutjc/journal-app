import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

// Icons
import * as AiIcons from "react-icons/ai";

// Redux
import { useSelector } from "react-redux";

const $portalDOM = document.getElementById("portal");

const Notification = () => {
  const { error, tittle, message } = useSelector((state) => state.ui);
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (message) {
      setRender(true);
    }
  }, [message]);

  return ReactDOM.createPortal(
    <>
      {render && (
        <div
          className={
            error
              ? "notification__container notification_error"
              : "notification__container notification_success"
          }
        >
          <div className="notification__header">
            <h4>{tittle}</h4>
            <button onClick={() => setRender(false)}>
              <AiIcons.AiOutlineClose />
            </button>
          </div>
          <div className="notification__body">
            <p>{message}</p>
          </div>
        </div>
      )}
    </>,
    $portalDOM
  );
};

export default Notification;
