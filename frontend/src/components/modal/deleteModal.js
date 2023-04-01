export const DeleteModal = ({itemToDelete, handleCloseModal, handleDelete}) => {
  return (
    <>
      <div
        className={`modal ${itemToDelete ? "visible" : ""}`}
        id="deleteModal"
      >
        <div className="modal-header">
          <h2>Delete '{itemToDelete ? itemToDelete.title : ""}'?</h2>
          <button onClick={handleCloseModal}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          <div className="btn-group">
            <button className="btn danger-outline" onClick={handleCloseModal}>
              Cancel
            </button>
            <button className="btn danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      <div
        className={`screen ${itemToDelete ? "visible" : ""}`}
        id="deleteModalScreen"
        onClick={handleCloseModal}
      ></div>
    </>
  );
};
