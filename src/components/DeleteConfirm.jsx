// Simple confirmation dialog before deleting a student
// Props:
//   student   → the student about to be deleted (we show their name)
//   onConfirm → called when user clicks "Yes, Delete"
//   onCancel  → called when user clicks "Cancel"

export default function DeleteConfirm({ student, onConfirm, onCancel }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal modal-sm" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <h2>Delete Student</h2>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>

        <div className="modal-body">
          <p>
            Are you sure you want to delete <strong>{student?.name}</strong>?
            <br />
            <span className="hint">This cannot be undone.</span>
          </p>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger"  onClick={onConfirm}>Yes, Delete</button>
        </div>

      </div>
    </div>
  );
}
