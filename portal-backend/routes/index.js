const express = require("express");
const app = express();
const StudentRoutes = require("./StudentRoutes/StudentRoutes");
const DepartmentRoutes = require("./DepartmentRoutes/DepartmentRoutes");
const AdminRoutes = require("./AdminRoutes/AdminRoutes");

app.use("/student", StudentRoutes);
app.use("/department", DepartmentRoutes);
app.use("/admin", AdminRoutes);

module.exports = app;
