import moment from "moment";
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { getAllActivities } from "../../api/activities";
import CallLogItem from "../../components/CallLogItem.jsx";

const AllCalls = ({ changePage, setDetailsId }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllActivities()
      .then((res) => setActivities(res))
      .finally(() => {
        if (loading) {
          setLoading(false);
        }
      });
  }, []);

  const onCallLogItemClick = (index) => {
    setDetailsId(index);
    changePage(3);
  };

  const renderCallLogs = () => {
    let currentTime = null;
    if (activities.length > 0) {
      return activities.map((item, index) => {
        if (currentTime !== moment(item.created_at).format("MMMM, DD YYYY")) {
          currentTime = moment(item.created_at).format("MMMM, DD YYYY");
          return (
            <React.Fragment key={`call-log-item-${index}-container`}>
              <div className="call-log-date">
                <div className="dotted-horizontal"></div>
                <span>{moment(item.created_at).format("MMMM, DD YYYY")}</span>
                <div className="dotted-horizontal"></div>
              </div>
              <CallLogItem
                key={`call-log-item-${index}`}
                item={item}
                index={index}
                onClick={() => onCallLogItemClick(item.id)}
              />
            </React.Fragment>
          );
        } else {
          return (
            <CallLogItem
              key={`call-log-item-${index}`}
              item={item}
              index={index}
              onClick={() => onCallLogItemClick(item.id)}
            />
          );
        }
      });
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <div className="loader">
          <Spinner variant="primary" />
        </div>
      ) : (
        <React.Fragment>{renderCallLogs()}</React.Fragment>
      )}
    </React.Fragment>
  );
};

export default AllCalls;
