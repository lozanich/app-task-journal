import React from "react";

export const JournalEntry = () => {
  return (
    <div className="journal__entry">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage:
            "url(https://cdn.forbes.com.mx/2020/04/b_image_2_front_track_jpg-640x360.jpg)",
        }}
      ></div>

      <div className="journal__entry-body">
        <p className="journal__entry-title">Mi dia</p>
        <p className="journal__entry-content">texto de prueba para contenido</p>
      </div>

      <div className="journal__entry-date-box">
        <span className="journal__entry-date-day">Monday</span>
        <h4>28</h4>
      </div>
    </div>
  );
};
