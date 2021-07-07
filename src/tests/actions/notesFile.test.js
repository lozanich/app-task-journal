import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import { startUploading } from "../../actions/notes";
import { fileUpload } from "../../helpers/fileUpload";

// jest.mock("../../helpers/fileUpload", () => ({
//   fileUpload: jest.fn(() => {
//     console.log("Calling MOCK FUNCTION");
//     // return "https://hola-mundo.com/foto.jpg";
//     return Promise.resolve("https://hola-mundo.com/foto.jpg");
//   }),
// }));

jest.mock("../../helpers/fileUpload", () => {
  return {
    fileUpload: jest.fn(),
  };
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "TEST",
  },
  notes: {
    active: {
      id: "kGkzbfNycGtc7eZx3yZY",
      date: new Date().getTime(),
      title: "Hola",
      body: "Mundo",
    },
  },
};

let store = mockStore(initState);

global.scrollTo = jest.fn();

describe("Pruebas en la subida del archivo", () => {
  beforeEach(() => {
    store = mockStore(initState);
    fileUpload.mockClear();
  });
  test("startUploading debe de actualizar el url de la notes", async () => {
    // console.log('update URLLL===>>>>')
    const file = new File([], "foto.jpg");
    await fileUpload.mockImplementation(()=> Promise.resolve("http://hola-mundo.com/foto.jpg"))

    await store.dispatch(startUploading(file));

    const actions = store.getActions();
    // console.log("aCTIONS===>>>", actions);
  });
});
