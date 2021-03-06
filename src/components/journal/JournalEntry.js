import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../actions/notes";

export const JournalEntry = ({ id, title, body, date, url }) => {
  const dateLocal = moment(date);

  const dispatch = useDispatch();

  const handleNote = () => {
    console.log("handle note==>>>>");
    dispatch(setActiveNote(id, { title, body, date, url }));
  };

  return (
    <div
      onClick={handleNote}
      className="journal__entry animate__animated animate__fadeIn animate__faster"
    >
      {url && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${url})`,
          }}
        ></div>
      )}

      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>

      <div className="journal__entry-date-box">
        <span className="journal__entry-date-day">
          {dateLocal.format("dddd")}
        </span>
        <h4>{dateLocal.format("Do")}</h4>
      </div>
    </div>
  );
};
