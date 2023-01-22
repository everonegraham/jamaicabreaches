import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import Head from "next/head";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { NextSeo } from "next-seo";

export const getStaticProps = async () => {
  const files = fs.readdirSync('./_docs')
  // const { data } = matter(markdownFile)
  // return { props: { targets: data?.[0].targets } }
  const frontmatterData = files.map(file => {
    const filePath = path.join('./_docs', file)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)
    return data
  })
  return { props: { frontmatterData } }
}

export default function Home(props) {
  return (
    <div className="text-black bg-black flex flex-col min-h-screen">
      <NextSeo
        title="Jamaica Breaches"
        description="Recording security breaches, data leaks, hacks and scams taking place in Jamaica."
        canonical="https://jamaicabreaches.com/"
        openGraph={{
          url: "https://jamaicabreaches.com/",
        }}
      />
      <Head>
        <title>Jamaica Breaches</title>
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <Header />
      <Main {...props}/>
      <Footer />
    </div>
  );
}


