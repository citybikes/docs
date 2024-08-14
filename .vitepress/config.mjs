import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Citybikes Docs",
  description: "Citybikes documentation project",
  cleanUrls: true,
  themeConfig: {
    logo: "/logo.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Citybikes', link: 'https://citybik.es' },
    ],

    sidebar: [
      {
        text: 'API documentation',
        link: '/',
        items: [
            { text: 'Terms of Service', link: '/tos' },
        ],
      },
      {
        text: 'pybikes',
        items: [
          { text: 'Getting Started', link: '/pybikes' },
          { text: 'Test reports', link: '/pybikes/test-reports' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      { icon: 'twitter', link: 'https://twitter.com/ctbikes' }
    ],
    search: {
      provider: "local",
    },
  }
})
