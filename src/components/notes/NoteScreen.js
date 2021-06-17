import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote, startDelete } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  const dispatch = useDispatch();

  const { active: note } = useSelector((state) => state.notes);

  const { values, handleInputChange, reset } = useForm(note);
  const { title, body } = values;
  const activeId = useRef(note.id);

  useEffect(() => {
    if (activeId.current !== note.id) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(setActiveNote(values.id, { ...values }));
  }, [values, dispatch]);

  const handleDelete = () => {
    console.log("handle delete");
    dispatch(startDelete(note.id));
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          className="notes__title-input"
          type="text"
          placeholder="Title"
          autoComplete="off"
          name="title"
          onChange={handleInputChange}
          value={title}
        ></input>

        <textarea
          placeholder="What happend today?"
          className="notes__textarea"
          name="body"
          onChange={handleInputChange}
          value={body}
        ></textarea>

        {note.url && (
          <div className="notes__image">
            <img alt="images" src={note.url} />
          </div>
        )}

        <button className="btn btn-danger" onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
};
