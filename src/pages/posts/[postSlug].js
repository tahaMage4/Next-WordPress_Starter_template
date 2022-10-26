import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import { getApolloClient } from "lib/apollo-client";
import parse from "html-react-parser";

import styles from "../../styles/Home.module.css";

export default function Post({ post, site, video }) {
  const { seo } = post;

  const yoastHead = parse(seo.fullHead);

  console.log("post", post, video);
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

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      query PostBySlug($slug: String!) {
        generalSettings {
          title
        }
        postBy(slug: $slug) {
          id
          content
          title
          slug
          video {
            videoSource
            videoUrl
          }
          seo {
            metaDesc
            title
            fullHead
          }
        }
      }
    `,
    variables: {
      slug: postSlug,
    },
  });

  const post = data?.data.postBy;

  if (!post) {
    return {
      props: {},
      notFound: true,
    };
  }

  const site = {
    ...data?.data.generalSettings,
  };

  let oembed;

  if (post.video) {
    if (post.video.videoSource === "YouTube") {
      oembed = await fetch(
        "https://youtube.com/oembed?url=${post.video.videoUrl}"
      );
      oembed = await oembed.json();
    }
  }

  return {
    props: {
      post,
      site,
      video: {
        ...post.video,
        oembed,
      },
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
