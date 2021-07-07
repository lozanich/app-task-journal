
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { types } from '../../types/types'
import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth'

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "TEST",
  }
};

let store = mockStore(initState);

describe('Pruebas con las acciones de Auth', () => {
    beforeEach(() => {
        store = mockStore(initState);
    })

    test('login y logout deben de crear la accion respectiva', () => {
        const responseLogin = login('719sa', 'Ivan')
        const expectLogin = {
            type: types.login,
            payload: {
                uid: "719sa",
                displayName:"Ivan"
            }
        }

        expect(responseLogin).toMatchObject(expectLogin)
        const response = logout()
        const expectLogout = {
            type: types.logout
        }
        expect(response).toEqual(expectLogout)
        
    })
    
    test('Debe de realizar el startLogout', async() => {
        await store.dispatch(startLogout())

        const actions = store.getActions()

        expect(actions[0]).toEqual({
            type: types.logout
        })

        expect(actions[1]).toEqual({
            type: types.notesLogoutCleanning
        })
    })

    test('debe de iniciar el startLoginEmailPassword', async () => {
        await store.dispatch(startLoginEmailPassword('test@testing.com', '123456'))

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.uiStartLoading
        })
        
        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: "PhP8wxjbYMbZjuRjmUAytJ2meCD3",
                displayName: null
            }
        })

        expect(actions[2]).toEqual({
            type: types.uiEndLoading
        })
    })
    
    
    
})
