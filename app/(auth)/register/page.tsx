'use client'
import Toast from "@/app/Toast";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", {
        username,
        email,
        password,
      });
      console.log(res.data);
      if( res.status === 200){
           signIn("credentials", {
            username,
            password,
            callbackUrl: "/",
            redirect: true,    
          }); 
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Toast/>
    
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <button className="bg-blue-500 text-white p-2 w-full rounded">
          Register
        </button>
      </form>
    </div>
    </>
  );
}