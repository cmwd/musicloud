import React from "react";
import { ThemeProvider } from "glamorous-native";
import { NativeRouter, Route } from "react-router-native";

import * as Screen from "./src/screen";
import PlayerController from "./src/player-controller";
import { main } from "./src/styles";

const PLAYLIST = [
  {
    id: "id-0",
    title: "Rubber Robot",
    author: "Podington Bear",
    uri: "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3"
  },
  {
    id: "id-1",
    title: "Sorry",
    author: "Comfort Fit",
    uri: "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3"
  },
  {
    id: "id-2",
    title: "All Of Me",
    author: "Mildred Bailey",
    uri: "https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3"
  }
];

export default function AppComponent() {
  return (
    <NativeRouter>
      <ThemeProvider theme={main}>
        <PlayerController>
          {props => (
            <Route
              exact
              path="/"
              render={() => <Screen.Player {...props} playlist={PLAYLIST} />}
            />
          )}
        </PlayerController>
      </ThemeProvider>
    </NativeRouter>
  );
}
