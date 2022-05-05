import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
// import Auth from "../components/Auth";
// import Account from "../components/Account";
import prisma from "../lib/prisma";

const Home: NextPage = ({ feed }) => {
  return <>{feed.length}</>;
  // const [session, setSession] = useState(null);

  // useEffect(() => {
  //   setSession(supabase.auth.session());

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);

  // return (
  //   <div className="container" style={{ padding: "50px 0 100px 0" }}>
  //     {!session ? (
  //       <Auth />
  //     ) : (
  //       <Account key={session.user.id} session={session} />
  //     )}
  //   </div>
  // );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  console.log("feed", feed);
  return {
    props: { feed },
  };
};

export default Home;
