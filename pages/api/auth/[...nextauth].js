import NextAuth from "next-auth";
// import AppleProvider from "next-auth/providers/apple";
// import FacebookProvider from "next-auth/providers/facebook";
// import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { HowToReg } from "@mui/icons-material";

export default NextAuth({
  pages: {
    // signIn: '/auth/signin',
    signIn: '/',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Bhalogari Account",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "+8801700702641 / someone@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { username, password } = credentials;

        // Call BG API to verify the credential
        const res = await axios.post("https://backend.bhalogari.com/api/user/verify-password/", {
          contact_number: username,
          password: password,
          // user_email: user_mail1,
        });

        if (res.status === 200) {
          const { data } = res;
          console.log("NextAuth Authenticated", data);
          // Any object returned will be saved in `user` property of the JWT
          //backend.bhalogari.com/api/user/profile/?user_id=22
          // TODO find email, image
          return { ...data, name: data.username, email: "123@123", image: "img123", id: data.id, admin: data.is_staff };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      // session.accessToken = token.accessToken;
      if (token) {
        session.id = token.id;
      }
      // session.accessToken = token;
      // console.log("callback", { session, token });
      return session;
    },
  },
});
