import {
  LayoutDashboard,
  CreditCard,
  User,
  HotelIcon,
  FileCheck,
  GraduationCap,
  ClipboardCopy,
} from "lucide-react";

const AdminMenuItems = [
  {
    name: "Manage Department",
    icon: <HotelIcon />,
    link: "manage-departments",
    submenu: [
      {
        name: "Add Department",
        icon: <LayoutDashboard />,
        link: "add-department",
      },
      {
        name: "Manage Departments",
        icon: <LayoutDashboard />,
        link: "manage-departments",
      },
    ],
  },
  {
    name: "Manage Faculties",
    icon: <LayoutDashboard />,
    link: "manage-faculties",
    submenu: [
      {
        name: "Add Faculties",
        icon: <LayoutDashboard />,
        link: "add-faculties",
      },
      {
        name: "Manage Faculties",
        icon: <LayoutDashboard />,
        link: "manage-faculties",
      },
    ],
  },
  {
    name: "Manage Students",
    icon: <GraduationCap />,
    link: "manage-students",
    submenu: [
      {
        name: "Add Student",
        icon: <LayoutDashboard />,
        link: "add-student",
      },
      {
        name: "Export Student Data",
        icon: <LayoutDashboard />,
        link: "export-student-data",
      },
      {
        name: "Semester Progression",
        icon: <LayoutDashboard />,
        link: "semester-progression",
      },
    ],
  },
  {
    name: "Manage Certificate",
    icon: <FileCheck />,
    link: "admin/manage-certificates",
    submenu: [],
  },
  {
    name: "Manage Documents",
    icon: <FileCheck />,
    link: "admin/manage-documents",
    submenu: [],
  },
  {
    name: "Profile",
    icon: <User />,
    link: "profile",
    submenu: [
      {
        name: "Profile",
        icon: <LayoutDashboard />,
        link: "profile",
      },
      {
        name: "Change Password",
        icon: <LayoutDashboard />,
        link: "change-password",
      },
    ],
  },
];

const DepartmentMenuItems = [
  {
    name: "Manage Students",
    icon: <GraduationCap />,
    link: "manage-students",
    submenu: [
      {
        name: "Add Student",
        icon: <LayoutDashboard />,
        link: "add-student",
      },
      {
        name: "Approve Student",
        icon: <LayoutDashboard />,
        link: "approve-student",
      },
      {
        name: "Export Student Data",
        icon: <LayoutDashboard />,
        link: "export-student-data",
      },
      {
        name: "Semester Progression",
        icon: <LayoutDashboard />,
        link: "semester-progression",
      },
    ],
  },
  {
    name: "Manage Requests",
    icon: <ClipboardCopy />,
    link: "manage-requests",
    submenu: [
      {
        name: "Update Requests",
        icon: <LayoutDashboard />,
        link: "update-requests",
      },
      {
        name: "Certificate Requests",
        icon: <LayoutDashboard />,
        link: "certificate-requests",
      },
    ],
  },
  {
    name: "Profile",
    icon: <User />,
    link: "profile",
    submenu: [
      {
        name: "Profile",
        icon: <LayoutDashboard />,
        link: "profile",
      },
      {
        name: "Change Password",
        icon: <LayoutDashboard />,
        link: "change-password",
      },
    ],
  },
];

const StudentMenuItems = [
  {
    name: "Profile",
    icon: <User />,
    link: "profile",
    submenu: [
      {
        name: "Profile",
        icon: <LayoutDashboard />,
        link: "profile",
      },
      {
        name: "Change Password",
        icon: <LayoutDashboard />,
        link: "change-password",
      },
      {
        name: "Request Update",
        icon: <LayoutDashboard />,
        link: "update",
      },
    ],
  },
  {
    name: "Certificates",
    icon: <ClipboardCopy />,
    link: "certificate",
    submenu: [
      {
        name: "Certificate Request",
        icon: <LayoutDashboard />,
        link: "certificate-request",
      },
      {
        name: "Certificate Status",
        icon: <LayoutDashboard />,
        link: "certificate-status",
      },
    ],
  },
];

export { AdminMenuItems, DepartmentMenuItems, StudentMenuItems };
