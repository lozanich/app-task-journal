import "@testing-library/jest-dom";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import { mount } from "enzyme";
import { Sidebar } from "../../../components/journal/Sidebar";
import { Provider } from "react-redux";
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";

jest.mock("../../../actions/auth", () => {
  return { startLogout: jest.fn() };
});

jest.mock("../../../actions/notes", () => {
  return { startNewNote: jest.fn() };
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: { uid: "1", name: "Ivan" },
  ui: { loading: false, msgError: null },
  notes: {
    active: null,
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <Sidebar />
  </Provider>
);

describe("Pruebas en el componente <SideBar />", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });
  test("Debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe de llamar la accion logout", () => {
    const button = wrapper.find(".btn");
    button.prop("onClick")();
    expect(startLogout).toHaveBeenCalled();
  });

  test("debe de llamar el startNewNote", () => {
    const button = wrapper.find(".journal__new-entry");
    button.simulate("click");
    expect(startNewNote).toHaveBeenCalled();
  });
});
