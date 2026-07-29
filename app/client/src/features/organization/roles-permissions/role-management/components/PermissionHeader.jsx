import "./PermissionHeader.css";
import { Search } from "lucide-react";

function PermissionHeader({
  search,
  setSearch,
  selectedType,
  setSelectedType,
}) {
  return (
    <div className="permission-header">
      <div className="permission-header-left">
        <h2 className="permission-page-title">RBAC Management</h2>
        <p className="permission-page-subtitle">
          Assign and manage permissions for Employees, Departments and Roles.
        </p>
      </div>

      <div className="permission-header-right">
        <div className="permission-type-selector">
          <button
            className={selectedType === "employee" ? "active" : ""}
            onClick={() => setSelectedType("employee")}
          >
            Employee
          </button>

          <button
            className={selectedType === "department" ? "active" : ""}
            onClick={() => setSelectedType("department")}
          >
            Department
          </button>

          <button
            className={selectedType === "role" ? "active" : ""}
            onClick={() => setSelectedType("role")}
          >
            Role
          </button>
        </div>

        <div className="permission-search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder={`Search ${selectedType}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
export default PermissionHeader;
