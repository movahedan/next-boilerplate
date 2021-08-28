import { FC } from "react";

import { analyticsTrackingId, analyticsId } from "./consts";

export const AnalyticsHeadScript: FC = () =>
  analyticsId && analyticsTrackingId ? (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${analyticsId}')`,
        }}
      />

      <noscript>
        <iframe
          title="googletagmanager"
          src={`https://www.googletagmanager.com/ns.html?id=${analyticsId}`}
          height="0"
          width="0"
          style={{
            display: "none",
            visibility: "hidden",
          }}
        />
      </noscript>

      <script
        dangerouslySetInnerHTML={{
          __html: `
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
				`,
        }}
      ></script>
    </>
  ) : null;
