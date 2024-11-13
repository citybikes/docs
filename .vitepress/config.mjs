import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Citybikes Docs",
  description: "Citybikes developer documentation",
  head: [
    ['link', { rel: "icon", type: "image/png", href: "/favicon.png"}],
  ],
  cleanUrls: true,
  themeConfig: {
    logo: "/logo.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Citybikes', link: 'https://citybik.es' },
    ],

    sidebar: [
      {
        text: 'API Documentation',
        items: [
          { text: 'Using Citybikes data', link: '/api/' },
          { text: 'v2', link: '/api/v2/' },
          { text: 'gbfs', link: '/api/gbfs/' },
        ],
      },
      {
        text: 'pybikes',
        link: '/pybikes/',
        items: [
          { text: 'Contribute', link: '/pybikes/contribute' },
          { text: 'Test reports', link: '/pybikes/test-reports' },
        ],
      },
      {
        text: 'hyper',
        link: '/hyper/',
        items: [
          { text: 'Getting Started', link: '/hyper/#getting-started' },
          { text: 'Configuration', link: '/hyper/#configuration' },
          { text: 'Implementing a subscriber', link: '/hyper/#implementing-a-subscriber' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/citybikes' },
      { icon: 'mastodon', link: 'https://floss.social/@citybikes' },
    ],
    search: {
      provider: "local",
    },
  }
})
