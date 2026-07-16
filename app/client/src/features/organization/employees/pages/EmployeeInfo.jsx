import { useMemo, useState } from "react";
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

  const [employees, setEmployees] = useState([
    {
      id: 1,
      employeeId: "EMP001",
      firstName: "Chetan",
      lastName: "Jain",
      email: "chetan@wethink.com",
      mobile: "9876543210",
      department: "IT",
      role: "Admin",
      manager: "Rahul Sharma",
      status: "Active",
      skills: ["React", "Node"],
    },

    {
      id: 2,
      employeeId: "EMP002",
      firstName: "Priya",
      lastName: "Sharma",
      email: "priya@wethink.com",
      mobile: "9123456780",
      department: "HR",
      role: "HR",
      manager: "Amit Kapoor",
      status: "Active",
      skills: ["Recruitment"],
    },

    {
      id: 3,
      employeeId: "EMP003",
      firstName: "Rohan",
      lastName: "Patel",
      email: "rohan@wethink.com",
      mobile: "9988776655",
      department: "Sales",
      role: "Manager",
      manager: "Vikas Mehta",
      status: "Inactive",
      skills: ["Sales"],
    },

    {
      id: 4,
      employeeId: "EMP004",
      firstName: "Neha",
      lastName: "Gupta",
      email: "neha@wethink.com",
      mobile: "9000011111",
      department: "Finance",
      role: "Employee",
      manager: "Karan Shah",
      status: "On Leave",
      skills: ["Accounting"],
    },
  ]);

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

    if (search.trim() !== "") {
      data = data.filter((employee) => {
        const keyword = search.toLowerCase();

        return (
          employee.firstName.toLowerCase().includes(keyword) ||
          employee.lastName.toLowerCase().includes(keyword) ||
          employee.email.toLowerCase().includes(keyword) ||
          employee.employeeId.toLowerCase().includes(keyword)
        );
      });
    }

    if (statusFilter !== "All") {
      data = data.filter((employee) => employee.status === statusFilter);
    }

    if (departmentFilter !== "All") {
      data = data.filter(
        (employee) => employee.department === departmentFilter,
      );
    }

    if (sortBy === "A-Z") {
      data.sort((a, b) => a.firstName.localeCompare(b.firstName));
    }

    if (sortBy === "Z-A") {
      data.sort((a, b) => b.firstName.localeCompare(a.firstName));
    }

    return data;
  }, [employees, search, statusFilter, departmentFilter, sortBy]);

  /* ===========================================================
     Event Handlers
  =========================================================== */

  const handleAddEmployee = () => {
    setShowRegisterModal(true);
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

  const handleOpenDrawer = (employee) => {
    setSelectedEmployee(employee);
    setShowDrawer(true);
  };

  const handleApplyFilters = () => {
    // Filtering is already reactive through useMemo.
    // Reserved for future API-based filtering.
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
        onSubmit={() => {
          setShowRegisterModal(false);
        }}
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
