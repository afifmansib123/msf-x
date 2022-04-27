import Head from "next/head";

function About(props) {
  return (
    <>
      <Head>
        <title>About Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="m-10">
        <h1>About Page</h1>
        Merchant Storefront
      </div>
    </>
  );
}

export default About;
