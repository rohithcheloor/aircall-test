import moment from "moment";
import React, { useState, useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { getAllActivities, updateActivity } from "../../api/activities";
import CallLogItem from "../../components/CallLogItem.jsx";
import ErrorPage from "../../components/ErrorPage.jsx";

const Inbox = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    updateActivityList();
  }, []);

  const updateActivityList = () => {
    if (!loading) {
      setLoading(true);
    }
    getAllActivities().then((res) => {
      setActivities(res);
      setLoading(false);
    });
  };

  const renderCallLogs = () => {
    let currentTime = null;
    if (activities.length > 0) {
      return activities.map((item, index) => {
        if (item.is_archived === false) {
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
                />
              </React.Fragment>
            );
          } else {
            return (
              <CallLogItem
                key={`call-log-item-${index}`}
                item={item}
                index={index}
              />
            );
          }
        }
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const archiveAll = () => {
    activities
      .filter((item) => item.is_archived == false)
      .forEach((item) => {
        console.log(item);
        if (!item.is_archived) {
          updateActivity(item.id, true);
        }
      });
    toast.success("Moved all Calls to Archive", { position: "bottom-center" });
    setShowModal(false);
    updateActivityList();
  };
  return (
    <React.Fragment>
      <ToastContainer />
      {loading ? (
        <div className="loader">
          <Spinner variant="primary" />
        </div>
      ) : (
        <React.Fragment>
          <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure to move all the Contacts to Archive?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={archiveAll}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
          {activities.filter((item) => item.is_archived !== true).length > 0 ? (
            <div className="archive-all-button" onClick={openModal}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAB+0lEQVRIidWUP4gTQRjFf9+X04hyuUZb/5wHFjZqecKZAzuZTAiGA4W7zkIUBCuxFMFCBU/wQC0EFcEi2bDaqMiKvdhZeWorNuFENNzuZxNhs2YTb7HQV743834zs7MD/7skL6hWq1sqlcppETkCbM0Z9g2Iut3uShRF34cN0DxApVK5IyJXgZkRC5wBrk9NTd3OGzCRF4jIcRFZDoLg3AgA3vsbwClgcWjPMLNWq82JyCszWxWR1VEAM5sWkWlgrtPpvB4LcM7tV9U3wFcReWtmySiAiKiZHQC2qerBdrv9Lp3/dkSq6oDNSZLsC8Pwy6jyX2o2mzt6vd7nJEk8MAAY2IFzbruqPgbmgRd/Up7SURF5GcfxQnphA7dIVR8Cs0C0wXKAyMwOq+r9tJk9onkRuRkEwfkCAOr1+jUzO5v2sv/BJmCtSHlfa/2OXMBf10hAvV7f7b0/kZd77xecczsLA8zsGPDAObcnmzUajV3Ao/61zlXuUwFQKpWexHG8rKqXvPf30lkcx4tAIiJPCwNardYn7/0V4AJwMhObiFwOguBjYQBAp9O56Jy7q6p7036SJO/DMPwwbv5YAEC/aGzZMGU/cg+YLFLU1yTwI21kd/DczM547w8B6xssnzCzWTN7ljazb9GSiKwUKAdYN7Nb5XJ5qcDcf1g/AdDenac0Zoe4AAAAAElFTkSuQmCC" />
              <span>Archive all Calls</span>
            </div>
          ) : (
            <ErrorPage description={"No Call logs available"} />
          )}
          {renderCallLogs()}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Inbox;
