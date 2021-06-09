import React from "react";
import { Route, Switch } from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";

export const JournalRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={JournalScreen} />
    </Switch>
  );
};
