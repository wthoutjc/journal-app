// Routers
import AppRouters from "./routers/appRouters";

// React REDUX
import { Provider } from "react-redux";

// Store
import store from "./store/store";

// Notification
import Notification from "./components/portal/notification";

const JournalApp = () => {
  return (
    <Provider store={store}>
      <Notification />
      <AppRouters />
    </Provider>
  );
};

export default JournalApp;
