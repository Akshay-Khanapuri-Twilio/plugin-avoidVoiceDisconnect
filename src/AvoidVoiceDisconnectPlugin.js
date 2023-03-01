import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";
import { StateHelper } from "@twilio/flex-ui";

import CustomTaskList from "./components/CustomTaskList/CustomTaskList";

const PLUGIN_NAME = "AvoidVoiceDisconnectPlugin";

export default class AvoidVoiceDisconnectPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    const beforeUnloadListener = (event) => {
      event.preventDefault();
      return (event.returnValue = "Are you sure you want to exit?");
    };

    manager.voiceClient.on("incoming", (c) => {
      addEventListener("beforeunload", beforeUnloadListener);

      c.on("disconnect", () => {
        console.log("Hi There");
        removeEventListener("beforeunload", beforeUnloadListener);
      });
    });
  }
}
