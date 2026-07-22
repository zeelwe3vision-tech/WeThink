import React, { useState } from "react";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";

import "../styles/Department.css";

import Header from "../components/Header"; 
import Sidebar from "../../../../layout/Sidebar/Sidebar"; 

import DepartmentTable from "../components/DepartmentTable";
import AddDepartmentDrawer from "../drawers/AddDepartmentDrawer";
import DepartmentDetailsDrawer from "../drawers/DepartmentDetailsDrawer";


  function Department() {
    const [departments, setDepartments] = useState([]);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [editDepartment, setEditDepartment] = useState(null);

    // ==========================
    // Add / Update Department
    // ==========================

    const handleSubmit = (data) => {
      if (editDepartment) {
        setDepartments((prev) =>
          prev.map((item) =>
            item.id === editDepartment.id
              ? {
                  ...item,
                  ...data,
                }
              : item
          )
        );

        toast.success("Department Updated Successfully");
      } else {
        setDepartments((prev) => [
          ...prev,
          {
            id: Date.now(),
            ...data,
            createdOn: new Date().toLocaleDateString(),
          },
        ]);

        toast.success("Department Created Successfully");
      }

      setDrawerOpen(false);
      setEditDepartment(null);
    };

    // ==========================
    // Open Details Drawer
    // ==========================

    const handleViewDepartment = (department) => {
      setSelectedDepartment(department);
      setDetailsOpen(true);
    };

    // ==========================
    // Close Details Drawer
    // ==========================

    const closeDrawer = () => {
      setDetailsOpen(false);
      setSelectedDepartment(null);
    };

    // ==========================
    // Edit Department
    // ==========================

    const handleEdit = () => {
      setEditDepartment(selectedDepartment);
      setDrawerOpen(true);
      setDetailsOpen(false);
    };

    // ==========================
    // Delete Department
    // ==========================

    const handleDelete = () => {
      const confirmDelete = window.confirm(
        "Are you sure you want to deactivate this Department?"
      );

      if (!confirmDelete) return;

      setDepartments((prev) =>
        prev.filter((item) => item.id !== selectedDepartment.id)
      );

      toast.success("Department Deleted Successfully");

      setDetailsOpen(false);
      setSelectedDepartment(null);
    };

    // ==========================
    // Add Team
    // ==========================

    const handleAddTeam = () => {
      alert("Add Team feature coming soon 🚀");
    };

    return (
      <div className="department-page">

        <div className="department-main">
          <Header />

          <div className="department-content">

            <div className="top-bar">
              <div>
                <h1>Department Management</h1>

                <p>
                  Manage all departments in your organization.
                </p>
              </div>

              <button
                className="add-btn"
                onClick={() => {
                  setEditDepartment(null);
                  setDrawerOpen(true);
                }}
              >
                <Plus size={18} />
                Add Department
              </button>
            </div>

            <DepartmentTable
              departments={departments}
              onViewDepartment={handleViewDepartment}
            />

          </div>
        </div>

        {/* Add Department Drawer */}

        <AddDepartmentDrawer
          open={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
            setEditDepartment(null);
          }}
          onSubmit={handleSubmit}
          editDepartment={editDepartment}
        />

        {/* Details Drawer */}

        <DepartmentDetailsDrawer
          open={detailsOpen}
          department={selectedDepartment}
          onClose={closeDrawer}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddTeam={handleAddTeam}
        />
      </div>
    );
  }

  export default Department;