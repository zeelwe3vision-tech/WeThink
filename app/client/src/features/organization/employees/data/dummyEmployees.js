export const employeeStats = [
  {
    id: 1,
    title: "Total Employees",
    value: 248,
    change: "+12 this month",
    color: "purple",
  },
  {
    id: 2,
    title: "Active Employees",
    value: 231,
    change: "93% Active",
    color: "green",
  },
  {
    id: 3,
    title: "Departments",
    value: 12,
    change: "2 New",
    color: "blue",
  },
  {
    id: 4,
    title: "Pending Requests",
    value: 8,
    change: "Need Approval",
    color: "orange",
  },
];

export const departmentOptions = [
  "All Departments",
  "Engineering",
  "Human Resources",
  "Marketing",
  "Sales",
  "Finance",
  "Operations",
  "Design",
];

export const statusOptions = ["All Status", "Active", "Inactive", "On Leave"];

export const employeeActions = [
  {
    id: 1,
    label: "View Profile",
  },
  {
    id: 2,
    label: "Edit Employee",
  },
  {
    id: 3,
    label: "Assign Department",
  },
  {
    id: 4,
    label: "Assign Role",
  },
  {
    id: 5,
    label: "Deactivate",
  },
];

export const employees = [
  {
    id: "EMP-1001",
    employeeId: "WT-1001",
    firstName: "Dev",
    lastName: "Meka",
    fullName: "Dev Meka",
    email: "dev.meka@wethink.com",
    phone: "+91 9876543210",
    department: "Engineering",
    designation: "Frontend Developer",
    role: "Employee",
    reportingManager: "Rahul Mehta",
    experience: "3 Years",
    location: "Ahmedabad",
    joiningDate: "12 Jan 2023",
    status: "Active",
    availability: "Available",
    skills: ["React", "JavaScript", "Tailwind", "Redux"],
    avatar:
      "https://ui-avatars.com/api/?name=Aarav+Sharma&background=6D28D9&color=fff",
  },

  {
    id: "EMP-1002",
    employeeId: "WT-1002",
    firstName: "Parth",
    lastName: "Patel",
    fullName: "Parth Patel",
    email: "parth.patel@wethink.com",
    phone: "+91 9876543211",
    department: "Human Resources",
    designation: "HR Executive",
    role: "HR",
    reportingManager: "Sneha Shah",
    experience: "5 Years",
    location: "Surat",
    joiningDate: "20 Feb 2022",
    status: "Active",
    availability: "Available",
    skills: ["Recruitment", "Payroll", "Communication"],
    avatar:
      "https://ui-avatars.com/api/?name=Priya+Patel&background=2563EB&color=fff",
  },

  {
    id: "EMP-1004",
    employeeId: "WT-1004",
    firstName: "Anvishka",
    lastName: "Jain",
    fullName: "Anvishka Jain",
    email: "anvishka.jain@wethink.com",
    phone: "+91 9876543213",
    department: "Finance",
    designation: "Accountant",
    role: "Employee",
    reportingManager: "Amit Jain",
    experience: "4 Years",
    location: "Pune",
    joiningDate: "16 May 2021",
    status: "On Leave",
    availability: "Leave",
    skills: ["GST", "Accounting", "Excel"],
    avatar:
      "https://ui-avatars.com/api/?name=Neha+Joshi&background=F59E0B&color=fff",
  },

  {
    id: "EMP-1005",
    employeeId: "WT-1005",
    firstName: "Ankit",
    lastName: "Rajpurohit",
    fullName: "Ankit Rajpurohit",
    email: "ankit.rajpurohit@wethink.com",
    phone: "+91 9876543214",
    department: "Engineering",
    designation: "Backend Developer",
    role: "Employee",
    reportingManager: "Rahul Mehta",
    experience: "6 Years",
    location: "Bangalore",
    joiningDate: "09 Jul 2019",
    status: "Inactive",
    availability: "Unavailable",
    skills: ["Node.js", "Express", "PostgreSQL", "Supabase"],
    avatar:
      "https://ui-avatars.com/api/?name=Vikram+Singh&background=22C55E&color=fff",
  },

  {
    id: "EMP-1006",
    employeeId: "WT-1006",
    firstName: "Venshi",
    lastName: "Mangukiya",
    fullName: "Venshi Mangukiya",
    email: "venshi.mangukiya@wethink.com",
    phone: "+91 9876543215",
    department: "Design",
    designation: "UI/UX Designer",
    role: "Employee",
    reportingManager: "Rohan Desai",
    experience: "4 Years",
    location: "Delhi",
    joiningDate: "27 Mar 2022",
    status: "Active",
    availability: "Available",
    skills: ["Figma", "Adobe XD", "UI Design", "UX Research"],
    avatar:
      "https://ui-avatars.com/api/?name=Ananya+Kapoor&background=7C3AED&color=fff",
  },
];

export default employees;
