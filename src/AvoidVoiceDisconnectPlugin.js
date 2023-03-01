import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";

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
    // A function that prevents user from closing the Flex browser tab
    const beforeUnloadListener = (event) => {
      event.preventDefault();
      return (event.returnValue = "Are you sure you want to exit?");
    };

    // A listener to sense inbound/outbound call
    manager.voiceClient.on("incoming", (c) => {
      //When a call is received/created add the beforeunload event listener
      addEventListener("beforeunload", beforeUnloadListener);

      // Also add a listener that senses the call disconnect event and removes the beforeunload event listener
      c.on("disconnect", () => {
        removeEventListener("beforeunload", beforeUnloadListener);
      });
    });
  }
}
