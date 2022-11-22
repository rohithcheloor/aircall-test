import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { resetActivity, updateActivity } from "../../api/activities";
import { ToastContainer, toast } from "react-toastify";

const Settings = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const unarchiveAll = () => {
    resetActivity().then(() =>
      toast.success("Cleared all Archives", { position: "bottom-center" })
    );
    setShowModal(false);
  };
  return (
    <div className="settings-page">
      <ToastContainer />
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to unarchive all Archives?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={unarchiveAll}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="archive-all-button" onClick={openModal}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAB+0lEQVRIidWUP4gTQRjFf9+X04hyuUZb/5wHFjZqecKZAzuZTAiGA4W7zkIUBCuxFMFCBU/wQC0EFcEi2bDaqMiKvdhZeWorNuFENNzuZxNhs2YTb7HQV743834zs7MD/7skL6hWq1sqlcppETkCbM0Z9g2Iut3uShRF34cN0DxApVK5IyJXgZkRC5wBrk9NTd3OGzCRF4jIcRFZDoLg3AgA3vsbwClgcWjPMLNWq82JyCszWxWR1VEAM5sWkWlgrtPpvB4LcM7tV9U3wFcReWtmySiAiKiZHQC2qerBdrv9Lp3/dkSq6oDNSZLsC8Pwy6jyX2o2mzt6vd7nJEk8MAAY2IFzbruqPgbmgRd/Up7SURF5GcfxQnphA7dIVR8Cs0C0wXKAyMwOq+r9tJk9onkRuRkEwfkCAOr1+jUzO5v2sv/BJmCtSHlfa/2OXMBf10hAvV7f7b0/kZd77xecczsLA8zsGPDAObcnmzUajV3Ao/61zlXuUwFQKpWexHG8rKqXvPf30lkcx4tAIiJPCwNardYn7/0V4AJwMhObiFwOguBjYQBAp9O56Jy7q6p7036SJO/DMPwwbv5YAEC/aGzZMGU/cg+YLFLU1yTwI21kd/DczM547w8B6xssnzCzWTN7ljazb9GSiKwUKAdYN7Nb5XJ5qcDcf1g/AdDenac0Zoe4AAAAAElFTkSuQmCC" />
        <span>Unarchive all Archived Calls</span>
      </div>
    </div>
  );
};

export default Settings;
