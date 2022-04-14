import { useRef, useState, useEffect } from "react";

// Icons
import * as CgIcons from "react-icons/cg";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";

// Components
import JournalEntries from "../journal/journalEntries";
import { useDispatch } from "react-redux";

//Actions
import { startLogout } from "../../actions/auth";

const Sidebar = () => {
  const dispatch = useDispatch();

  const sidebar = useRef();
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    expanded
      ? sidebar.current.setAttribute("class", "sidebar__main expand-effect")
      : expanded === false &&
        sidebar.current.setAttribute("class", "sidebar__main compress-effect");
  }, [expanded]);

  useEffect(() => {
    if (expanded) {
      const effectSidebar = sidebar.current;
      const handleCompressSideBar = () => {
        setExpanded(false);
      };

      effectSidebar.addEventListener("mouseleave", handleCompressSideBar);

      return () => {
        effectSidebar.removeEventListener("mouseleave", handleCompressSideBar);
      };
    }
  }, [expanded]);

  const handleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div ref={sidebar} className="sidebar__main">
      <div
        className={
          expanded ? "sidebar__hamburger" : "sidebar__hamburger active"
        }
      >
        {expanded && (
          <button>
            <RiIcons.RiSettings2Fill />
          </button>
        )}
        <button
          className={
            expanded ? "sidebar__nav-menu active" : "sidebar__nav-menu"
          }
          onClick={handleSidebar}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="sidebar__container">
        {expanded ? (
          <div className="sidebar__expanded">
            <div className="sidebar__expanded-header">
              <h4>Juan</h4>
              <button onClick={handleLogout}>
                Log Out
                <CgIcons.CgLogOut />
              </button>
            </div>
            <div className="sidebar__expanded-body">
              <div className="sidebar__expanded-icon">
                <a href="a">
                  <BiIcons.BiCalendar />
                  <p>New entry</p>
                </a>
              </div>
              <span>Recent journals</span>
              <div className="sidebar_expanded-journals">
                <JournalEntries />
              </div>
            </div>
            <div className="sidebar__expanded-footer"></div>
          </div>
        ) : (
          <div className="sidebar__compress">
            <div className="sidebar__compress-header">
              <a href="a">
                <BiIcons.BiCalendar />
              </a>
            </div>
            <div className="sidebar__compress-body"></div>
            <div className="sidebar__compress-footer"></div>
          </div>
        )}
        <div className="sidebar__responsive">
          <div className="sidebar__responsive-icon">
            <a href="a">
              <BiIcons.BiCalendar />
              <p>New entry</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
