import "@testing-library/jest-dom";
import { mount } from "enzyme";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { NoteScreen } from "../../../components/notes/NoteScreen";
import { setActiveNote } from "../../../actions/notes";

jest.mock("../../../actions/notes", () => {
  return { setActiveNote: jest.fn() };
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: { loading: false, msgError: null },
  notes: {
    active: {
      id: 1234,
      title: "mi test title",
      body: "mi test body",
      date: 0,
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <NoteScreen />
  </Provider>
);

describe("Pryebas en el <NoteScrren />", () => {
  test("Debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe de diparar el active note", () => {
    const inputTitle = wrapper.find('input[name="title"]');
    inputTitle.simulate("change", {
      target: {
        name: "title",
        value: "Hola mi nuevo test",
      },
    });

    expect(setActiveNote).toHaveBeenCalled();
    expect(setActiveNote).toHaveBeenLastCalledWith(1234, {
      body: "mi test body",
      title: "Hola mi nuevo test",
      id: 1234,
      date: 0,
    });
  });
});
