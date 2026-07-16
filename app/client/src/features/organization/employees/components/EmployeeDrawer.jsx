// import React from "react";
import {
  X,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  User,
  Building2,
  Shield,
  Clock,
} from "lucide-react";

const EmployeeDrawer = ({ isOpen, employee, onClose }) => {
  if (!isOpen || !employee) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500/20 text-emerald-400";

      case "Inactive":
        return "bg-red-500/20 text-red-400";

      case "On Leave":
        return "bg-yellow-500/20 text-yellow-400";

      default:
        return "bg-slate-600 text-slate-300";
    }
  };

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer */}

      <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col border-l border-slate-800 bg-[#0B1220] shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <h2 className="text-xl font-semibold text-white">Employee Profile</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto p-6">
          {/* Avatar */}

          <div className="flex flex-col items-center">
            <img
              src={employee.avatar}
              alt={employee.fullName}
              className="h-28 w-28 rounded-full border-4 border-violet-600"
            />

            <h3 className="mt-5 text-2xl font-semibold text-white">
              {employee.fullName}
            </h3>

            <p className="mt-1 text-slate-400">{employee.designation}</p>

            <span
              className={`mt-4 rounded-full px-4 py-2 text-sm font-medium ${getStatusColor(
                employee.status,
              )}`}
            >
              {employee.status}
            </span>
          </div>

          {/* Details */}

          <div className="mt-8 space-y-5">
            <DetailItem
              icon={<User size={18} />}
              label="Employee ID"
              value={employee.employeeId}
            />

            <DetailItem
              icon={<Mail size={18} />}
              label="Email"
              value={employee.email}
            />

            <DetailItem
              icon={<Phone size={18} />}
              label="Phone"
              value={employee.phone}
            />

            <DetailItem
              icon={<Building2 size={18} />}
              label="Department"
              value={employee.department}
            />

            <DetailItem
              icon={<Shield size={18} />}
              label="Role"
              value={employee.role}
            />

            <DetailItem
              icon={<Briefcase size={18} />}
              label="Reporting Manager"
              value={employee.reportingManager}
            />

            <DetailItem
              icon={<MapPin size={18} />}
              label="Location"
              value={employee.location}
            />

            <DetailItem
              icon={<Clock size={18} />}
              label="Experience"
              value={employee.experience}
            />

            <DetailItem
              icon={<Calendar size={18} />}
              label="Joining Date"
              value={employee.joiningDate}
            />
          </div>

          {/* Skills */}

          <div className="mt-8">
            <h4 className="mb-4 text-lg font-semibold text-white">Skills</h4>

            <div className="flex flex-wrap gap-2">
              {employee.skills.map((skill) => (
                <span
                  key={skill}
                  className="
                    rounded-full
                    bg-violet-600/15
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-violet-300
                  "
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="border-t border-slate-800 p-6">
          <button
            className="
              w-full
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              to-fuchsia-600
              py-3
              font-semibold
              text-white
              transition
              hover:opacity-90
            "
          >
            Edit Employee
          </button>
        </div>
      </div>
    </>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 rounded-xl border border-slate-800 bg-[#111827] p-4">
    <div className="mt-1 text-violet-400">{icon}</div>

    <div>
      <p className="text-sm text-slate-400">{label}</p>

      <h5 className="mt-1 font-medium text-white">{value}</h5>
    </div>
  </div>
);

export default EmployeeDrawer;
