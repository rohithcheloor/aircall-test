import { Button, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { getActivityDetails, updateActivity } from "../../api/activities";
import { toast } from "react-toastify";
import backArrow from "../../assets/back-arrow.png";
import moment from "moment";

const Details = ({ index, prevPage, changePage, setDetailsId }) => {
  const [loading, setLoading] = useState(true);
  const [activityData, setActivityData] = useState({});
  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
    fetchActivityData();
  }, []);
  const fetchActivityData = () => {
    getActivityDetails(index).then((res) => {
      setActivityData(res);
      setLoading(false);
    });
  };
  const goBack = () => {
    setDetailsId(null);
    changePage(prevPage);
  };

  const getDuration = () => {
    if (activityData.duration) {
      const duration = parseInt(activityData.duration);
      if (duration < 3600) {
        return new Date(duration * 1000).toISOString().slice(14, 19);
      } else {
        return new Date(duration * 1000).toISOString().slice(11, 19);
      }
    }
  };

  const archiveLog = () => {
    const isArchive = activityData.is_archived;
    updateActivity(activityData.id, !activityData.is_archived).then(() => {
      toast.success(`Moved to ${isArchive ? "Inbox" : "Archive"}`, {
        position: "bottom-center",
      });
      goBack();
    });
  };

  return (
    <React.Fragment>
      {loading ? (
        <div className="loader">
          <Spinner variant="primary" />
        </div>
      ) : (
        <React.Fragment>
          <div className="details-title">
            <a onClick={goBack} href="#">
              <img alt="back" src={backArrow} />
            </a>
            <span>
              {activityData.direction == "inbound"
                ? activityData.from
                : activityData.to}
            </span>
          </div>
          <div className="call-type">
            <span>
              {activityData.direction == "inbound" ? "Incoming" : "Outgoing"} /
              {activityData.call_type == "missed"
                ? "Missed Call"
                : activityData.call_type == "answered"
                ? "Answered"
                : activityData.call_type == "voicemail" && "Voicemail"}
            </span>
          </div>
          <div className="call-log-date">
            <div className="dotted-horizontal"></div>
            <span>
              {moment(activityData.created_at).format("MMMM, DD YYYY")}
            </span>
            <div className="dotted-horizontal"></div>
          </div>
          <div>
            <div className="call-trans-details">
              <div>
                <p>
                  {activityData.direction == "inbound"
                    ? `To ${activityData.to}`
                    : `From ${activityData.from}`}
                </p>
                <p>via {activityData.via}</p>
              </div>
              <div className="item-seperator"></div>
              {getDuration()}
            </div>
          </div>
          <div className="details-archive-btn">
            <Button onClick={archiveLog}>
              {activityData.is_archived ? "Move to Inbox" : "Move to Archives"}
            </Button>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Details;
