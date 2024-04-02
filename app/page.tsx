"use client"
import { AuthenticationDialog } from "@/components/authentication-dialog";
import Navbar from "@/components/ui/navbar";
import { useState } from "react";
import { Analytics } from "./analytics";
import Recommendation from "./recommendation";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticationDialogOpen, setAuthenticationDialog] = useState(false);

  type ActivePage = "Recommendation" | "Analytics";

  const [activePage, setActivePage] = useState<ActivePage>("Recommendation");

  const handleLogin = () => {
    setAuthenticationDialog(true);
  }

  const handleLogout = () => {
    setAuthenticationDialog(true);
  }

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} activePage={activePage} setActivePage={setActivePage} />
      {activePage === "Recommendation" 
        ? <Recommendation />
        : <Analytics />
      }
      <AuthenticationDialog
        open={isAuthenticationDialogOpen}
        setOpen={setAuthenticationDialog}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn} />
    </div>
  )
}