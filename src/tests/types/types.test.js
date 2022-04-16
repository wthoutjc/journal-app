import types from "../../types/types"

describe("Pruebas con types", () => {
  test("Debe tener los tipos adecuados", () => {
    expect(types).toEqual({
      login: "[Auth] Login",
      logout: "[Auth] Logout",

      /*UI*/
      uiNotification: "[UI] Notification",
      uiLoading: "[UI] Loading",

      /*notes */
      notesAdd: "[Notes] Add note",
      notesActive: "[Notes] Set active note",
      notesLoad: "[Notes] Load notes",
      notesUpdate: "[Notes] Update note",
      notesFileUrl: "[Notes] Update image url",
      notesDelete: "[Notes] Delete note",
      notesLogout: "[Notes] Logout cleaning",
    });
  });
});
