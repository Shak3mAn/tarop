import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return <SignIn afterSignInUrl={"/dashboard"} />;
}












// "use client";

// import Link from "next/link";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { axios } from "axios";

//TODO: Add the Forgot Password
//TODO: Add the Login PAN

// export default function LoginPage() {
//   const router = useRouter();
//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//   });
//   const [buttonDisabled, setButtonDisabled] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const onLogin = async () => {
//     console.log("You've successfully logged in");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <h1>Login</h1>
//       <hr />

//       <label htmlFor="email">Email</label>
//       <input
//         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//         id="email"
//         type="text"
//         value={user.email}
//         onChange={(e) => setUser({ ...user, email: e.target.value })}
//         placeholder="email"
//       />
//       <label htmlFor="password">Password</label>
//       <input
//         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//         id="password"
//         type="password"
//         value={user.password}
//         onChange={(e) => setUser({ ...user, password: e.target.value })}
//         placeholder="password"
//       />
//       <button
//         onClick={onLogin}
//         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
//       >
//         Login here
//       </button>
//       <Link href="/signup">Visit Signup page</Link>
//     </div>
//   );
// }
