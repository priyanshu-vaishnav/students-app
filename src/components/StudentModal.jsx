import { useState, useEffect } from "react";


const EMPTY = { name: "", email: "", age: "" };


export default function StudentModal({ mode, student, onSave, onClose, saving }) {

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {

    if (mode === "edit" && student) {

      setForm({
        name: student.name,
        email: student.email,
        age: String(student.age)
      });
    } else {

      setForm(EMPTY);
    }


    setErrors({});

  }, [mode, student]);

  const validate = () => {
    const e = {};


    if (!form.name.trim()) {
      e.name = "Name is required";
    }


    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {

      e.email = "Enter a valid email";
    }


    if (!form.age) {
      e.age = "Age is required";
    } else if (form.age < 1 || form.age > 100) {

      e.age = "Age must be 1-100";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm(oldForm => ({ ...oldForm, [name]: value }));
    setErrors(oldErrors => ({ ...oldErrors, [name]: "" }));
  };

  const handleSubmit = () => {


    if (!validate()) return;


    onSave({
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      age: Number(form.age)
    });
  };

  const isEdit = mode === "edit";

  return (

    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEdit ? "Edit Student" : "Add Student"}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>


        <div className="modal-body">
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              className={`input ${errors.name ? "input-error" : ""}`}
            />

            {errors.name && <span className="err">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={handleChange}
              className={`input ${errors.email ? "input-error" : ""}`}
            />
            {errors.email && <span className="err">{errors.email}</span>}
          </div>


          <div className="form-group">
            <label>Age</label>
            <input
              name="age"
              type="number"
              placeholder="e.g. 21"
              value={form.age}
              onChange={handleChange}
              min="1"
              max="100"
              className={`input ${errors.age ? "input-error" : ""}`}
            />
            {errors.age && <span className="err">{errors.age}</span>}
          </div>

        </div>

        <div className="modal-footer">


          <button className="btn btn-outline" onClick={onClose} disabled={saving}>
            Cancel
          </button>


          <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
            {saving ? "Saving..."                      // data save
              : isEdit ? "Save Changes"
                : "Add Student"}                         
          </button>

        </div>

      </div>
    </div>
  );
}
