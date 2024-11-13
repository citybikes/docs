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
          { text: 'v2', link: '/api/' },
          { text: 'gbfs', link: '/api/gbfs/' },
          { text: 'Terms of service', link: '/api/tos' },
        ],
      },
      {
        text: 'pybikes',
        items: [
          { text: 'Introduction', link: '/pybikes/' },
          { text: 'Contribute', link: 'https://github.com/eskerda/pybikes' },
          { text: 'Test reports', link: '/pybikes/test-reports' },
        ],
      },
      {
        text: 'hyper',
        items: [
          { text: 'Introduction', link: '/hyper/' },
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
