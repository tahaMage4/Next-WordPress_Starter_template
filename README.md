# Next.js WPGraphQL Basic Starter

## ⚡️ Quick Start

### Requirements
* [WordPress](https://wordpress.org/)
* [WPGraphQL](https://www.wpgraphql.com/)
* [Yoast SEO](https://yoast.com/wordpress/plugins/seo/?gclid=EAIaIQobChMI6eLI_Lf--gIV25BoCR1gmw70EAAYASAAEgK14_D_BwE)
* [Add WPGraphQL SEO](https://www.wpgraphql.com/extenstion-plugins/wpgraphql-for-yoast-seo)

```bash
yarn create next-app -e https://github.com/tahaMage4/Next-WordPress_Starter_template.git
# or
npx create-next-app -e https://github.com/tahaMage4/Next-WordPress_Starter_template.git
```

Add an `.env.local` file to the root with the following:
```
WORDPRESS_GRAPHQL_ENDPOINT="http://yourhost.com/graphql"
```
