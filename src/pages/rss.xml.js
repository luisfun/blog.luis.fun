import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts'

export async function GET(context) {
  const posts = await getCollection('post')
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.created,
      description: post.data.description,
      //customData: post.data.customData,
      link: `/${post.id}/`,
    })),
  })
}
