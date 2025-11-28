"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";
export default function AccountNavigation() {
  const currentUser  = useSelector((state: RootState) => state.accountReducer.currentUser);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
 const pathname = usePathname();
 
 const getLinkPath = (link: string) => {
   return `/Account/${link}`;
 };
 
 return (
   <Nav variant="pills">
         {currentUser && currentUser.role === "ADMIN" && (
       <NavLink as={Link} href={`/Account/Users`}  active={pathname.endsWith('Users')}> Users </NavLink> )}
     {links.map((link) => (
       <NavItem key={link}>
         <NavLink as={Link} href={getLinkPath(link)} active={pathname.endsWith(link.toLowerCase())}>
           {link} </NavLink> </NavItem>
     ))}
   </Nav>
);}
