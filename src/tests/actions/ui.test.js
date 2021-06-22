import {
  endLoadingAction,
  removeErrorAction,
  setErrorAction,
  startLoadingAction,
} from "../../actions/ui";
import { types } from "../../types/types";

describe("Pruebas en acciones UI", () => {
  test("todas las acciones deben de funcionar", () => {
    const actionError = setErrorAction("Errrooor!!!");
    expect(actionError).toEqual({
      type: types.uiSetError,
      payload: "Errrooor!!!",
    });

    const actionRemoveError = removeErrorAction();
    expect(actionRemoveError).toEqual({ type: types.uiRemoveError });

    const actionStartLoading = startLoadingAction();
    expect(actionStartLoading).toEqual({ type: types.uiStartLoading });

    const actionEndLoading = endLoadingAction();

    expect(actionEndLoading).toEqual({ type: types.uiEndLoading });
  });
});
