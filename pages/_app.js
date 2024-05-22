import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import NextNProgress from "nextjs-progressbar";
import "../styles/globals.css";
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
      <NextNProgress />
      <DefaultSeo {...SEO} />
      <Toaster position="top-center" reverseOrder={false} />
      <Component {...pageProps} />
    </>
  );
}
