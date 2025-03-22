module.exports = async (kernel) => {
  let cmd = "uv pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 --index-url https://download.pytorch.org/whl/cpu"
  if (kernel.platform === 'darwin') {
    if (kernel.arch === "arm64") {
      cmd = "uv pip install torch torchaudio torchvision"
    } else {
      cmd = "uv pip install torch==2.1.2 torchaudio==2.1.2"
    }
  } else {
    if (kernel.gpu === 'nvidia') {
      if (kernel.gpu_model && / 50.+/.test(kernel.gpu_model)) {
        cmd = "uv pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu128"
      } else {
        cmd = "uv pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 xformers --index-url https://download.pytorch.org/whl/cu124"
      }
    } else if (kernel.gpu === 'amd') {
      cmd = "uv pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 --index-url https://download.pytorch.org/whl/rocm6.2"
    } 
  }
//module.exports = async (kernel) => {
  let cmds
  if (kernel.gpu === 'nvidia') {
    cmds = [
      //"uv pip install huggingface_hub==0.25.2",
      "uv pip install huggingface_hub==0.20.2",
      "uv pip install streamdiffusion[tensorrt]@git+https://github.com/pinokiofactory/StreamDiffusion.git@main",
      "python -m streamdiffusion.tools.install-tensorrt"
    ]
  } else {
    cmds = [
      //"uv pip install huggingface_hub==0.25.2",
      "uv pip install huggingface_hub==0.20.2",
      "uv pip install -e .",
    ]
  }
  return {
//    "cmds": {
//      "nvidia": "pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 xformers --index-url https://download.pytorch.org/whl/cu118",
//      "amd": "pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 --index-url https://download.pytorch.org/whl/rocm6.0",
//      "default": "pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 --index-url https://download.pytorch.org/whl/cpu"
//    },
    "run": [{
      "method": "shell.run",
      "params": {
        "message": "git clone https://github.com/pinokiofactory/StreamDiffusion.git app",
      }
    }, {
      "method": "shell.run",
      "params": {
        "path": "app",
        "venv": "env",
        "message": [
          cmd,
//          "{{(gpu === 'nvidia' ? self.cmds.nvidia : (gpu === 'amd' ? self.cmds.amd : self.cmds.default))}}"
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
        "message": "uv pip install -r requirements.txt",
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
        "message": "uv pip install -r requirements.txt",
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
        "message": "uv pip install -r requirements.txt",
        "path": "app/examples/screen"
      }
    },
    // demo/vid2vid
    {
      "method": "shell.run",
      "params": {
        "venv": "../../env",
        "message": "uv pip install -r requirements.txt",
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
