import { X } from "lucide-react";
import "./AssignSkillsModal.css";

function AssignSkillsModal({ open, onClose, employee, onSave }) {
  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSave) {
      onSave();
    }
  };

  return (
    <>
      {/* Overlay */}

      <div className="modal-overlay" onClick={onClose} />

      {/* Modal */}

      <div className="assign-skills-modal">
        {/* Header */}

        <div className="assign-modal-header">
          <div>
            <h2>Assign Skills</h2>

            <p>
              Assign professional skills to{" "}
              <strong>{employee?.firstName || "Employee"}</strong>.
            </p>
          </div>

          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Form */}

        <form className="assign-skills-form" onSubmit={handleSubmit}>
          <div className="assign-grid">
            <div className="form-group">
              <label>Primary Skill</label>

              <select>
                <option>React.js</option>
                <option>Node.js</option>
                <option>JavaScript</option>
                <option>TypeScript</option>
                <option>Java</option>
                <option>Python</option>
              </select>
            </div>

            <div className="form-group">
              <label>Skill Level</label>

              <select>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Expert</option>
              </select>
            </div>

            <div className="form-group">
              <label>Experience</label>

              <input type="text" placeholder="e.g. 3 Years" />
            </div>

            <div className="form-group">
              <label>Certification</label>

              <input type="text" placeholder="Certification Name" />
            </div>

            <div className="form-group full-width">
              <label>Remarks</label>

              <textarea rows="4" placeholder="Additional remarks..." />
            </div>
          </div>

          {/* Footer */}

          <div className="assign-modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Assign Skill
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AssignSkillsModal;
