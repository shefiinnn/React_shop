import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenuItem,
    NavbarMenu,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@heroui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { LogIn, UserPlus, LogOut } from "lucide-react";
import toast from 'react-hot-toast';
export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        toast.success("Logged out successfully");
        navigate("/");
    };
    const menuItems = [
        { name: "Home", path: "/Home" },
        { name: "Products", path: "/products" },
        { name: "About", path: "/about" },
    ];
    const isAuthenticated = !!Cookies.get("access_token");
        return (
            <Navbar
                className="bg-black text-white"
                isBordered
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                maxWidth="full"
            >
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                </NavbarContent>

                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarBrand>
                        <p className="font-bold text-inherit">React Shop</p>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex" justify="start">
                    <NavbarBrand>
                        <p className="font-bold text-2xl text-inherit">React Shop</p>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent className="hidden sm:flex bg-black border border-neutral-700 px-8 py-2 rounded-full gap-10" justify="center">
                    <NavbarItem>
                        <Link as={RouterLink} className="text-white" to="/Home">
                            Home
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link as={RouterLink} className="text-white" to="/products">
                            Products
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link as={RouterLink} className="text-white" to="/about">
                            About
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    {isAuthenticated ? (
                        <NavbarItem>
                            <Button onClick={handleLogout} color="danger" variant="bordered" startContent={<LogOut size={16} />} className="text-white border-neutral-700 justify-end">
                                Log Out
                            </Button>
                        </NavbarItem>
                    ) : (
                        <>
                            <NavbarItem>
                                <Button as={RouterLink} to="/" variant="bordered" startContent={<LogIn size={16} />} className="text-white border-neutral-700">
                                    Login
                                </Button>
                            </NavbarItem>
                            <NavbarItem>
                                <Button as={RouterLink} to="/Signup" variant="bordered" startContent={<UserPlus size={16} />} className="text-white border-neutral-700">
                                    Sign Up
                                </Button>
                            </NavbarItem>
                        </>
                    )}
                </NavbarContent>

                {/* Mobile Menu Content */}
                <NavbarMenu className="bg-black text-white">
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item.name}-${index}`}>
                            <Link
                                className="w-full text-white"
                                color={item.color}
                                size="lg"
                                onClick={item.action}
                                as={item.path ? RouterLink : "button"}
                                to={item.path}
                            >
                                {item.name}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
        );
    }

