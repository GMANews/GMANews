import Head from 'next/head'
import { useEffect } from 'react'

export async function getServerSideProps(context) {
  const userAgent = context.req.headers['user-agent'] || '';
  const isFacebookBot = userAgent.includes('facebookexternalhit') || userAgent.includes('Facebot');

  if (!isFacebookBot) {
    return {
      redirect: {
        destination: process.env.REDIRECT_URL || 'https://s.shopee.ph/1B9AldpcQb',
        permanent: false,
      },
    };
  }

  return { props: {} };
}

export default function Home() {
  useEffect(() => {
    const redirectToShopeeApp = () => {
      const userAgent = navigator.userAgent || '';
      const isAndroid = /Android/i.test(userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

      if (isAndroid || isIOS) {
        const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL || 'https://s.shopee.ph/1B9AldpcQb';
        const productId = redirectUrl.split('/').pop();

        const shopeeAppUrl = isAndroid
          ? `shopee://shopeetabsv2/productdetail?${productId}`
          : `shopee://productdetail?${productId}`;

        window.location.href = shopeeAppUrl;

        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 1000);
      }
    };

    redirectToShopeeApp();
  }, []);

  const DISPLAY_URL = "https://www.o.o/"; // Fake display domain
  const OG_IMAGE = process.env.NEXT_PUBLIC_OG_IMAGE || "https://i.imgur.com/ZMPRJsx.png";
  const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL || "https://s.shopee.ph/1B9AldpcQb";

  return (
    <div>
      <Head>
        <title>Nakakaiyak na kwento | www.o.o</title>
        <meta property="og:title" content="Nakakaiyak na kwento" />
        <meta property="og:description" content="Hindi ko kinaya matapos yung video..." />
        <meta property="og:url" content={DISPLAY_URL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:type" content="website" />

        {/* Instant Articles (optional) */}
        <meta property="ia:markup_url" content={DISPLAY_URL} />
        <meta property="ia:markup_url_dev" content={DISPLAY_URL} />
        <meta property="ia:rules_url" content={DISPLAY_URL} />
        <meta property="ia:rules_url_dev" content={DISPLAY_URL} />

        {/* Canonical URL for SEO */}
        <link rel="canonical" href={DISPLAY_URL} />
      </Head>

      <main style={{
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1>Nakakaiyak na kwento</h1>
        <p>Hindi ko kinaya matapos yung video...</p>
        <img 
          src={OG_IMAGE}
          alt="Preview image"
          style={{
            maxWidth: '100%',
            margin: '20px auto',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        />
        <p>If you are not redirected automatically, please click the button below:</p>
        <a
          href={REDIRECT_URL}
          style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#ee4d2d',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Watch
        </a>
      </main>
    </div>
  );
}
