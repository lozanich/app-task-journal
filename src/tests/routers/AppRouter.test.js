import "@testing-library/jest-dom";
import React from "react";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import { AppRouter } from "../../routers/AppRouter";
import { Provider } from "react-redux";
import { login } from "../../actions/auth";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
import {firebase} from '../../firebase/firebaseConfig'


jest.mock("../../actions/auth", () => {
  return {login: jest.fn()}
})

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
    ui: { loading: false, msgError: null },
    notes: {
        notes: [],
        active: {
          id:"ACB"
      }
  }
};

let store = mockStore(initState);
store.dispatch = jest.fn()


describe('Pruebas en el AppRouter', () => {
    test('Debe de llamar el login si estoy autenticado', async () => {
        let user;

        await act(async () => {
            
            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
            user = userCred.user


            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );

        })

        expect(login).toHaveBeenCalled()
        expect(login).toHaveBeenCalledWith('PhP8wxjbYMbZjuRjmUAytJ2meCD3', null)
        
    })
    


})
