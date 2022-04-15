import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

// Icons
import * as AiIcons from "react-icons/ai";

// Redux
import { useDispatch, useSelector } from "react-redux";

//Action
import { setNotificationAction } from "../../actions/ui";

const $portalDOM = document.getElementById("portal");

const Notification = () => {
  const { error, title, message } = useSelector((state) => state.ui);
  const [render, setRender] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      setRender(true);
      if (render) {
        setTimeout(() => {
          handleClose();
        }, 3000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const handleClose = () => {
    setRender(false);
    dispatch(
      setNotificationAction({
        error: false,
        title: null,
        message: null,
      })
    );
  };

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
            <h4>{title}</h4>
            <button onClick={handleClose}>
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
