import { getEmployees, createEmployee } from "../services/employeeService";
import { useEffect, useMemo, useState } from "react";
import EmployeeHeader from "../components/EmployeeHeader";
import EmployeeFilters from "../components/EmployeeFilters";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeActions from "../components/EmployeeActions";
import RegisterEmployeeModal from "../modals/RegisterEmployeeModal";
import AssignSkillsModal from "../modals/AssignSkillsModal";
import EditEmployeeDrawer from "../drawers/EditEmployeeDrawer";
import DeleteEmployeePopup from "../popups/DeleteEmployeePopup";
import "./EmployeeInfo.css";

function EmployeeInfo() {
  /* ===========================================================
     Employee Data
  =========================================================== */
  const [employees, setEmployees] = useState([]);

  /* ===========================================================
     Load Employees
  =========================================================== */

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();

        if (response.success) {
          setEmployees(response.users || []);
        }
      } catch (error) {
        console.error("Load Employees Error:", error);
      }
    };

    fetchEmployees();
  }, []);

  /* ===========================================================
     Search & Filters
  =========================================================== */

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [departmentFilter, setDepartmentFilter] = useState("All");

  const [sortBy, setSortBy] = useState("Newest");

  /* ===========================================================
     Modals & Drawer
  =========================================================== */

  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [showSkillModal, setShowSkillModal] = useState(false);

  const [showDrawer, setShowDrawer] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [showDeletePopup, setShowDeletePopup] = useState(false);

  /* ===========================================================
     Filtered Data
  =========================================================== */

  const filteredEmployees = useMemo(() => {
    let data = [...employees];

    /* ==========================================
     Search
  ========================================== */

    if (search.trim() !== "") {
      const keyword = search.trim().toLowerCase();

      data = data.filter((employee) => {
        return (
          (employee.first_name || "").toLowerCase().includes(keyword) ||
          (employee.last_name || "").toLowerCase().includes(keyword) ||
          (employee.email || "").toLowerCase().includes(keyword) ||
          (employee.employee_id || "").toLowerCase().includes(keyword)
        );
      });
    }

    /* ==========================================
     Status
     "All" means no status filtering
  ========================================== */

    if (statusFilter !== "All") {
      data = data.filter((employee) => employee.status === statusFilter);
    }

    /* ==========================================
     Department
     "All" means no department filtering
  ========================================== */

    if (departmentFilter !== "All") {
      data = data.filter(
        (employee) => employee.department === departmentFilter,
      );
    }

    /* ==========================================
     Sort
  ========================================== */

    if (sortBy === "A-Z") {
      data.sort((a, b) =>
        (a.first_name || "").localeCompare(b.first_name || ""),
      );
    }

    if (sortBy === "Z-A") {
      data.sort((a, b) =>
        (b.first_name || "").localeCompare(a.first_name || ""),
      );
    }

    /*
     * "Newest" keeps the original employee
     * order unless you already receive employees
     * newest-first from the API.
     */

    return data;
  }, [employees, search, statusFilter, departmentFilter, sortBy]);
  /* ===========================================================
     Event Handlers
  =========================================================== */

  const handleAddEmployee = () => {
    setShowRegisterModal(true);
  };

  const handleRegisterEmployee = async (employeeData) => {
    try {
      const response = await createEmployee(employeeData);

      if (!response.success) {
        alert(response.message);
        return false;
      }

      const responseUsers = await getEmployees();

      if (responseUsers.success) {
        setEmployees(responseUsers.users || []);
      }

      alert("Employee Registered Successfully");

      return true;
    } catch (error) {
      // deepak changed chetan sir // 03/08/2026 - end
      console.log("Backend Response:", error.response?.data);
      console.error(error);
      // deepak changed chetan sir // 03/08/2026 - end 
  alert(JSON.stringify(error.response?.data));
     // console.error(error);
    //  alert("Registration Failed");

      return false;
    }
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowDrawer(true);
  };

  const handleAssignSkills = (employee) => {
    setSelectedEmployee(employee);
    setShowSkillModal(true);
  };

  const handleDeleteEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowDeletePopup(true);
  };

  const handleOpenDrawer = (employee) => {
    setSelectedEmployee(employee);
    setShowDrawer(true);
  };

  const handleCloseAll = () => {
    setShowRegisterModal(false);
    setShowSkillModal(false);
    setShowDrawer(false);
    setShowDeletePopup(false);
    setSelectedEmployee(null);
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setDepartmentFilter("All");
    setSortBy("Newest");
  };

  const handleApplyFilters = () => {
    // Reserved for future server-side filtering
  };

  return (
    <div className="employee-info-page">
      <EmployeeHeader
        title="Employee Information"
        buttonText="+ Add Employee"
        onButtonClick={handleAddEmployee}
      />

      <EmployeeFilters
        search={search}
        setSearch={setSearch}
        status={statusFilter}
        setStatus={setStatusFilter}
        department={departmentFilter}
        setDepartment={setDepartmentFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onReset={handleResetFilters}
        onApply={handleApplyFilters}
      />

      <EmployeeTable
        employees={filteredEmployees}
        onOpenDrawer={handleOpenDrawer}
        actions={(employee) => (
          <EmployeeActions
            employee={employee}
            onEdit={handleEditEmployee}
            onAssignSkills={handleAssignSkills}
            onDelete={handleDeleteEmployee}
          />
        )}
      />

      <RegisterEmployeeModal
        open={showRegisterModal}
        onClose={handleCloseAll}
        onSubmit={handleRegisterEmployee}
      />

      <AssignSkillsModal
        open={showSkillModal}
        employee={selectedEmployee}
        onClose={handleCloseAll}
        onSave={() => {
          setShowSkillModal(false);
        }}
      />

      <EditEmployeeDrawer
        open={showDrawer}
        employee={selectedEmployee}
        onClose={handleCloseAll}
        onRefresh={async () => {
          const response = await getEmployees();

          if (response.success) {
            setEmployees(response.users || []);
          }
        }}
      />

      <DeleteEmployeePopup
        open={showDeletePopup}
        employee={selectedEmployee}
        onClose={handleCloseAll}
        onDelete={() => {
          if (!selectedEmployee) return;

          setEmployees((previousEmployees) =>
            previousEmployees.filter(
              (employee) => employee.id !== selectedEmployee.id,
            ),
          );

          handleCloseAll();
        }}
      />
    </div>
  );
}

export default EmployeeInfo;
