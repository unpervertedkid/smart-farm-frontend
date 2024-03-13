"use client"
import ModeToggle from '@/components/ui/modetoggle';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@radix-ui/react-navigation-menu';

function Navbar() {
    return (
        <NavigationMenu>
            <NavigationMenuList style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
                <div style={{ flex: 1 }}></div>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        Smart Farm Management
                    </NavigationMenuTrigger>
                </NavigationMenuItem>
                <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
                    <ModeToggle />
                </div>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Navbar;