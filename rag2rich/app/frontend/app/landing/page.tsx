"use client";  //will cause issues if this isn't added in regards to framer motion
import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { riseWithFade, staggerChildren, videoAnimation, wordAnimation } from "../utils/animations";
//import './video2.mp4'

const Home: NextPage = () => {
  return (
    <motion.div className="min-h-screen px-12 bg-[#ede8e6]" initial="initial" animate="animate">
      <Head>
        <title>Home | Second Insight</title>
        <link rel="icon" href="/Users/ayandas/Desktop/VS_Code_Projects/ivyhacks-backend/rag2rich/app/frontend/app/assets/favicon.ico" />
      </Head>
      <Navbar />
    <main className="grid grid-cols-[3fr_1fr] py-10">
      <h1 className="text-8xl font-bold w-[40rem] leading-[90%] tracking-[-2px] self-end">
        <AnimatedWords title="An innovative AI stock advisor" />
        </h1>
      {/* <motion.div className="text-base leading-[150%]" variants={riseWithFade}>
        Unlock the power of artificial intelligence to make informed investment decisions. With Second Insight, you can access real-time market data, receive personalized investment recommendations, track your portfolio performance, and extend your knowledge to stay ahead of the market trends. Start your journey to financial success today!
        </motion.div> */}
    </main>
    <motion.video loop={true} autoPlay={true} muted={true} playsInline={true} variants={videoAnimation}>
        <source src="https://artlist.io/stock-footage/clip/finance-stock-market-data-charts/572385" type="video/mp4"/>
    </motion.video>
<footer className="flex justify-center text-sm text-zinc-400 py-12">
    <p>&copy; 2022 Second Insight. All rights reserved.</p>
</footer>
</motion.div>

  );
}; 

type AnimatedWordsProps = {
  title: string;
};

const AnimatedWords : React.FC<AnimatedWordsProps> = ({title}) => {
    return (
        <motion.span variants={staggerChildren}>
            {title.split(" ").map((word, idx) => (
                <div key={idx} className="inline-block overflow-hidden">
                    <motion.span className="inline-block overflow-hidden" variants={wordAnimation}>{word + "\u00A0"}</motion.span>
                </div>
            ))}
        </motion.span>
    )
}
export default Home;