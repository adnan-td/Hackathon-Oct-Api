import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>REST Api by Adnan</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
