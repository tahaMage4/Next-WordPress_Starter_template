import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";

import { getApolloClient } from "lib/apollo-client";

import styles from "../styles/Home.module.css";
import Layout from "Compontent/Layout";

export default function Home({ page, posts }) {
  const { title, description } = page;
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>{title}</h1>

          <p className={styles.description}>{description}</p>

          <ul className={styles.grid}>
            {posts &&
              posts.length > 0 &&
              posts.map((post) => {
                return (
                  <li key={post.slug} className={styles.card}>
                    <Link href={post.path}>
                      <a>
                        <h3
                          dangerouslySetInnerHTML={{
                            __html: post.title,
                          }}
                        />
                      </a>
                    </Link>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt,
                      }}
                    />
                  </li>
                );
              })}

            {!posts ||
              (posts.length === 0 && (
                <li>
                  <p>Oops, no posts found!</p>
                </li>
              ))}
          </ul>
        </main>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const client = getApolloClient();

  const data = await client.query({
    query: gql`
      {
        generalSettings {
          title
          description
        }
        posts(first: 6) {
          edges {
            node {
              id
              excerpt
              title
              slug
              seo {
                metaDesc
                fullHead
              }
            }
          }
        }
      }
    `,
  });

  const posts = data?.data.posts.edges
    .map(({ node }) => node)
    .map((post) => {
      return {
        ...post,
        path: `/posts/${post.slug}`,
      };
    });

  const page = {
    ...data?.data.generalSettings,
  };

  return {
    props: {
      page,
      posts,
    },
  };
}
