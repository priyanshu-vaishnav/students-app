import { useState, useEffect } from "react";

import initialStudents from "./data/students";
import downloadAsExcel from "./utils/downloadAsExcel";
import StudentTable from "./components/StudentTable";
import StudentModal from "./components/StudentModal";
import DeleteConfirm from "./components/DeleteConfirm";


// All state lives here. Child components only receive what they need.

let nextId = initialStudents.length + 1; // simple ID counter

export default function App() {
  const [students, setStudents] = useState([]);       // full list
  const [search, setSearch] = useState("");        // search box text
  const [loading, setLoading] = useState(true);      // initial load
  const [saving, setSaving] = useState(false);     // form submit

  // modal state
  const [modalMode, setModalMode] = useState(null);      // "add" | "edit" | null
  const [selectedStudent, setSelectedStudent] = useState(null);      // student being edited
  const [deleteTarget, setDeleteTarget] = useState(null);      // student to delete

  //Simulate fetching data on mount 
  useEffect(() => {
    setTimeout(() => {
      setStudents(initialStudents);
      setLoading(false);
    }, 1500); // fake 1.5 second network delay
  }, []);

  //Derived: filter students by search text
  const filteredStudents = students.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q)
    );
  });

  // ── CRUD handlers ─────────────────────────────────────────────────────────

  // ADD
  const handleAdd = (formData) => {
    setSaving(true);
    setTimeout(() => {
      const newStudent = { id: nextId++, ...formData };
      setStudents((prev) => [...prev, newStudent]);
      setSaving(false);
      setModalMode(null);
    }, 600); // fake save delay
  };

  // EDIT
  const handleEdit = (formData) => {
    setSaving(true);
    setTimeout(() => {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === selectedStudent.id ? { ...s, ...formData } : s
        )
      );
      setSaving(false);
      setModalMode(null);
      setSelectedStudent(null);
    }, 600);
  };

  // DELETE
  const handleDelete = () => {
    setStudents((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="app">


      <header className="page-header">
        <div>
          <h1>Students</h1>
          <p className="subtitle">{students.length} total students</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalMode("add")}>
          + Add Student
        </button>
      </header>


      <div className="toolbar">
        <input
          className="input search-input"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn btn-outline"
          onClick={() => downloadAsExcel(filteredStudents)}
          disabled={filteredStudents.length === 0}
          title="Downloads the currently visible rows"
        >
          ⬇ Export CSV
        </button>
      </div>


      <StudentTable
        students={filteredStudents}
        loading={loading}
        onEdit={(student) => { setSelectedStudent(student); setModalMode("edit"); }}
        onDelete={(student) => setDeleteTarget(student)}
      />

      {/* ── Add / Edit Modal ── */}
      {(modalMode === "add" || modalMode === "edit") && (
        <StudentModal
          mode={modalMode}
          student={selectedStudent}
          onSave={modalMode === "add" ? handleAdd : handleEdit}
          onClose={() => { setModalMode(null); setSelectedStudent(null); }}
          saving={saving}
        />
      )}

      {deleteTarget && (
        <DeleteConfirm
          student={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

    </div>
  );
}
