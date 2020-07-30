const CacheAsset = require('@11ty/eleventy-cache-assets');
const { format } = require('date-fns');

module.exports = async () => {
  try {
    const body = await CacheAsset(
      'https://www.instagram.com/matthewtole/?__a=1',
      {
        duration: '1d',
        type: 'json',
      }
    );
    return body.graphql.user.edge_owner_to_timeline_media.edges.map((post) => {
      return {
        link: `https://www.instagram.com/p/${post.node.shortcode}/`,
        image: post.node.display_url,
        caption: post.node.edge_media_to_caption.edges[0].node.text,
        altText: post.node.accessibility_caption,
        date: format(
          new Date(post.node.taken_at_timestamp * 1000),
          'MMMM do yyyy'
        ),
      };
    });
  } catch (ex) {
    return [];
  }
};
