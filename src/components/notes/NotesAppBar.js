import React from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploading } from "../../actions/notes";

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);
  const dateLocal = moment(note.date);
  // console.log(note)

  const handleSaveNote = () => {
    console.log("savvinf note");
    dispatch(startSaveNote(note));
  };

  const handleUploadImage = () => {
    document.querySelector("#fileSelector").click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Realiza la accion')
      dispatch(startUploading(file))
    }
  }

  return (
    <div className="notes__appbar">
      <span>{dateLocal.format("dddd, MMMM Do YYYY, h:mm:ss a")}</span>

      <input
        id="fileSelector"
        type="file"
        name="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div>
        <button
          onClick={handleUploadImage}
          className="btn">Picture</button>
        <button onClick={handleSaveNote} className="btn">
          Save
        </button>
      </div>
    </div>
  );
};
