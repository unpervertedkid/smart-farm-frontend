"use client"

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import ModeToggle from '@/components/ui/modetoggle';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList
} from '@radix-ui/react-navigation-menu';
import {
    CircleUser,
    SquareArrowOutUpRight,
} from "lucide-react";

interface NavigationBarProps {
    isLoggedIn: boolean;
    onLogin: () => void;
    onLogout: () => void;
    activePage: "Recommendation" | "Analytics";
    setActivePage: (page: "Recommendation" | "Analytics") => void;
}

function Navbar({ isLoggedIn, onLogin, onLogout, activePage, setActivePage }: NavigationBarProps) {
    return (
        <div>
            <NavigationMenu>
                <NavigationMenuList className="flex justify-between items-center p-5">
                    <NavigationMenuItem className="mx-auto" style={{cursor: "pointer"}} onClick={() => setActivePage("Recommendation")}>
                        Smart Farm Management
                    </NavigationMenuItem>
                    <div className="flex space-x-4">
                        <NavigationMenuItem>
                            <div className="flex justify-end flex-1">
                                <ModeToggle />
                            </div>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <div className="flex items-center gap-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="secondary" size="icon" className="rounded-full">
                                            <CircleUser className="h-5 w-5" />
                                            <span className="sr-only">Toggle user menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={isLoggedIn ? onLogout : onLogin}>{isLoggedIn ? 'Logout' : 'Login'}</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => setActivePage(activePage === "Analytics" ? 'Recommendation' : 'Analytics')}>
                                            {activePage === "Analytics" ? "Recommendations" : "Analytics"}
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <a href="mailto:brienelijahsilah@gmail.com" className="flex items-center">
                                                <span>Support</span>
                                                <SquareArrowOutUpRight className="h-3 w-3 ml-2" />
                                            </a>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </NavigationMenuItem>
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export default Navbar;