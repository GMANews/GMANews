import Head from 'next/head';

export default function Home({ ogImage }) {
  return (
    <>
      <Head>
        <title>Nakakaiyak na Kwento</title>
        <meta property="og:title" content="Nakakaiyak na Kwento" />
        <meta property="og:image" content={ogImage} />
      </Head>
    </>
  );
}

export async function getServerSideProps(context) {
  const userAgent = context.req.headers['user-agent'] || '';
  const isFacebookBot =
    userAgent.includes('facebookexternalhit') ||
    userAgent.includes('Facebot') ||
    userAgent.includes('WhatsApp') ||
    userAgent.includes('Telegram') ||
    userAgent.includes('Discord') ||
    userAgent.includes('Twitterbot');

  const REDIRECT_URL = process.env.REDIRECT_URL;
  const ogImage = process.env.NEXT_PUBLIC_OG_IMAGE;

  if (!isFacebookBot) {
    return {
      redirect: {
        destination: REDIRECT_URL,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ogImage,
    },
  };
}
