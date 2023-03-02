import React from 'react'
import MatchHistoryUser from './MatchHistoryUser'

export default function MatchHistory() {
    return (
        <div className="pt-5 pb-[7.6rem] lg:pb-[2.7rem] flex">
        <table className="table w-full ">
          <thead>
            <tr className="rounded-xl bg-body font-medium text-primaryText shadow">
              <th className="rounded-xl p-4 text-left">Players</th>
              <th className="p-4">Score</th>
              <th className="p-4">Date</th>
              <th className="rounded-xl p-4">Stat</th>
            </tr>
          </thead>
          <tbody>
          <MatchHistoryUser />
          </tbody>
        </table>
      </div>
  )
}
