import "@testing-library/jest-dom";
import { mount } from "enzyme";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { JournalEntry } from "../../../components/journal/JournalEntry";
import { setActiveNote } from "../../../actions/notes";

jest.mock("../../../actions/notes", () => {
  return { setActiveNote: jest.fn() };
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {},
  ui: { loading: false, msgError: null },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
  id: 1234,
  title: "mi entry title",
  body: "mi entry body",
  date: 0,
  url: "https://mitest.com/foto.jpg",
};

const wrapper = mount(
  <Provider store={store}>
    <JournalEntry {...note} />
  </Provider>
);

describe("Pruebas en el componente <JournalEntry />", () => {
  test("Debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe de activar la nota", () => {
    wrapper.find(".journal__entry").prop("onClick")();

    expect(setActiveNote).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      setActiveNote(note.id, { ...note })
    );
  });
});
