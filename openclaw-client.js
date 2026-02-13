// OpenClaw 连接模块 - Jarvis定制版
// 🎯 适配Jarvis智能体系统
const path = require('path');
const fs = require('fs');

// 🎯 Jarvis配置：默认连接我们的服务器
const DEFAULT_OPENCLAW_HOST = 'http://100.96.37.38:18789';
const DEFAULT_OPENCLAW_TOKEN = '02e02c56a5d76ed147a3f9eb02d3e2a5be7a35881e14ec80';

// 优先使用环境变量，否则用Jarvis默认值（保持灵活性）
const OPENCLAW_HOST = process.env.OPENCLAW_GATEWAY_URL || DEFAULT_OPENCLAW_HOST;
const OPENCLAW_TOKEN = process.env.OPENCLAW_GATEWAY_TOKEN || DEFAULT_OPENCLAW_TOKEN;

// Jarvis品牌配置
const JARVIS_CONFIG = {
    name: '🤖 Jarvis KKClaw',
    version: '2.1.0-jarvis',
    server: OPENCLAW_HOST,
    startupTime: new Date().toISOString()
};

class OpenClawClient {
    constructor() {
        this.connected = false;
        this.sessionKey = null;
        this.lastCheckTime = 0;
        this.checkInterval = 10000; // 10秒检查一次
        this.onError = null; // 错误回调，用于触发服务管理器检测
        
        console.log(`🦞 ${JARVIS_CONFIG.name} v${JARVIS_CONFIG.version}`);
        console.log(`🎯 目标服务器: ${OPENCLAW_HOST}`);
        console.log(`⏰ 启动时间: ${JARVIS_CONFIG.startupTime}`);
    }

    // 设置错误回调
    setErrorHandler(handler) {
        this.onError = handler;
    }

    async checkConnection() {
        // 避免频繁检查
        const now = Date.now();
        if (now - this.lastCheckTime < this.checkInterval && this.connected) {
            return this.connected;
        }
        this.lastCheckTime = now;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000);

            const testResponse = await fetch(`${OPENCLAW_HOST}/`, {
                method: 'GET',
                signal: controller.signal
            }).catch(() => null);

            clearTimeout(timeoutId);

            this.connected = testResponse !== null;
            if (this.connected) {
                console.log('✅ Jarvis服务器连接成功');
            } else {
                console.log('❌ 无法连接到 Jarvis 服务器');
            }
            return this.connected;
        } catch (err) {
            this.connected = false;
            console.log(`❌ 连接错误: ${err.message}`);
            return false;
        }
    }

    async sendMessage(message) {
        try {
            console.log(`📤 发送消息到 Jarvis...`);
            
            const response = await fetch(`${OPENCLAW_HOST}/v1/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENCLAW_TOKEN}`,
                    'Content-Type': 'application/json',
                    'x-openclaw-agent-id': 'main'
                },
                body: JSON.stringify({
                    model: 'openclaw:main',
                    messages: [
                        { role: 'user', content: message }
                    ],
                    stream: false
                })
            });

            if (!response.ok) {
                const errorMsg = `连接失败 (${response.status})`;
                console.log(`❌ ${errorMsg}`);
                if (this.onError) {
                    this.onError(errorMsg);
                }
                this.connected = false;
                return errorMsg;
            }

            this.connected = true;
            const data = await response.json();
            const result = data.choices?.[0]?.message?.content || '无响应';
            console.log(`📥 Jarvis回复成功 (${result.length} 字符)`);
            return result;
        } catch (err) {
            console.error('发送消息失败:', err);
            this.connected = false;
            if (this.onError) {
                this.onError(err.message);
            }
            return `错误: ${err.message}`;
        }
    }

    async getStatus() {
        return this.connected ? '🟢 Jarvis已连接' : '🔴 未连接';
    }
    
    // 获取配置信息
    getConfig() {
        return {
            name: JARVIS_CONFIG.name,
            version: JARVIS_CONFIG.version,
            server: OPENCLAW_HOST,
            connected: this.connected
        };
    }
}

module.exports = OpenClawClient;
