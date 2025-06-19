"use client";

import { useAuth } from "../context/auth-context";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  return <button onClick={() => { logout(); router.push("/login"); }}>Logout</button>;
}
