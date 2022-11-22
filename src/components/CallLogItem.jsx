import React from "react";
import missedIncoming from "../assets/call-missed.png";
import missedOutgoing from "../assets/call-unanswered.png";
import callIncoming from "../assets/call-in.png";
import callOutgoing from "../assets/call-out.png";
import voicemail from "../assets/voicemail.png";
import moment from "moment";

const CallLogItem = ({ item, onClick }) => {
  const itemTime = moment(item.created_at);
  return (
    <React.Fragment>
      <div className="call-log-item" onClick={onClick}>
        <div className="callIcon">
          {item.call_type == "answered" ? (
            item.direction == "inbound" ? (
              <img alt="incoming" src={callIncoming} />
            ) : (
              <img alt="outgoing" src={callOutgoing} />
            )
          ) : item.call_type == "missed" ? (
            item.direction == "inbound" ? (
              <img alt="incoming" src={missedIncoming} />
            ) : (
              <img alt="outgoing" src={missedOutgoing} />
            )
          ) : (
            item.call_type == "voicemail" && (
              <img alt="voicemail" src={voicemail} />
            )
          )}
        </div>
        <div className="call-log-details">
          <p className="call-log-number">
            {item.direction == "inbound" ? item.from : item.to}
          </p>
          <p className="call-log-via">call via {item.via}</p>
        </div>
        <div className="item-seperator"></div>
        <div className="call-log-time">
          <span>{itemTime.format("hh:mm")}</span>
          <span> {itemTime.format("a")}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CallLogItem;
