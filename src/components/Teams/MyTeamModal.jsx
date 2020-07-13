import React from "react";
import Modal from "react-modal";

const MyTeamModal = ({ teamData, isModalOpen, closedModal }) => {
  const closeModal = () => {
    closedModal(false);
  };
  return (
    <div>
      <Modal isOpen={isModalOpen}>
        <button onClick={() => closeModal()}>close modal</button>
        {teamData ? (
          <div>
            <h3>{teamData.name}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: teamData.content,
              }}
            />
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default MyTeamModal;
