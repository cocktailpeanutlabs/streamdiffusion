module.exports = async (kernel) => {
  let env = {
    "HOST": "127.0.0.1",
    "MODEL": "stabilityai/sd-turbo"
  }
  if (kernel.gpu !== 'nvidia' && kernel.platform === 'darwin') {
    env.ACCELERATION = "sfast"
  }
  return {
    daemon: true,
    apps: {
      txt2img: {
        path: "app/demo/realtime-txt2img",
        cmd: "python main.py"
      },
      img2img: {
        path: "app/demo/realtime-img2img",
        cmd: "python main.py  --acceleration tensorrt"
      },
      screen: {
        path: "app/examples/screen",
        cmd: "python main.py"
      },
      vid2vid: {
        path: "app/demo/vid2vid",
        cmd: "python app.py"
      },
      benchmark: {
        path: "app/examples/benchmark",
        cmd: "python single.py --acceleration tensorrt"
      },
      optimal: {
        path: "app/examples/optimal-performance",
        cmd: "python single.py"
      }
    },
    run: [{
      "method": "shell.run",
      "params": {
        "env": env,
        "venv": "../../env",
        "path": "{{self.apps[input.type].path}}",
        "message": "{{self.apps[input.type].cmd}}",
        "on": [{ "event": "/http:\/\/[0-9.:]+/", "done": true }]
      }
    }, {
      "method": "local.set",
      "params": {
        "url": "{{input.event[0]}}"
      }
    }]
  }
}
