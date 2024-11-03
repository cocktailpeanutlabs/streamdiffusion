module.exports = async (kernel) => {
  let cmds
  if (kernel.gpu === 'nvidia') {
    cmds = [
      "pip install huggingface_hub==0.25.2",
      "pip install 'streamdiffusion[tensorrt] @ git+https://github.com/cumulo-autumn/StreamDiffusion.git@main'",
      "python -m streamdiffusion.tools.install-tensorrt"
    ]
  } else {
    cmds = [
      "pip install huggingface_hub==0.25.2",
      "pip install -e .",
    ]
  }
  return {
    "cmds": {
      "nvidia": "pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 xformers --index-url https://download.pytorch.org/whl/cu118",
      "amd": "pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 --index-url https://download.pytorch.org/whl/rocm6.0",
      "default": "pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 --index-url https://download.pytorch.org/whl/cpu"
    },
    "run": [{
      "method": "shell.run",
      "params": {
        "message": "git clone https://github.com/cumulo-autumn/StreamDiffusion.git app",
      }
    }, {
      "method": "shell.run",
      "params": {
        "path": "app",
        "venv": "env",
        "message": [
          "{{(gpu === 'nvidia' ? self.cmds.nvidia : (gpu === 'amd' ? self.cmds.amd : self.cmds.default))}}"
        ]
      }
    }, {
      "method": "shell.run",
      "params": {
        "path": "app",
        "venv": "env",
        "message": cmds
      }
    },
    // demo/txt2img
    {
      "method": "shell.run",
      "params": {
        "path": "app/demo/realtime-txt2img",
        "venv": "../../env",
        "message": "pip install -r requirements.txt",
      }
    }, {
      "method": "shell.run",
      "params": {
        "message": [
          "npm install",
          "npm run build"
        ],
        "path": "app/demo/realtime-txt2img/frontend"
      }
    },
    // demo/img2img
    {
      "method": "shell.run",
      "params": {
        "venv": "../../env",
        "message": "pip install -r requirements.txt",
        "path": "app/demo/realtime-img2img"
      }
    }, {
      "method": "shell.run",
      "params": {
        "message": [
          "npm install",
          "npm run build"
        ],
        "path": "app/demo/realtime-img2img/frontend"
      }
    },
    // examples/screen
    {
      "method": "shell.run",
      "params": {
        "venv": "../../env",
        "message": "pip install -r requirements.txt",
        "path": "app/examples/screen"
      }
    },
    // demo/vid2vid
    {
      "method": "shell.run",
      "params": {
        "venv": "../../env",
        "message": "pip install -r requirements.txt",
        "path": "app/demo/vid2vid"
      }
    },
    {
      "method": "fs.link",
      "params": {
        "venv": "app/env"
      }
    },
    {
      "method": "notify",
      "params": {
        "html": "Click the 'start' tab to get started!"
      }
    }]
  }
}
