// import React from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Building2,
  ShieldCheck,
 } from "lucide-react";

const EmployeeActions = ({
  employee,
  onView,
  onEdit,
  onAssignDepartment,
  onAssignRole,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {/* View */}

      <button
        title="View Profile"
        onClick={() => onView(employee)}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          bg-slate-800
          text-slate-300
          transition-all
          duration-300
          hover:bg-violet-600
          hover:text-white
        "
      >
        <Eye size={18} />
      </button>

      {/* Edit */}

      <button
        title="Edit Employee"
        onClick={() => onEdit(employee)}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          bg-slate-800
          text-slate-300
          transition-all
          duration-300
          hover:bg-blue-600
          hover:text-white
        "
      >
        <Pencil size={18} />
      </button>

      {/* Assign Department */}

      <button
        title="Assign Department"
        onClick={() => onAssignDepartment(employee)}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          bg-slate-800
          text-slate-300
          transition-all
          duration-300
          hover:bg-cyan-600
          hover:text-white
        "
      >
        <Building2 size={18} />
      </button>

      {/* Assign Role */}

      <button
        title="Assign Role"
        onClick={() => onAssignRole(employee)}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          bg-slate-800
          text-slate-300
          transition-all
          duration-300
          hover:bg-emerald-600
          hover:text-white
        "
      >
        <ShieldCheck size={18} />
      </button>

      {/* Delete */}

      <button
        title="Delete Employee"
        onClick={() => onDelete(employee)}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          bg-slate-800
          text-slate-300
          transition-all
          duration-300
          hover:bg-red-600
          hover:text-white
        "
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default EmployeeActions;
