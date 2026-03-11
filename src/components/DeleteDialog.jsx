// Simple confirmation dialog shown before deleting a student
export default function DeleteDialog({ student, onConfirm, onCancel, deleting }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal modal-small" onClick={e => e.stopPropagation()}>

        <div className="modal-header">
          <h2>🗑️ Delete Student</h2>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>

        <div className="modal-body">
          <p className="confirm-text">
            Are you sure you want to delete <strong>{student?.name}</strong>?
            <br />
            <span className="warn-text">This action cannot be undone.</span>
          </p>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onCancel} disabled={deleting}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={deleting}>
            {deleting ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>

      </div>
    </div>
  );
}
