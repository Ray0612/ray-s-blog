---
title: 从零搭建 Claude Code（国内可用方案）
date: 2026-05-14
categories: 教程分享
---

## 环境要求

- macOS 13.0+ / Windows 10 1809+ / Ubuntu 20.04+
- 内存 4GB+
- 终端 Bash / Zsh / PowerShell

---

## 安装方式

### 方式一：官方安装

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### 方式二：国内镜像（推荐）

如果官方方式在你的地区不可用，使用 daheiai.com 提供的镜像：

**macOS / Linux：**

```bash
curl -fsSL https://daheiai.com/install.sh | bash
```

**Windows PowerShell：**

```powershell
irm https://daheiai.com/cc.ps1 | iex
```

---

## 安装后设置

### 添加 PATH

如果安装后找不到 `claude` 命令：

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### 验证安装

```bash
claude --version
```

---

## 配置 API（关键）

由于官方 Claude API 在国内直接使用受限，需要通过兼容接口。创建 `~/.claude.json` 配置文件：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "你的代理地址",
    "ANTHROPIC_AUTH_TOKEN": "你的API Key",
    "ANTHROPIC_MODEL": "claude-sonnet-4-7"
  }
}
```

如果结合 cc-switch 使用，可以在 cc-switch 中配置自定义供应商，指向本地翻译代理或直连 Worker。

---

## 常用命令

```bash
claude              # 启动交互式对话
claude -p "问题"    # 直接提问
claude --help       # 查看帮助
```

---

## 注意事项

1. 首次使用需要授权终端访问权限
2. macOS 可能需要授予 Accessibility 权限
3. 国内网络环境建议使用镜像脚本安装 + 自定义 API 代理
4. 建议搭配 cc-switch 使用，方便在不同模型间切换
