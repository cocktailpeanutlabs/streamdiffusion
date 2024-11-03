const path = require('path')
module.exports = {
  version: "2.0",
  title: "StreamDiffusion",
  description: "[NVIDIA ONLY] A Pipeline-Level Solution for Real-Time Interactive Generation https://github.com/cumulo-autumn/StreamDiffusion",
  icon: "icon.png",
  menu: async (kernel) => {
    let installing = await kernel.running(__dirname, "install.js")
    let installed = await kernel.exists(__dirname, "app", "env")
    let running = await kernel.running(__dirname, "start.js")
    if (installing) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running) {
        let local = kernel.memory.local[path.resolve(__dirname, "start.js")]
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        } else {
          return [{
            default: true,
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        }
      } else {
        return [{
          icon: "fa-solid fa-power-off",
          text: "Start",
          menu: [{
            icon: "fa-solid fa-power-off",
            text: "Txt2Img",
            href: "start.js",
            params: {
              type: "txt2img"
            }
          }, {
            icon: "fa-solid fa-power-off",
            text: "Img2Img",
            href: "start.js",
            params: {
              type: "img2img"
            }
          }, {
            icon: "fa-solid fa-power-off",
            text: "Screen",
            href: "start.js",
            params: {
              type: "screen"
            }
          }, {
            icon: "fa-solid fa-power-off",
            text: "Vid2Vid",
            href: "start.js",
            params: {
              type: "vid2vid"
            }
          }, {
            icon: "fa-solid fa-power-off",
            text: "Benchmark",
            href: "start.js",
            params: {
              type: "benchmark"
            }
          }, {
            icon: "fa-solid fa-power-off",
            text: "Optimal Benchmark",
            href: "start.js",
            params: {
              type: "optimal"
            }
          }]
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-solid fa-broom",
          text: "Factory Reset",
          href: "reset.js",
        }]
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
