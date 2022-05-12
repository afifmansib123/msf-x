import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { ThemeProvider } from "@mui/material";
import lightTheme from "/styles/theme/lightTheme";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useSession } from "next-auth/react";
import PageChange from "components/PageChange/PageChange.js";
import "assets/css/nextjs-material-dashboard.css?v=1.1.0";
import "styles/globals.css";
import ErrorBoundary from "../components/ErrorBoundary";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(<PageChange path={url} />, document.getElementById("page-transition"));
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

// Create a client
const queryClient = new QueryClient();
export default class MyApp extends App {
  componentDidMount() {
    let comment = document.createComment(`
`);
    document.insertBefore(comment, document.documentElement);
  }

  static ErrorFallback(e) {
    console.error("ErrorFallback", e);
  }

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const {
      Component,
      pageProps: { session, ...pageProps },
    } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <ErrorBoundary FallbackComponent={this.ErrorFallback}>
        <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={lightTheme}>
              <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <title>Bhalogari Merchant Storefront</title>
                {/* <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script> */}
              </Head>
              <Layout>
                {Component.auth ? (
                  <Auth>
                    <Component {...pageProps} />
                  </Auth>
                ) : (
                  <Component {...pageProps} />
                )}
              </Layout>
            </ThemeProvider>
          </QueryClientProvider>
        </SessionProvider>
      </ErrorBoundary>
    );
  }
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  console.debug("Authenticating...", status);
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
