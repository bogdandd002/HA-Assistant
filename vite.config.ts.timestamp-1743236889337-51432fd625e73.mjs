// vite.config.ts
import react from "file:///C:/Users/Bogdan/Dropbox/React%20dashboard/HS-Assistant/HA-Assistant/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/Bogdan/Dropbox/React%20dashboard/HS-Assistant/HA-Assistant/node_modules/vite/dist/node/index.js";
import { NodeGlobalsPolyfillPlugin } from "file:///C:/Users/Bogdan/Dropbox/React%20dashboard/HS-Assistant/HA-Assistant/node_modules/@esbuild-plugins/node-globals-polyfill/dist/index.js";
import { NodeModulesPolyfillPlugin } from "file:///C:/Users/Bogdan/Dropbox/React%20dashboard/HS-Assistant/HA-Assistant/node_modules/@esbuild-plugins/node-modules-polyfill/dist/index.js";
import rollupNodePolyFill from "file:///C:/Users/Bogdan/Dropbox/React%20dashboard/HS-Assistant/HA-Assistant/node_modules/rollup-plugin-polyfill-node/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis"
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxCb2dkYW5cXFxcRHJvcGJveFxcXFxSZWFjdCBkYXNoYm9hcmRcXFxcSFMtQXNzaXN0YW50XFxcXEhBLUFzc2lzdGFudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQm9nZGFuXFxcXERyb3Bib3hcXFxcUmVhY3QgZGFzaGJvYXJkXFxcXEhTLUFzc2lzdGFudFxcXFxIQS1Bc3Npc3RhbnRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0JvZ2Rhbi9Ecm9wYm94L1JlYWN0JTIwZGFzaGJvYXJkL0hTLUFzc2lzdGFudC9IQS1Bc3Npc3RhbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcblxyXG5pbXBvcnQgeyBOb2RlR2xvYmFsc1BvbHlmaWxsUGx1Z2luIH0gZnJvbSBcIkBlc2J1aWxkLXBsdWdpbnMvbm9kZS1nbG9iYWxzLXBvbHlmaWxsXCI7XHJcbmltcG9ydCB7IE5vZGVNb2R1bGVzUG9seWZpbGxQbHVnaW4gfSBmcm9tIFwiQGVzYnVpbGQtcGx1Z2lucy9ub2RlLW1vZHVsZXMtcG9seWZpbGxcIjtcclxuaW1wb3J0IHJvbGx1cE5vZGVQb2x5RmlsbCBmcm9tIFwicm9sbHVwLXBsdWdpbi1wb2x5ZmlsbC1ub2RlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICBvcHRpbWl6ZURlcHM6IHtcclxuICAgIGVzYnVpbGRPcHRpb25zOiB7XHJcbiAgICAgIC8vIE5vZGUuanMgZ2xvYmFsIHRvIGJyb3dzZXIgZ2xvYmFsVGhpc1xyXG4gICAgICBkZWZpbmU6IHtcclxuICAgICAgICBnbG9iYWw6IFwiZ2xvYmFsVGhpc1wiLFxyXG4gICAgICB9LFxyXG4gICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgTm9kZUdsb2JhbHNQb2x5ZmlsbFBsdWdpbih7XHJcbiAgICAgICAgICBidWZmZXI6IHRydWUsXHJcbiAgICAgICAgICBwcm9jZXNzOiB0cnVlLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIE5vZGVNb2R1bGVzUG9seWZpbGxQbHVnaW4oKSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBwbHVnaW5zOiBbcm9sbHVwTm9kZVBvbHlGaWxsKCldLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVksT0FBTyxXQUFXO0FBQ3ZaLFNBQVMsb0JBQW9CO0FBRTdCLFNBQVMsaUNBQWlDO0FBQzFDLFNBQVMsaUNBQWlDO0FBQzFDLE9BQU8sd0JBQXdCO0FBRS9CLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixjQUFjO0FBQUEsSUFDWixnQkFBZ0I7QUFBQTtBQUFBLE1BRWQsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLE1BQ1Y7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLDBCQUEwQjtBQUFBLFVBQ3hCLFFBQVE7QUFBQSxVQUNSLFNBQVM7QUFBQSxRQUNYLENBQUM7QUFBQSxRQUNELDBCQUEwQjtBQUFBLE1BQzVCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQztBQUFBLElBQ2hDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
