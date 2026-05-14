---
title: Claude Code 最新版安装教程
date: 2026-05-14
categories: 教程分享
---

> 面向普通用户的 Claude Code 安装与模型接入指南。  
> 内容整理自 [daheiai.com](https://daheiai.com/cc-install.html)

---

## 目录

1. 安装 Git Bash（仅 Windows）
2. 安装 Claude Code 本体
3. 配置环境变量 PATH
4. 安装 cc-switch，接入更多模型
5. Claude Code 基础使用
6. 常见问题

---

## 1. 安装 Git Bash（仅 Windows）

Claude Code 原生为 Linux / macOS 设计，Windows 系统需要装 Git 来准备环境。

- 📥 [Git for Windows（64-bit）](https://daheiai.com) — 适用于绝大多数 Windows 电脑
- 📥 [Git for Windows（ARM64）](https://daheiai.com) — 适用于 ARM 处理器的 Windows 电脑
- 备用：[Git 官网](https://git-scm.com) 下载

安装时狂点下一步即可。

> **Mac / Linux 用户跳过此步。**

---

## 2. 安装 Claude Code 本体

打开终端，粘贴命令运行：

### Windows（PowerShell）

```powershell
irm https://daheiai.com/cc.ps1 | iex
```

备用（官方原版）：

```powershell
irm https://claude.ai/install.ps1 | iex
```

### Mac / Linux

```bash
curl -fsSL https://daheiai.com/cc.sh | sh
```

备用（官方原版）：

```bash
curl -fsSL https://claude.ai/install.sh | sh
```

> 整个过程会下载 200+MB 的软件，取决于网络状态，时间可能会很长。

### 重要声明

本页面提供的安装脚本用于自动化安装流程。所有二进制文件均由用户电脑直接从 Anthropic 官方 Google Cloud Storage 存储桶下载。使用前请确认网络环境能够正常访问 `storage.googleapis.com` 及相关官方地址。

---

## 3. 配置环境变量 PATH

### Windows

把 `C:\Users\你的用户名\.local\bin\` 加到用户级 PATH：

1. 开始菜单 → 搜索"环境变量" → 编辑系统环境变量
2. 点"环境变量" → 在系统变量找到 `Path` → 双击
3. 新建 → 粘贴路径 → 确定

### Mac / Linux

通常安装脚本会自动配置。先关掉终端重启，试试输入 `claude`。

如果找不到命令，手动添加到 shell 配置：

```bash
export PATH="$HOME/.local/bin:$PATH"
```

加到 `~/.bashrc` 或 `~/.zshrc`，然后执行 `source ~/.zshrc` 生效。

---

## 4. 安装 cc-switch，接入更多模型

软件装好了，但还没有 AI 模型可用。需要 **cc-switch** 来切换不同的 AI 模型提供商。

cc-switch 支持的模型：智谱 GLM、MiniMax、Kimi、DeepSeek 等。Claude、GPT 等模型可通过 API 服务接入。

### 下载安装

- 📦 [CC-Switch for Windows](https://daheiai.com)
- 📦 [CC-Switch for macOS](https://daheiai.com)

新版本可从 [GitHub Releases](https://github.com) 获取更新。

### 配置渠道

安装完成后，在 cc-switch 中选择 Claude 图标，添加渠道，填入密钥，指定模型名称，最后启用。

![](/img/tutorial-CC-switch-qudao.jpg)

回到终端输入 `claude` 就可以开始对话了。

### 仍有报错？

如果出现下图提示：

![](/img/tutorial-ccbaocuo2.jpg)

**原因：** cc-switch 修改 Claude Code 配置文件，但 Claude Code 首次运行时会强行连接官方做登录检查。

**解决方法一（推荐）：** 运行命令跳过检测：

```bash
echo '{"hasCompletedOnboarding": true}' > ~/.claude.json
```

Windows：

```powershell
echo '{"hasCompletedOnboarding": true}' > $env:USERPROFILE\.claude.json
```

**解决方法二：** 手动编辑 `~/.claude.json`，加入 `"hasCompletedOnboarding": true`。

---

## 5. Claude Code 基础使用

### 启动

先进入要工作的文件夹，再输入 `claude` 启动。

### 恢复历史会话

```bash
/resume
```

在对话框输入 `/resume` 即可选择历史会话恢复。

### 查看上下文

```bash
/context
```

随时查看上下文占用。也可以手动 `/compact` 压缩。

### 为什么用终端？

终端里的输入和输出都是文字，AI 处理文字最快。它可以直接读文件、改文件、运行命令。

---

## 6. 常见问题

### 如何卸载？

Windows：设置 → 应用 → 已安装的应用 → 搜索 "Claude Code" → 卸载。

如果系统列表找不到，以管理员身份打开 PowerShell：

```powershell
# 删除主程序
Remove-Item -Path "$env:USERPROFILE\.local\bin\claude.exe" -Force
Remove-Item -Path "$env:USERPROFILE\.local\share\claude" -Recurse -Force

# 删除配置
Remove-Item -Path "$env:USERPROFILE\.claude" -Recurse -Force
Remove-Item -Path "$env:USERPROFILE\.claude.json" -Force
```

> 删除 `~/.claude` 会清除所有设置、工具、会话历史。想保留请先备份。

### 如何更新？

重新运行一次安装命令即可。
