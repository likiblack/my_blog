import React from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Share from "../components/share";
import Subscribe from "../components/subscribeForm";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { site, markdownRemark } = data; // data.markdownRemark holds your post data
  const { siteMetadata } = site;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      <Helmet>
        <title>
          {frontmatter.title} | {siteMetadata.title}
        </title>
        <meta name="description" content={frontmatter.metaDescription} />

        <meta property="og:url" content={`${siteMetadata.url}${frontmatter.path}`}/>
        <meta property="og:title" content={`${siteMetadata.title} | ${frontmatter.title}`}/>
        <meta property="og:image" content={frontmatter.thumbnail}/>

        <meta name="twitter:card" content={frontmatter.thumbnail}/>
        <meta name="twitter:title" content={`${siteMetadata.title} | ${frontmatter.title}`}/>
        <meta name="twitter:image" content={frontmatter.thumbnail}/>
      </Helmet>
      <div>
        <Link className="back button -primary" to="/">&larr;</Link>
      </div>
      <div className="blog-post-container">
        <article className="post">
          {!frontmatter.thumbnail && (
            <div className="post-thumbnail">
              <h1 className="post-title">{frontmatter.title}</h1>
              <div className="post-meta">{frontmatter.date}</div>
              <div className="post-meta">{frontmatter.tags}</div>
            </div>
          )}
          {!!frontmatter.thumbnail && (
            <div
              className="post-thumbnail"
              style={{ backgroundImage: `url(${frontmatter.thumbnail})` }}
            >
              <h1 className="post-title">{frontmatter.title}</h1>
              <div className="post-meta">{frontmatter.date}</div>
            </div>
          )}
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div className="tags">
            {frontmatter.tags.map((tag, i) => [
              <strong className="button -primary" key={i}>
                #{tag}
                {i < frontmatter.tags.length - 1 ? "" : ""}
              </strong>,
            ])}
          </div>
          <Share twitterHandle={siteMetadata.twitterHandle} url={`${siteMetadata.url}${frontmatter.path}`} title={frontmatter.title} tags={frontmatter.tags} />
          <Subscribe />
        </article>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    site {
      siteMetadata {
        title
        url
        twitterHandle
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
        thumbnail
        metaDescription
      }
    }
  }
`;
