// Dev - 28/07/26 - Start

// React
import {
useState,
useEffect
}
from "react";


// Components
import DepartmentTable from "../components/DepartmentTable";
import CreateDepartmentModal from "../modals/CreateDepartmentModal";
import dummyDepartments from "../data/dummyDepartment";
import * as departmentService from "../services/departmentService";
import DepartmentHeader from "../components/DepartmentHeader";
import DepartmentFilters from "../components/DepartmentFilters";
// Modal
import DepartmentDetailsDrawer from "../drawers/DepartmentDetailsDrawer";
import DeleteDepartmentPopup from "../popups/DeleteDepartmentPopup";
// Dummy Data

// CSS
import "./DepartmentList.css";
import toast from "react-hot-toast";

function DepartmentList() {
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [deleteDepartment, setDeleteDepartment] = useState(null);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [activeDepartments, setActiveDepartments] = useState(0);
  const [inactiveDepartments, setInactiveDepartments] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [editDepartment, setEditDepartment] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

const loadDepartments = async () => {

  try {

    const result = await departmentService.getDepartments(
      status,
      category,
      sortBy
    );

    if (result.success) {

  const departmentsData = result.departments || [];

  console.log("Departments Data:", departmentsData);

  setDepartments(departmentsData);

  setTotalDepartments(departmentsData.length);

  setActiveDepartments(
    departmentsData.filter(
      (department) => department.status
    ).length
  );

  setInactiveDepartments(
    departmentsData.filter(
      (department) => !department.status
    ).length
  );

  const employeeTotal = departmentsData.reduce(
    (total, department) =>
      total + Number(department.employees || 0),
    0
  );

  setTotalEmployees(employeeTotal);

  console.log("Total Employees:", employeeTotal);
} // if close

} catch (error) {

  console.log(error);

}

}; // loadDepartments close


  // ======================================
// Search Departments
// ======================================

const handleSearch = async (value) => {

  console.log("Search Value:", value);

  setSearch(value);

  if (value.trim() === "") {

    loadDepartments();

    return;

  }

  const result = await departmentService.searchDepartments(value);

    console.log("Search Response:", result);
    if (result.departments.length > 0) {
  console.log(result.departments[0]);
}

    if (result.success) {
  setDepartments(result.departments);
}

};
const handleReset = () => {

  setSearch("");
  setStatus("");
  setCategory("");
  setSortBy("");

  loadDepartments();

};
// ======================================
// Add / Edit Department
// ======================================

const handleAddDepartment = async (departmentData) => {

  try {

    let response;

    // ======================================
    // Edit Department
    // ======================================

    if (editDepartment) {
      response = await departmentService.updateDepartment(
        editDepartment.id,
        departmentData

      );

    }

    // ======================================
    // Create Department
    // ======================================

    else {

      response = await departmentService.createDepartment(

        departmentData

      );

    }

    // ======================================
    // Success
    // ======================================

    if (response.success) {
      await loadDepartments();
      setOpenDrawer(false);
      setEditDepartment(null);
      toast.success(response.message);

    }

    // ======================================
    // Failed
    // ======================================

    else {

      toast.error(response.message);

    }

  }

  catch (error) {
    console.error(error);
    toast.error("Something went wrong.");

  }

};
  // ======================================
  // Departments
  // ======================================
  const handleEditDepartment = (department) => {
    setEditDepartment(department);
    setOpenDrawer(true);

};
  const handleDeleteClick = (department) => {
  setDeleteDepartment(department);
  setOpenDeletePopup(true);
};
// ======================================
// Delete Department
// ======================================

const handleDeleteDepartment = async () => {

  try {
    const result = await departmentService.deleteDepartment(
      deleteDepartment.id

    );

    if (result.success) {
      toast.success(result.message);
      await loadDepartments();
    } else {
      toast.error(result.message);

    }

  } catch (error) {
    console.error(error);
    toast.error("Failed to delete department.");

  }

  setOpenDeletePopup(false);
  setDeleteDepartment(null);

};

// remove & add this line deepak 03/08/26//
const handleViewDepartment = (department) => {
  console.log("Selected Department:", department);
  setSelectedDepartment(department);
  setOpenDetails(true);
};
// deepak - 03/08/26 - End

// ======================================
// Drawer Actions
// ======================================

const handleEditFromDrawer = () => {

  setOpenDetails(false);

  setEditDepartment(selectedDepartment);

  setOpenDrawer(true);

};

const handleAddTeam = () => {

  toast("Add Team feature coming soon.");

};


const handleDeactivateDepartment = async () => {
  try {
    const updatedData = {
      ...selectedDepartment,
      status: !selectedDepartment.status,
    };

    const response = await departmentService.updateDepartment(
      selectedDepartment.id,
      updatedData
    );

    if (response.success) {
      toast.success("Department status updated successfully.");
      await loadDepartments();
      setSelectedDepartment(updatedData);
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to update department status.");
  }
};

// ======================================
// Drawer
// ======================================

  // ======================================
  // Filters
  // ======================================

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  // ======================================
// Load Departments
// ======================================

useEffect(() => {

  loadDepartments();

},
 [status, category, sortBy]);
  // ======================================
// Load Departments On Page Load
// ======================================
 const filteredDepartments = departments.filter((department) => {

  // Search

  const matchesSearch =

  (department.department_name || "")
    .toLowerCase()
    .includes(search.toLowerCase())

  ||

  (department.department_code || "")
    .toLowerCase()
    .includes(search.toLowerCase())

  ||

  (department.department_head || "")
    .toLowerCase()
    .includes(search.toLowerCase());
  

  (department.description || "")
    .toLowerCase()
    .includes(search.toLowerCase());

  // Status

  const matchesStatus =

    status === ""

      ? true

      : department.status === status;

  // Category

  const matchesCategory =

    category === ""

      ? true

      : department.category === category;

  return (

    matchesSearch &&

    matchesStatus &&

    matchesCategory

  );

});
  return (

    <div className="department-page">

      {/* Header */}

      <DepartmentHeader
        totalDepartments={totalDepartments}
        activeDepartments={activeDepartments}
        inactiveDepartments={inactiveDepartments}
        totalEmployees={totalEmployees}
        onAddDepartment={() => {
        setEditDepartment(null);
        setOpenDrawer(true);
        }}
      />


      {/* Filters */}

<DepartmentFilters
  search={search}
  setSearch={handleSearch}

  status={status}
  setStatus={setStatus}

  category={category}
  setCategory={setCategory}

  sortBy={sortBy}
  setSortBy={setSortBy}

  handleReset={handleReset}
/>

      {/* Table */}

      <DepartmentTable
        departments={departments}
        handleViewDepartment={handleViewDepartment}
        handleEditDepartment={handleEditDepartment}
        handleDeleteClick={handleDeleteClick}
    />

      {/* Drawer */}

      <CreateDepartmentModal
        open={openDrawer}
        onClose={() => {
        setOpenDrawer(false);
        setEditDepartment(null);
        }}
        onSubmit={handleAddDepartment}
        editDepartment={editDepartment}
      />

<DepartmentDetailsDrawer
  open={openDetails}
  onClose={() => setOpenDetails(false)}
  department={selectedDepartment}
  onEdit={handleEditFromDrawer}
  onAddTeam={handleAddTeam}
  onDeactivate={handleDeactivateDepartment}
/>

<DeleteDepartmentPopup

  open={openDeletePopup}

  department={deleteDepartment}

  onClose={() => {

    setOpenDeletePopup(false);

    setDeleteDepartment(null);

  }}

  onConfirm={handleDeleteDepartment}

/>

</div>

    //</div>//
    
  );
}
export default DepartmentList;

// Dev - 28/07/26 - End