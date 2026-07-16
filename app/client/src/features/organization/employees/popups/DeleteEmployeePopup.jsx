import "./DeleteEmployeePopup.css";

function DeleteEmployeePopup({ open, employee, onClose, onDelete }) {
  if (!open || !employee) return null;

  return (
    <div className="delete-popup-overlay">
      <div className="delete-popup">
        <div className="delete-popup-icon">🗑️</div>

        <h2>Delete Employee</h2>

        <p>
          Are you sure you want to delete
          <strong>
            {" "}
            {employee.firstName} {employee.lastName}
          </strong>
          ?
        </p>

        <span className="delete-warning">This action cannot be undone.</span>

        <div className="delete-popup-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="delete-btn" onClick={onDelete}>
            Delete Employee
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteEmployeePopup;
