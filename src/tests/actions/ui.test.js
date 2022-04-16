import { setNotificationAction, loadingAction } from "../../actions/ui";
import types from "../../types/types";

describe("Pruebas en actions/ui.js", () => {
  test("Todas las acciones sincronas deben de funcionar", () => {
    const notificationData = {
      error: false,
      title: "Success",
      message: "Action done successfully",
    };
    const render = true;

    const notification = setNotificationAction(notificationData);
    const loading = loadingAction(render);

    expect(notification).toEqual({
      type: types.uiNotification,
      payload: {
        error: false,
        title: "Success",
        message: "Action done successfully",
      },
    });

    expect(loading).toEqual({
      type: types.uiLoading,
      payload: {
        loading: true,
      },
    });
  });
});
