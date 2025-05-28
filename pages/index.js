// pages/index.js - Replace your current index.js with this
import Head from 'next/head';
import { useEffect, useState } from 'react';

// Server-side function that runs before the page loads
export async function getServerSideProps(context) {
  const userAgent = context.req.headers['user-agent'] || '';
  const isFacebookBot = userAgent.includes('facebookexternalhit') || 
                       userAgent.includes('Facebot') || 
                       userAgent.includes('WhatsApp') ||
                       userAgent.includes('Telegram') ||
                       userAgent.includes('Discord');

  // Configuration
  const REDIRECT_URL = process.env.REDIRECT_URL || 'https://s.shopee.ph/1B9AldpcQb';
  
  // If it's NOT a social media bot, redirect immediately
  if (!isFacebookBot) {
    return {
      redirect: {
        destination: REDIRECT_URL,
        permanent: false,
      },
    };
  }

  // If it IS a bot, show the page with OG meta tags
  return { 
    props: {
      isFacebookBot: true,
      redirectUrl: REDIRECT_URL
    } 
  };
}

export default function Home({ isFacebookBot, redirectUrl }) {
  const [userAgent, setUserAgent] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  
  // Configuration
  const DISPLAY_URL = "https://www.o.o/";
  const OG_IMAGE = process.env.NEXT_PUBLIC_OG_IMAGE || "https://i.imgur.com/ZMPRJsx.png";
  const REDIRECT_URL = redirectUrl || "https://s.shopee.ph/1B9AldpcQb";

  useEffect(() => {
    // This only runs on the client side
    const ua = navigator.userAgent || '';
    setUserAgent(ua);
    
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    setIsMobile(isAndroid || isIOS);
    
    // If this is a real user (not a bot), attempt redirect
    if (!isFacebookBot) {
      if (isAndroid || isIOS) {
        handleAppRedirect(isAndroid, isIOS);
      } else {
        // Desktop redirect after short delay
        setTimeout(() => {
          window.location.href = REDIRECT_URL;
        }, 2000);
      }
    }
  }, [isFacebookBot, REDIRECT_URL]);

  const handleAppRedirect = (isAndroid, isIOS) => {
    try {
      const productId = REDIRECT_URL.split('/').pop();
      const shopeeAppUrl = isAndroid
        ? `shopee://shopeetabsv2/productdetail?${productId}`
        : `shopee://productdetail?${productId}`;
      
      // Try to open the app
      window.location.href = shopeeAppUrl;
      
      // Fallback to web URL after 1 second
      setTimeout(() => {
        window.location.href = REDIRECT_URL;
      }, 1000);
    } catch (error) {
      window.location.href = REDIRECT_URL;
    }
  };

  const handleManualRedirect = () => {
    if (isMobile) {
      const isAndroid = /Android/i.test(userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
      handleAppRedirect(isAndroid, isIOS);
    } else {
      window.location.href = REDIRECT_URL;
    }
  };

  return (
    <div>
      <Head>
        {/* Primary Meta Tags */}
        <title>Nakakaiyak na kwento | www.o.o</title>
        <meta name="title" content="Nakakaiyak na kwento" />
        <meta name="description" content="Hindi ko kinaya matapos yung video..." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={DISPLAY_URL} />
        <meta property="og:title" content="Nakakaiyak na kwento" />
        <meta property="og:description" content="Hindi ko kinaya matapos yung video..." />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="www.o.o" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={DISPLAY_URL} />
        <meta property="twitter:title" content="Nakakaiyak na kwento" />
        <meta property="twitter:description" content="Hindi ko kinaya matapos yung video..." />
        <meta property="twitter:image" content={OG_IMAGE} />
        
        {/* WhatsApp specific */}
        <meta property="og:image:type" content="image/jpeg" />
        
        {/* Instant Articles (Facebook) */}
        <meta property="ia:markup_url" content={DISPLAY_URL} />
        <meta property="ia:markup_url_dev" content={DISPLAY_URL} />
        <meta property="ia:rules_url" content={DISPLAY_URL} />
        <meta property="ia:rules_url_dev" content={DISPLAY_URL} />
        
        {/* Canonical URL for SEO */}
        <link rel="canonical" href={DISPLAY_URL} />
      </Head>

      <main style={{
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          width: '100%',
          padding: '30px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '16px'
          }}>
            Nakakaiyak na kwento
          </h1>
          
          <p style={{
            color: '#666',
            marginBottom: '24px',
            fontSize: '16px'
          }}>
            Hindi ko kinaya matapos yung video...
          </p>
          
          <div style={{ marginBottom: '24px' }}>
            <img 
              src={OG_IMAGE}
              alt="Preview image"
              style={{
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x200/ee4d2d/white?text=Video+Preview';
              }}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <p style={{
              fontSize: '14px',
              color: '#888',
              marginBottom: '16px'
            }}>
              {isMobile 
                ? "Redirecting to Shopee app..." 
                : "Redirecting automatically..."}
            </p>
            
            <button
              onClick={handleManualRedirect}
              style={{
                width: '100%',
                backgroundColor: '#ee4d2d',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '12px'
              }}
            >
              {isMobile ? "Open in Shopee App" : "Watch Now"}
            </button>
            
            <a
              href={REDIRECT_URL}
              style={{
                display: 'block',
                fontSize: '14px',
                color: '#007bff',
                textDecoration: 'underline'
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Or open in browser
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
