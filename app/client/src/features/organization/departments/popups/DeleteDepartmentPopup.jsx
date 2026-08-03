// Dev - 28/07/26 - Start
import "./DeleteDepartmentPopup.css";

export default function DeleteDepartmentPopup({
  open,
  onClose,
  onConfirm,
  department,
}) {

  if (!open || !department) return null;

  return (
    <div className="popup-overlay">

      <div className="delete-popup">

        <h2>Delete Department</h2>

        <p>
          Are you sure you want to delete
          <strong> {department.departmentName}</strong> ?
        </p>

        <div className="popup-buttons">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

// Dev - 28/07/26 - End