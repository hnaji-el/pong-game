import React from "react";

import Achievements from "./Achievements";
import Friends from "./Friends";
import MatchHistory from "./MatchHistory";
import { Tabs, TabsList, Button, TabsPanels, TabContent } from "./Tabs";

function SwitchersProfile({ id }: { id?: string }) {
  return (
    <Tabs className="gap-0 lg:overflow-visible">
      <TabsList>
        <Button>Achievements</Button>
        <Button>Friends</Button>
        <Button>Match History</Button>
      </TabsList>

      <TabsPanels edit="overflow-visible">
        <TabContent edit="overflow-visible">
          <Achievements id={id} />
        </TabContent>
        <TabContent edit="overflow-visible">
          <Friends id={id} />
        </TabContent>
        <TabContent edit="overflow-visible">
          <MatchHistory id={id} />
        </TabContent>
      </TabsPanels>
    </Tabs>
  );
}

export default SwitchersProfile;
