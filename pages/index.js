import Head from 'next/head'

export async function getServerSideProps(context) {
  const userAgent = context.req.headers['user-agent'] || '';
  const isFacebookBot = userAgent.includes('facebookexternalhit') || userAgent.includes('Facebot');
  
  if (!isFacebookBot) {
    return {
      redirect: {
        destination: process.env.REDIRECT_URL || 'https://s.shopee.ph/5VHwwQes4L',
        permanent: false,
      },
    };
  }
  
  return { props: {} };
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nakakaiyak na kwento</title>
        <meta property="og:title" content={process.env.OG_TITLE || "Nakakaiyak na kwento"} />
        <meta property="og:description" content={process.env.OG_DESCRIPTION || "Hindi ko kinaya matapos yung video..."} />
        <meta property="og:image" content={process.env.OG_IMAGE || "https://i.imgur.com/ZMPRJsx.png"} />
        <meta property="og:type" content="website" />
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
          src={process.env.OG_IMAGE || "https://i.imgur.com/ZMPRJsx.png"} 
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
          href={process.env.REDIRECT_URL || "https://s.shopee.ph/5VHwwQes4L"} 
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
