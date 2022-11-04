import { gql } from "@apollo/client";
import { getApolloClient } from "lib/apollo-client";
import React from "react";

const Page = () => {
  return <div>Page</div>;
};

export default Page;

export async function getStaticProps({ params }) {
  const client = getApolloClient();

  const data = await client.query({
    query: gql`
      query PageBySlug($slug: String) {
        pageBy(slug: $slug) {
          generalSettings {
            title
          }
          date
          id
          slug
          title
          uri
          seo {
            metaDesc
            title
            fullHead
          }
        }
      }
    `,
    variables: {
      slug: params.pageSlug,
    },
  });
  const page = data.data.pageBy;

  return {
    props: {
      page,
    },
  };
}

export async function getStaticPaths() {
  const client = getApolloClient();

  const data = await client.query({
    query: gql`
      query Pages {
        pages {
          edges {
            node {
              id
              title
              date
              slug
              uri
              seo {
                fullHead
                metaDesc
                metaKeywords
              }
            }
          }
        }
      }
    `,
  });

  const paths = data.data.pages.edges
    .map(({ node }) => node)
    .map((page) => {
      return {
        ...page,
        params: { pageSlug: page.slug },
      };
    });
  console.log(paths);

  return {
    paths,
    fallback: false,
  };
}
