import React from "react";
import Achievements from "./Achievements";
import Friends from "./Friends";
import MatchHistory from "./MatchHistory";
import { Tabs, TabsList, Tab, TabsPanels, TabContent } from "./Tabs";

interface TypeProps{
  id?:string
}

export default function SwitchersProfile({id}:TypeProps) {
  return (
    <Tabs edit="gap-0 lg:overflow-visible">
      <TabsList>
        <Tab>Achievements</Tab>
        <Tab>Friends</Tab>
        <Tab>Match History</Tab>
      </TabsList>
      <TabsPanels edit="overflow-visible">
        <TabContent edit="overflow-visible">
          <Achievements />
        </TabContent>
        <TabContent edit="overflow-visible">
          <Friends id={id} />
        </TabContent>
        <TabContent edit="overflow-visible">
          <MatchHistory />
        </TabContent>
      </TabsPanels>
    </Tabs>
  );
}
