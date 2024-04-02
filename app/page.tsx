"use client"
import { AuthenticationDialog } from "@/components/authentication-dialog";
import Navbar from "@/components/ui/navbar";
import { useState } from "react";
import CropRecommendation from "./recommendation";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);

  const handleLogin = () => {
    setLoginDialogOpen(true);
  }

  const handleLogout = () => {
    console.log("Logging out");
  }

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      <CropRecommendation />
      <AuthenticationDialog open={isLoginDialogOpen} setOpen={setLoginDialogOpen} />
    </div>
  )
}