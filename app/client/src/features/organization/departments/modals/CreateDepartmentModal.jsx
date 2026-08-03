// Dev - 28/07/26 - Start
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./CreateDepartmentModal.css";

function CreateDepartmentModal({

  open,
  onClose,
  onSubmit,
  editDepartment,

}){

  const [departmentName, setDepartmentName] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Active");
  const [createdOn, setCreatedOn] = useState(
  new Date().toISOString().split("T")[0]
);
  const [departmentHead, setDepartmentHead] = useState("");
  // ======================================
// Edit Mode
// ======================================

useEffect(() => {

  if (editDepartment) {

    setDepartmentName(editDepartment.departmentName);

    setDepartmentCode(editDepartment.departmentCode);

    setCategory(editDepartment.category);
    setDepartmentHead(editDepartment.departmentHead || "");
    setStatus(

      editDepartment.status

        ? "Active"

        : "Inactive"

    );
    
  // Created Date set
  setCreatedOn(
    editDepartment.createdOn
    ? editDepartment.createdOn.split("T")[0]
    : new Date().toISOString().split("T")[0]
  ); 

  }

}, [editDepartment]);

  // ======================================
// Submit Department
// ======================================
console.log("Component Loaded");
console.log(createdOn);

const handleSubmit = async () => {

  if (

    !departmentName ||

    !departmentCode ||

    !category

  ) {

    toast.error("Please fill all fields.");

    return;

  }

  // ======================================
  // Backend Payload
  // ======================================

  const payload = {

    departmentName,
    departmentCode,
    category,
    departmentHead,
    description: "",
    organizationId:
      "f35fdd21-4fed-43b6-bb05-7b0542025cfa",
    status: status === "Active",

    createdOn: createdOn || new Date().toISOString(),
  };

  // Parent Component ki pampisthunnam

  await onSubmit(payload);
  console.log("Update Payload:", payload);
  // ======================================
  // Reset Form
  // ======================================
  setDepartmentName("");
  setDepartmentCode("");
  setCategory("");
  setStatus("Active");
  setDepartmentHead("");

};

  if (!open) return null;

  return (

    <div className="drawer-overlay">

      <div className="department-drawer">

        <h2>

  {

    editDepartment

      ? "Edit Department"

      : "Add Department"

  }

</h2>

        {/* Department Name */}

        <div className="form-group">

          <label>
            Department Name
          </label>

          <input

            type="text"

            value={departmentName}

            onChange={(e) =>
              setDepartmentName(e.target.value)
            }

            placeholder="Web Development"

          />

        </div>

        {/* Department Code */}

        <div className="form-group">

          <label>

            Department Code

          </label>

          <input

            type="text"

            value={departmentCode}

            onChange={(e) =>
              setDepartmentCode(e.target.value)
            }

            placeholder="WEB"

          />

        </div>

        {/* Category */}

        <div className="form-group">

          <label>

            Category

          </label>

          <select

            value={category}

            onChange={(e) =>
              setCategory(e.target.value)
            }

          >

            <option >
              Select Category
            </option>

            <option value="IT">
              Information Technology
            </option>

            <option value="Test">
              Testing Department
            </option>
            
            <option value="Web">
              Web Development
            </option>

            <option value="Full Stack">
              Full Stack
            </option>

            <option value="MERN">
              MERN Stack
            </option>

            <option value="MEAN">
              MEAN Stack
            </option>

            <option value="UI/UX">
              UI / UX
            </option>

            <option value="AI/ML">
              AI / ML
            </option>

            <option value="Marketing">
              Marketing
            </option>

            <option value="Design">
              Design
            </option>

          
          </select>
        
        </div>
        <div className="form-group">
  <label>Department Head</label>

  <select
    name="departmentHead"
    value={departmentHead}
    onChange={(e) => setDepartmentHead(e.target.value)}
  >
    <option value="">
      Select Department Head
    </option>

    <option value="Zeel">
      Zeel Ma'am
    </option>

    <option value="Parth">
      Parth Sir
    </option>

    <option value="Venshi">
      Venshi Ma'am
    </option>

    <option value="Harsh">
      Harsh Sir
    </option>

  </select>
</div>

        {/* Status */}

        <div className="form-group">

          <label>

            Status

          </label>

          <select

            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }

          >

            <option value="Active">

              Active

            </option>

            <option value="Inactive">

              Inactive

            </option>

          </select>

        </div>

        {/* Created On */}

      <div className="form-group">

        <label> Created On </label>

          <input
            type="date"
            value={createdOn}
            onChange={(e) =>setCreatedOn(e.target.value)
           }
          />
      </div>

        {/* Buttons */}

        <div className="drawer-buttons">

          <button

            className="cancel-btn"

            onClick={onClose}
          >
            Cancel

          </button>

          <button

            className="submit-btn"

            onClick={handleSubmit}

          >
            {

  editDepartment

    ? "Update"

    : "Submit"

}
          </button>

        </div>

      </div>
      
    </div>

  );
}
export default CreateDepartmentModal;

// Dev - 28/07/26 - End