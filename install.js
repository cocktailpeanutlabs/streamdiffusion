module.exports = {
  "cmds": {
    "nvidia": "pip install torch torchvision torchaudio xformers --index-url https://download.pytorch.org/whl/cu118",
    "amd": "pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm5.6",
    "default": "pip3 install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cpu"
  },
  "requires": [{
    "type": "conda",
    "name": "ffmpeg",
    "args": "-c conda-forge"
  }, {
    "gpu": "nvidia",
    "name": "cuda"
  }],
  "run": [{
    "method": "shell.run",
    "params": {
      "message": "git clone https://github.com/cocktailpeanut/StreamDiffusion.git app",
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
      "message": [
          "pip install git+https://github.com/cocktailpeanut/StreamDiffusion.git@main#egg=streamdiffusion[tensorrt]",,
          "python -m streamdiffusion.tools.install-tensorrt"
      ]
    }
  },
  // demo/txt2img
  {
    "method": "shell.run",
    "params": {
      "venv": "../../env",
      "message": "pip install -r requirements.txt",
      "path": "app/demo/realtime-txt2img"
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
    "method": "notify",
    "params": {
      "html": "Click the 'start' tab to get started!"
    }
  }]
}
