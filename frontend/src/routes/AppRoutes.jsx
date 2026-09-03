import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import NotFound from "../pages/public/NotFound";

import Dashboard from "../pages/user/Dashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";

import ProtectedRoute from "./ProtectedRoute";


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* ================================
                    PUBLIC ROUTES
                ================================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* ================================
                    PROTECTED USER ROUTES
                ================================= */}

                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                </Route>


                {/* ================================
                    ADMIN ROUTE
                ================================= */}

                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />


                {/* ================================
                    404
                ================================= */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>
        </BrowserRouter>
    );
}


export default AppRoutes;