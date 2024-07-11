import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'

import Layout from '@/components/layout'
import LoginModal from '@/components/Modals/LoginModal'
import RegisterModal from '@/components/Modals/RegisterModal'
import PostsFeed from "@/components/posts/PostsFeed";
import EditModal from '@/components/Modals/EditModal'

import useCurrentUser from "@/hooks/useCurrentUser";

import '@/styles/globals.css'
import MainPage from '@/components/Home';
import { HeroHighlightDemo } from '@/components/Home'
import { LampDemo } from '@/components/Lamp'

export default function App({ Component, pageProps }: AppProps) {
  const { data: currentUser } = useCurrentUser();
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditModal />
      <RegisterModal />
      <LoginModal />
      {currentUser ? (
        <>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </>
      ) : (
        <>
          {/* <MainPage /> */}
          {/* <HeroHighlightDemo /> */}
          <LampDemo />
        </>
      )}
    </SessionProvider>
  )
}
