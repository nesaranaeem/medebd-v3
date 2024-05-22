import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const ga_tracking = process.env.NEXT_PUBLIC_GA_TRACKING;
  const hotjar_tracking = process.env.NEXT_PUBLIC_HOTJAR_TRACKING;
  return (
    <Html lang="en">
      <Head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${ga_tracking}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga_tracking}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        {/* Hotjar Tracking Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:${hotjar_tracking},hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
         })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
          }}
        />
        
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
