import {
    Button,
} from "@heroui/react";
import { Input } from "@heroui/input";
import "./index.css";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Lslogin from "./components/Lslogin";

export default function App() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const baseURL = "https://api.escuelajs.co";
    const handleSignup = async () => {
        if (!name || !password || !email) {
            toast.error("Please fill all fields");
            return;
        }
        try {
            const res = await axios.post(`${baseURL}/api/v1/users/`, {
                name,
                password,
                email,
                avatar: "https://cdn-icons-png.flaticon.com/512/147/147144.png"
            });

            if (res.status === 201 || res.status === 200) {
                toast.success("Signup successful! Please login.");               
                sessionStorage.setItem("email", email);
                navigate("/"); 
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Signup failed");
        }
    };
    return (
        <>
        <Lslogin/> 
            <div className="flex flex-col gap-10 justify-center items-center min-h-screen">
                <div className="w-full max-w-md bg-[#151518] p-8 rounded-xl flex flex-col gap-4">
                    <div className="flex flex-col items-center gap-4 mt-5 ">
                        <Input
                            label="Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ color: "black" }}
                        />
                        <Input label="Email"  type="email" value={email} onChange={(e)=>setEmail(e.target.value)} style={{color:"black"}}/>
                        <Input label="Password"  type="password" value={password}  onChange={(e) => setPassword(e.target.value)} style={{color:"black"}} />
                    </div>
                    <Button
                        onClick={handleSignup}
                        color="primary"
                        style={{ color: "black", backgroundColor: "violet" }}
                        className="mt-4"
                    >
                        Signup
                    </Button>
                    <Button
                        as={RouterLink}
                        to="/"
                        color="secondary"
                        style={{ color: "white", backgroundColor: "grey" }}
                        className="mt-2"
                    >
                        Login
                    </Button>
                </div>
            </div>
        </>
    );
}