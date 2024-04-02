"use client"
import { AuthenticationDialog } from "@/components/authentication-dialog";
import Navbar from "@/components/ui/navbar";
import { useState } from "react";
import CropRecommendation from "./recommendation";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticationDialogOpen, setAuthenticationDialog] = useState(false);

  const handleLogin = () => {
    setAuthenticationDialog(true);
  }

  const handleLogout = () => {
    setAuthenticationDialog(true);
  }

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      <CropRecommendation />
      <AuthenticationDialog
        open={isAuthenticationDialogOpen}
        setOpen={setAuthenticationDialog}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn} />
    </div>
  )
}