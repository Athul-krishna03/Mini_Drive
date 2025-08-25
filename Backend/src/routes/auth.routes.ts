import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { authController } from "../controllers/authController";

const authRoutes = Router();


authRoutes.post("/login", asyncHandler((req, res) => {
    authController.login(req,res)
}));

authRoutes.post("/register", asyncHandler((req, res) => {
    console.log("inside the route register")
    authController.register(req,res)
}));
authRoutes.post('/logout', asyncHandler((req, res) => {
    authController.logout(req,res)
}));
authRoutes.post('/refresh-token', asyncHandler((req, res) => {
    authController.refreshToken(req,res)
}));

export default authRoutes;