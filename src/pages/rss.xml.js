// @ts-check
import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts'

// @ts-expect-error
export async function GET(context) {
  const posts = await getCollection('post')
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts
      .map(post => ({
        title: post.data.title,
        link: `/${post.id}/`,
        description: post.data.description,
        pubDate: post.data.created,
        //customData: post.data.customData,
      }))
      .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()),
  })
}
