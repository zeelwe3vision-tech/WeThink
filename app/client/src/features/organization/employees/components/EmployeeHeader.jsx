import "./EmployeeHeader.css";

function EmployeeHeader({ title, description, buttonText, onButtonClick }) {
  return (
    <div className="employee-header">
      <div className="employee-header-left">
        <h1>{title}</h1>

        <p>
          {description ||
            "Manage employee records, departments and organization details."}
        </p>
      </div>

      <div className="employee-header-right">
        <button className="add-employee-btn" onClick={onButtonClick}>
          {buttonText || "+ Add Employee"}
        </button>
      </div>
    </div>
  );
}

export default EmployeeHeader;