import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("Pruebas en el authReducer", () => {
  test("Debe de retornar logeado en la aplicacion", () => {
    const action = {
      type: types.login,
      payload: {
        uid: "usj8127",
        displayName: "Ivan Lozano",
      },
    };
    const result = authReducer({}, action);
    expect({ uid: "usj8127", name: "Ivan Lozano" }).toEqual(result);
  });

  test("No debe de estar logeado", () => {
    const action = {
      type: types.logout,
    };
    const result = authReducer({ uid: "abc", name: "Ivan" }, action);
    expect({}).toEqual(result);
  });

  test("Debe de retornar el state actual", () => {
    const action = {
      type: "",
    };
    const result = authReducer({}, action);
    expect({}).toEqual(result);
  });
});
