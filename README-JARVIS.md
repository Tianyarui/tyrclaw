# Jarvis KKClaw - 使用说明

## 🎯 这是什么？

Jarvis KKClaw 是专为 Jarvis智能体系统定制的桌面伴侣软件！

- 🦞 龙纹球宠物 + AI对话
- 🎙️ 语音播报
- 🔗 自动连接 Jarvis 服务器
- 📱 7×24 运行

## 🚀 快速开始

### Windows 免安装版（推荐）

1. 下载 `Jarvis-KKClaw-2.1.0-jarvis-x64.exe` 或 `Jarvis-KKClaw-2.1.0-jarvis-x64.exe`
2. **直接双击运行** - 不需要安装！
3. 龙纹球会自动连接 Jarvis 服务器

### 或者：源码编译

```bash
# 克隆代码
git clone https://github.com/kk43994/kkclaw.git
cd kkclaw

# 复制修改好的文件（如果有）
# 把openclaw-client.js和main.js复制进来

# 安装依赖
npm install

# 构建免安装版
npm run build:win:portable

# 或者构建安装版
npm run build:win
```

## ⚙️ 配置说明

### 自动配置

Jarvis KKClaw 已预配置连接：
- **服务器地址**: `http://100.96.37.38:18789`
- **Token**: 预配置完成

### 自定义配置（可选）

如果需要连接其他服务器，设置环境变量：

```bash
# Windows PowerShell
$env:OPENCLAW_GATEWAY_URL = "http://你的服务器IP:端口"
$env:OPENCLAW_GATEWAY_TOKEN = "你的token"
```

## 📱 功能特性

- ✅ 自动连接 Jarvis 服务器
- ✅ 38种表情动画
- ✅ 语音播报回复
- ✅ 7×24稳定运行
- ✅ 免安装直接运行

## 🔧 故障排查

| 问题 | 解决方案 |
|------|----------|
| 无法连接 | 检查Tailscale网络是否正常 |
| 语音不播放 | 在设置中切换语音引擎 |
| 龙纹球不显示 | 重启程序 |

## 📝 更新日志

### v2.1.0-jarvis (2026-02-13)
- 🎯 预配置 Jarvis 服务器地址
- 🦞 品牌更名为 "Jarvis KKClaw"
- 🔧 添加免安装支持
- 📝 优化日志输出

## 🤝 致谢

- 感谢 [kk43994](https://github.com/kk43994/kkclaw) 提供原始代码
- 基于 [OpenClaw](https://openclaw.ai) 项目

---

**Made with ❤️ for Jarvis**
