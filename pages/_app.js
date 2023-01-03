import Header from "@/containers/header";
import Head from "next/head";
import 'normalize.css/normalize.css';
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{Component.title}</title>
        <meta name="description" content={Component.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <>
        <Header />
        <main className="mt-[80px]">
          <Component {...pageProps} />
        </main>
      </>
    </>
  );
}
