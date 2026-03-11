
// Props:
//   students  → array of student objects to display
//   loading   → show skeleton rows while loading
//   onEdit    → called with a student when Edit is clicked
//   onDelete  → called with a student when Delete is clicked

export default function StudentTable({ students, loading, onEdit, onDelete }) {
  // Show 3 placeholder skeleton rows while loading
  if (loading) {
    return (
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Age</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((n) => (
              <tr key={n} className="skeleton-row">
                <td><span className="skeleton" /></td>
                <td><span className="skeleton" /></td>
                <td><span className="skeleton skeleton-sm" /></td>
                <td><span className="skeleton skeleton-sm" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Empty state
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <p>No students found.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td className="row-num">{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td className="actions">
                <button className="btn-edit"   onClick={() => onEdit(student)}>Edit</button>
                <button className="btn-delete" onClick={() => onDelete(student)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
