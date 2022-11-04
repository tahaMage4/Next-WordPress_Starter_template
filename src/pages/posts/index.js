import { gql } from "@apollo/client";
import Layout from "Compontent/Layout";
import { getApolloClient } from "lib/apollo-client";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import parse from "html-react-parser";
import styles from "../../styles/Home.module.css";

const Posts = ({ Posts }) => {
  const { seo } = Posts;

  // const yoastHead = parse(seo.fullHead);
  return (
    <Layout>
      {/* <Head>{yoastHead}</Head> */}

      {Posts.map((post) => {
        return (
          <div key={post.slug}>
            <li className={styles.card}>
              <Link href="#">
                <a>
                  <h3
                    dangerouslySetInnerHTML={{
                      __html: post.title,
                    }}
                  />
                  <span>Create at {post.date} </span>
                </a>
              </Link>
              <div
                dangerouslySetInnerHTML={{
                  __html: post.excerpt,
                }}
              />
            </li>
          </div>
        );
      })}
    </Layout>
  );
};

export default Posts;

export async function getStaticProps() {
  const client = getApolloClient();

  const data = await client.query({
    query: gql`
      query PostsPage {
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

  const Posts = data.data.posts.edges
    .map(({ node }) => node)
    .map((post) => {
      return {
        ...post,
      };
    });
  console.log(Posts);

  return {
    props: {
      Posts,
    },
  };
}
