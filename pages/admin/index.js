/**
 * Login page
 */
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import LoginForm from "/components/LoginForm";

export default function Index(props) {
  const router = useRouter();
  const { error } = router.query;

  const handleSignIn = (cred) => {
    // console.debug("handleSignIn", cred);
    signIn("credentials", {
      username: cred.username,
      password: cred.password,
      callbackUrl: "/admin/dashboard",
    });
  };

  return (
    <div className="flex flex-col border-2 border-black">
      {error && (
        <div>
          <h1>Error</h1>
          <p>{error}</p>
        </div>
      )}
      {/* <h1 className="text-2xl text-green" style={{fontFamily:"sans-serif", fontSize:"30px", marginBottom:"20px", marginTop:"20px"}}>BG Admin Panel</h1> */}
      <LoginForm
        title="Admin Panel"
        // subTitle="Sign In"
        signUp={false}
        onSignIn={handleSignIn}
      />
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
