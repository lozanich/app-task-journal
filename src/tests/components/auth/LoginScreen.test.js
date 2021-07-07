import React from "react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { Provider } from "react-redux";
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth'

jest.mock("../../../actions/auth", () => {
  return {startGoogleLogin: jest.fn(), startLoginEmailPassword: jest.fn()}
})

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: { loading: false, msgError: null },
};

let store = mockStore(initState);
store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);

describe("Pruebas en el componente Login Screen", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks()
  });

  test("Debe de hacer match con el snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Debe de disparar la accion de startGoogleLogin', () => {
    wrapper.find('.google-btn').prop('onClick')()
    expect(startGoogleLogin).toHaveBeenCalled()
  })

  test('Debe de disparar el startLoginEmailPassword con los respectivos argumentos', () => {

    const form = wrapper.find('form')
    form.prop('onSubmit')({
      preventDefault() {},
    })


    expect(startLoginEmailPassword).toHaveBeenCalled()
    expect(startLoginEmailPassword).toHaveBeenCalledTimes(1)
    expect(startLoginEmailPassword).toHaveBeenCalledWith("loz@gmail.com","123456")
    
  })
  
  
});
