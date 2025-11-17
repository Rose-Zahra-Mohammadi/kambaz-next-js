"use client";
import Link from "next/link";
import { useState } from "react";
import * as client from "../client";
import { useRouter } from "next/navigation";
import { FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
export default function Signup() {
       const [user, setUser] = useState<any>({ username: "Zahra", password: "12345" });
       const [error, setError] = useState<string>("");
       const dispatch = useDispatch();
       const router = useRouter();
       const signup = async () => {
              try {
                     setError("");
                     const currentUser = await client.signup(user);
                     dispatch(setCurrentUser(currentUser));
                     router.push("/Account/Profile");
              } catch (error: any) {
                     const message = error.response?.data?.message || error.message || "Failed to sign up";
                     setError(message);
              }
       };
       return (
              <div id="wd-signup-screen">
                     <h1>Sign up</h1>
                     {error && <div className="alert alert-danger mb-2">{error}</div>}
                     <FormControl id="wd-username" value={user.username || ""} onChange={(e) => {
                            setUser({ ...user, username: e.target.value });
                            setError("");
                     }}
                            className="wd-username mb-2" placeholder="username" />
                     <FormControl id="wd-password" value={user.password || ""} onChange={(e) => {
                            setUser({ ...user, password: e.target.value });
                            setError("");
                     }}
                            className="wd-password mb-2" placeholder="password" type="password" />
                     <FormControl id="wd-password-verify"
                            placeholder="verify password" type="password"
                            className="mb-2" />
                     <Button id="wd-signup-btn" onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-100"> Sign up </Button><br />
                     <Link href="/Account/Signin" className="wd-signin-link">Sign in</Link>
              </div>);
}

