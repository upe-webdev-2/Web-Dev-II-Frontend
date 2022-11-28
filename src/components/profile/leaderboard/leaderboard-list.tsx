import { useState } from "react";
import LeaderboardItem from "./leaderboard-item";

const LeaderboardList = () => {
  const [leaderboardMockData] = useState([
    {
      name: "Tim Roberts",
      rank: 1,
      badgeCount: 4,
      minutes: 754,
      score: 124
    },
    {
      name: "Johnny Appleseed",
      rank: 3,
      badgeCount: 3,
      minutes: 516,
      score: 87
    },
    {
      name: "Nick James",
      rank: 4,
      badgeCount: 1,
      minutes: 824,
      score: 12
    }
  ]);

  const border =
    "p-[1px] bg-gradient-radial from-borderGradient-primary to-borderGradient-secondary";
  const gradientBackground = "button-gradient bg-size-200 bg-pos-0";
  const radialBackground =
    "bg-gradient-radial from-cardGradient-primary to-cardGradient-secondary";

  return (
    <div className={`space-y-4 w-[95%] `}>
      <div className={`flex flex-row content-center items-center`}>
        <div className={`w-[20%] text-left`}>Leaderboard</div>
        <div className={`w-[10%] text-left`}>Rank</div>
        <div className={`w-[40%] text-left`}>Badges</div>
        <div className={`w-[20%] text-left`}>Hours</div>
        <div className={`w-[10%] text-left`}>Score</div>
      </div>

      {leaderboardMockData.map(
        ({ name, rank, badgeCount, minutes, score }, index) => {
          return (
            <LeaderboardItem
              key={index}
              name={name}
              rank={rank}
              badgecount={badgeCount}
              minutes={minutes}
              score={score}
            />
          );
        }
      )}
    </div>
  );
};
export default LeaderboardList;
