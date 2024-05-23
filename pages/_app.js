import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import NextNProgress from "nextjs-progressbar";
import "../styles/globals.css";
import "leaflet/dist/leaflet.css";
import { Toaster } from "react-hot-toast";
import MainLayout from "@/layouts/Main";

export default function App({ Component, pageProps }) {
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <>
        <MainLayout>{page}</MainLayout>
      </>
    ));

  return getLayout(
    <>
      <NextNProgress
        color="#0000ff"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
        showOnShallow={true}
        options={{ showSpinner: false }}
      />
      <DefaultSeo {...SEO} />
      <Toaster position="top-center" reverseOrder={false} />
      <Component {...pageProps} />
    </>
  );
}
