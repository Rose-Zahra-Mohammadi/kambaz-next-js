"use client";
import * as client from "../client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button } from "react-bootstrap";

interface Credentials {
  username: string;
  password: string;
}

export default function Signin() {
 const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
 });
 const [error, setError] = useState<string>("");
 const dispatch = useDispatch();
 const router = useRouter();
 const signin = async () => {
   setError("");
   const trimmedUsername = credentials.username?.trim() || "";
   const trimmedPassword = credentials.password?.trim() || "";
   
   const user = await client.signin(credentials);
   
   if (!user) {
     setError("Invalid username or password");
     return;
   }
   dispatch(setCurrentUser(user));
   router.push("/Dashboard");
 };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      {error && <div className="alert alert-danger mb-2">{error}</div>}
      <FormControl id="wd-username"
             placeholder="username"
             className="mb-2"
             value={credentials.username}
             onChange={(e) => {
               setCredentials({ ...credentials, username: e.target.value });
               setError("");
             }}/>
      <FormControl 
      value={credentials.password}
             onChange={(e) => {
               setCredentials({ ...credentials, password: e.target.value });
               setError("");
             }}
             onKeyDown={(e) => {
               if (e.key === "Enter") {
                 signin();
               }
             }}
             id="wd-password"
             placeholder="password" type="password"
             className="mb-2"/>
      <Button onClick={signin} id="wd-signin-btn" className="w-100" > Sign in </Button>
      <Link id="wd-signup-link" href="/Account/Signup">Sign up</Link>
    </div> );}