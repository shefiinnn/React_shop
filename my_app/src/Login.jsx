import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    Input,
} from "@heroui/react";
import "./index.css";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from 'axios'
import Lslogin from "./components/Lslogin";
import toast from "react-hot-toast";
export default function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const baseURL = "https://api.escuelajs.co";
    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }
        try {
            const response = await axios.post(`${baseURL}/api/v1/auth/login`, {
                email,
                password,
            });

            const { access_token, refresh_token } = response.data;


            Cookies.set("access_token", access_token);
            Cookies.set("refresh_token", refresh_token);
            toast.success("Login successful:");
            navigate("/Home");
        } catch (error) {
            console.error("Login failed:", error.response?.data);
            alert(error.response?.data?.message || "Login failed");
        }
    };
    return (
        <>
            <Lslogin />
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
                <h1 className="text-violet-500 text-4xl md:text-5xl font-bold mb-8 justify-start">
                    Login
                </h1>
                <div className="bg-[#151518] rounded-xl p-8 w-full max-w-md flex flex-col gap-1">
                    <Input
                        id="email"
                        label="Email"
                        type="email"
                        variant="bordered"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        classNames={{
                            input: "text-black",
                            inputWrapper: "bg-white border-violet-500"
                        }}
                    />
                    <br />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        variant="bordered"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        classNames={{
                            input: "text-black",
                            inputWrapper: "bg-white border-violet-500"
                        }}
                    />
                    <div className="flex flex-col items-center gap-4 mt-5 ">
                        <Button color="primary" onClick={handleLogin}>Login</Button>
                        <Button as={RouterLink} to="/Signup" color="primary" >Signup</Button>
                    </div>
                </div>
            </div>


        </>
    );
}