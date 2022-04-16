import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { LoginScreen } from "../../../components/auth/LoginScreen";
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
 
configure({ adapter: new Adapter() });
 
const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};
 
let store = mockStore(initState);
 
const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);
 
describe("Tests on LoginScreen", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });
 
  test("should show correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});