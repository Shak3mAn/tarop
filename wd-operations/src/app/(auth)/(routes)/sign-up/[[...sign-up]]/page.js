import { SignUp } from "@clerk/nextjs";

export default function Page(){
    return <SignUp afterSignUpUrl="/dashboard" />;
}













// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const SignupPage = () => {
//     const [user, setUser] = useState({
//         email: "",
//         password: "",
//         username: "",
//     });

//     const [buttonDisabled, setButtonDisabled] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const onSignup = async () => {
//         console.log("You've Signed Up")
//     }

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">
//             <h1>Signup</h1>
//             <hr />

//             <label htmlFor="username">Username</label>
//             <input
//                 className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//                 id="username"
//                 type="text"
//                 value={user.username}
//                 onChange={(e) => setUser({ ...user, username })}
//                 placeholder="username"
//             />
//             <label htmlFor="email">Email</label>
//             <input
//                 className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//                 id="email"
//                 type="text"
//                 value={user.email}
//                 onChange={(e) => setUser({ ...user, email })}
//                 placeholder="email"
//             />
//             <label htmlFor="password">Password</label>
//             <input
//                 className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//                 id="password"
//                 type="password"
//                 value={user.password}
//                 onChange={(e) => setUser({ ...user, password })}
//                 placeholder="password"
//             />
//             <button
//                 onClick={onSignup}
//                 className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signup" : "Signup"}</button>
//             <Link href="/login">Visit login page</Link>
//         </div>
//     )
// }

// export default SignupPage