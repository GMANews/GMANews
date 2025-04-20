import Head from 'nexthead'

export async function getServerSideProps(context) {
  const userAgent = context.req.headers['user-agent']  '';
  const isFacebookBot = userAgent.includes('facebookexternalhit')  userAgent.includes('Facebot');
  
  if (!isFacebookBot) {
    return {
      redirect {
        destination process.env.REDIRECT_URL  'httpss.shopee.ph5VHwwQes4L',
        permanent false,
      },
    };
  }
  
  return { props {} };
}

export default function Home() {
  return (
    div
      Head
        titleNakakaiyak na kwentotitle
        meta property=ogtitle content={process.env.OG_TITLE  Nakakaiyak na kwento} 
        meta property=ogdescription content={process.env.OG_DESCRIPTION  Hindi ko kinaya matapos yung video...} 
        meta property=ogimage content={process.env.OG_IMAGE  httpsi.imgur.comZMPRJsx.png} 
        meta property=ogtype content=website 
      Head
      main style={{ 
        fontFamily 'Arial, sans-serif',
        textAlign 'center',
        maxWidth '600px',
        margin '50px auto',
        padding '20px',
        backgroundColor 'white',
        borderRadius '8px',
        boxShadow '0 2px 10px rgba(0,0,0,0.1)'
      }}
        h1Nakakaiyak na kwentoh1
        pHindi ko kinaya matapos yung video...p
        img 
          src={process.env.OG_IMAGE  httpsi.imgur.comZMPRJsx.png} 
          alt=Preview image 
          style={{
            maxWidth '100%',
            margin '20px auto',
            borderRadius '8px',
            boxShadow '0 2px 5px rgba(0,0,0,0.1)'
          }}
        
        pIf you are not redirected automatically, please click the button belowp
        a 
          href={process.env.REDIRECT_URL  httpss.shopee.ph5VHwwQes4L} 
          style={{
            display 'inline-block',
            marginTop '20px',
            padding '10px 20px',
            backgroundColor '#ee4d2d',
            color 'white',
            textDecoration 'none',
            borderRadius '4px',
            fontWeight 'bold'
          }}
        
          Watch
        a
      main
    div
  );
}
