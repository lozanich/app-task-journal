import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import { useForm } from "../../hooks/useForm";
import { setErrorAction, removeErrorAction } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ui);

  const { msgError } = state;

  const { values, handleInputChange } = useForm({
    name: "Lozanich",
    email: "loz@gmail.com",
    password: "123456",
    password2: "123456",
  });

  const { name, email, password, password2 } = values;

  const handleRegister = (e) => {
    e.preventDefault();
    if (formValid()) {
      console.log("el formularios es valido");
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
    console.log(name, email, password, password2);
  };

  const formValid = () => {
    if (name.trim().length === 0) {
      dispatch(setErrorAction("Name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setErrorAction("Email is not valid"));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(
        setErrorAction("Password should be equals and minimum 6 characters")
      );
      return false;
    }

    dispatch(removeErrorAction());

    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>

      {msgError && <div className="auth__alert-error">{msgError}</div>}

      <form onSubmit={handleRegister}>
        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Confirm password"
          name="password2"
          value={password2}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary btn-block mb-5" type="submit">
          Ingresar
        </button>

        <Link className="link" to="/auth/login">
          Already registered?
        </Link>
      </form>
    </>
  );
};
