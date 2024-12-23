import React from "react";

import Achievements from "./Achievements";
import Friends from "./Friends";
import MatchHistory from "./MatchHistory";
import Button from "./Button";

interface TabState {
  isAchievements: boolean;
  isFriends: boolean;
  isMatchHistory: boolean;
}

function SwitchersProfile({ id }: { id?: string }) {
  const [tabState, setTabState] = React.useState<TabState>({
    isAchievements: true,
    isFriends: false,
    isMatchHistory: false,
  });

  const handleTabState = (tab: keyof TabState) => {
    setTabState({
      isAchievements: tab === "isAchievements",
      isFriends: tab === "isFriends",
      isMatchHistory: tab === "isMatchHistory",
    });
  };

  return (
    <div className="flex h-full flex-col gap-0 lg:overflow-visible">
      <div className="flex items-center text-sm">
        <Button
          isClicked={tabState.isAchievements}
          onClick={() => handleTabState("isAchievements")}
        >
          Achievements
        </Button>
        <Button
          isClicked={tabState.isFriends}
          onClick={() => handleTabState("isFriends")}
        >
          Friends
        </Button>
        <Button
          isClicked={tabState.isMatchHistory}
          onClick={() => handleTabState("isMatchHistory")}
        >
          Match History
        </Button>
      </div>

      <div className="h-full overflow-visible">
        {tabState.isAchievements && <Achievements id={id} />}
        {tabState.isFriends && <Friends id={id} />}
        {tabState.isMatchHistory && <MatchHistory id={id} />}
      </div>
    </div>
  );
}

export default SwitchersProfile;
