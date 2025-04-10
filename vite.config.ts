import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: 'Warcraftlogs Extra Links',
        description: "Adds links to Wipefest.gg and WoWAnalyzer to the header of log",
        icon: 'https://assets.rpglogs.com/img/warcraft/favicon.png',
        namespace: 'warcraft-logs-links',
        match: ['https://www.warcraftlogs.com/*'],
      },
    }),
  ],
});
