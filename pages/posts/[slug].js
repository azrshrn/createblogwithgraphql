import { GraphQLClient, gql } from "graphql-request";
import styles from "../../styles/Slug.module.css";

const graphcms = new GraphQLClient(
  "https://api-ap-northeast-1.hygraph.com/v2/cl80rmiev0k2y01t90bd1bn00/master"
);

const QUERY = gql`
  query Post($slug : String!) {
  post(where: {slug: $slug}) {
    title
    subtitle
    coverPhoto {
      url
    }
    content {
      html
    }
    createdBy {
      name
      picture
    }
  }
}
`;
const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}


export async function getStaticProps({ params }) {
  const slug = params.slug;
  const newSlug = { slug };
  const data = await graphcms.request(QUERY, newSlug);
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 30,
  };
}

export default function BlogPost({ post }) {
  return (
    <main className={styles.blog}>

      <section className={styles.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.coverPhoto.url} alt={post.title} />
        <div className={styles.blogtitle}>
          <h2>{post.title}</h2>
          <h4>{post.subtitle}</h4>
        </div>
      </section>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      ></div>
      <footer className={styles.footer}>
        <div className={styles.div_footer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.createdBy.picture} alt={post.createdBy.name} />
          <span>{post.createdBy.name}</span>
        </div>
      </footer>
    </main>
  );
}