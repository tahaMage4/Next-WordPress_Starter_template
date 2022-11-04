import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import { getApolloClient } from "lib/apollo-client";
import parse from "html-react-parser";

import styles from "../../styles/Home.module.css";

export default function Post({ post, site, video }) {
  const { seo } = post;

  const yoastHead = parse(seo.fullHead);

  return (
    <div className={styles.container}>
      <Head>
        {yoastHead}
        {/* <title>{seo.title}</title>
        <meta name="description" content={seo.metaDesc} />
        <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.grid}>
          {video?.oembed && (
            <div
              className={styles.video}
              dangerouslySetInnerHTML={{
                __html: video.oembed.html,
              }}
            />
          )}
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </div>

        <p className={styles.backToHome}>
          <Link href="/">
            <a>&lt; Back to home</a>
          </Link>
        </p>
      </main>
    </div>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { postSlug } = params;

  const client = getApolloClient();

  const data = await client.query({
    query: gql`
      query PagetBySlug($slug: String) {
        generalSettings {
          title
        }
      }
    `,
    variables: {
      slug: postSlug,
    },
  });

  console.log(data);

  return {
    props: {},
  };
}

export async function getStaticPaths() {
  const client = getApolloClient();

  const data = await client.query({
    query: gql`
    query PostsPage(){
      posts {
      edges {
      node {
        id
        title
        date
        seo {
          metaDesc
          fullHead
          metaKeywords
        }
        video {
          videoSource
          videoUrl
        }
      }
    }
  }
    }
    `,
  });
  const paths = data.data.posts.edges;

  return {
    paths,
    fallback: false,
  };
}
