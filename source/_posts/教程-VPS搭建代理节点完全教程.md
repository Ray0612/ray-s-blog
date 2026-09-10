---
title: "VPS 搭建代理节点完全教程"
date: 2026-09-10
categories: 教程分享
tags:
  - VPS
  - 代理
  - 教程
---

> 从购买到使用的全流程指南（RackNerd + 3x-ui + SS 中转）
> 
> 最后更新：2026/09/10

---

## 目录

1. [选购 VPS](#一选购-vps)
2. [首次 SSH 连接](#二首次-ssh-连接)
3. [安装 3x-ui 面板](#三安装-3x-ui-面板)
4. [创建代理节点](#四创建代理节点)
5. [客户端配置](#五客户端配置)
6. [中转方案（国内 VPS 转发）](#六中转方案国内-vps-转发)
7. [常见问题排查](#七常见问题排查)
8. [附录：当前配置速查](#附录当前配置速查)

---

## 一、选购 VPS

### 1.1 推荐商家：RackNerd

RackNerd 是美国廉价 VPS 商家，年付便宜，适合做代理节点。

**购买地址：** https://www.racknerd.com/

### 1.2 推荐配置

| 项目 | 推荐配置 | 说明 |
|------|---------|------|
| CPU | 1 核 | 代理不需要多核 |
| 内存 | 1 GB | xray + 面板够用 |
| 硬盘 | 20 GB | 系统 + 日志 |
| 流量 | 3 TB/月 | 够多人使用 |
| 带宽 | 1 Gbps | 共享带宽 |
| 位置 | **洛杉矶 LA** | 延迟低，CN2 线路可选 |
| 价格 | ~$12-15/年 | 黑五更便宜 |

### 1.3 购买流程

1. 进入 RackNerd 官网 → 选择 **VPS** → **Linux**
2. 选 **1 GB** 内存方案
3. 选 **Los Angeles** 机房
4. 选 **Ubuntu 22.04** 或 **Debian 12**
5. 加入购物车 → 结账（支持支付宝）
6. 注册账号 → 支付
7. 等待几分钟，邮箱收到 **IP 地址 + root 密码 + SSH 端口**

### 1.4 收到邮件后

邮件内容示例：
```
IP: 173.254.204.29
SSH Port: 22
Username: root
Password: xxxxxxxxxxxxxxxx
```

**记下这些信息，下一步用。**

---

## 二、首次 SSH 连接

### 2.1 Mac/Linux 连接

打开终端：
```bash
ssh root@你的IP
```

输入密码（粘贴后不会显示字符，正常的）。

### 2.2 Windows 连接

用 **PowerShell** 或 **PuTTY**：
```powershell
ssh root@你的IP
```

### 2.3 首次连接提示

会看到：
```
Are you sure you want to continue connecting (yes/no)?
```
输入 `yes` 回车。

### 2.4 修改初始密码（推荐）

```bash
passwd
```

### 2.5 配置 SSH 别名（Mac 推荐）

编辑 `~/.ssh/config`：
```
Host vps
    HostName 你的IP
    User root
    Port 22
```

之后直接 `ssh vps` 即可连接。

### 2.6 配置 Cloudflare Tunnel SSH（可选）

如果直连 SSH 被封（GFW 干扰），可以通过 Cloudflare Tunnel 连接：

1. 在 VPS 上安装 cloudflared：
```bash
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared
chmod +x /usr/local/bin/cloudflared
```

2. 在 Cloudflare Zero Trust → Access → Tunnels 创建隧道

3. Mac 上创建 `~/.ssh/cf-tunnel.sh`：
```bash
#!/bin/bash
PORT=2224
/usr/local/bin/cloudflared access tcp \
  --hostname ssh.ray2.asia \
  --url localhost:$PORT > /dev/null 2>&1 &
CFPID=$!
for i in 1 2 3 4 5 6 7 8; do
  nc -z localhost $PORT 2>/dev/null && break
  sleep 1
done
nc localhost $PORT
kill $CFPID 2>/dev/null
```

4. `~/.ssh/config` 添加：
```
Host vps-cf
    HostName ssh.ray2.asia
    User root
    ProxyCommand ~/.ssh/cf-tunnel.sh
```

---

## 三、安装 3x-ui 面板

### 3.1 一键安装

```bash
bash <(curl -Ls https://raw.githubusercontent.com/mhsanaei/3x-ui/master/install.sh)
```

安装过程中会提示：
- 设置面板端口（如 `61228`）
- 设置面板用户名（如 `Ray`）
- 设置面板密码（如 `20061228.P.r`）
- 设置面板路径（随机生成，如 `/cNHTtQgcDESQO7L7MJ`）

### 3.2 安装完成后

```
#######################################
 面板地址: http://IP:端口/路径
 用户名: xxx
 密码: xxx
#######################################
```

### 3.3 常用管理命令

```bash
x-ui                    # 打开管理菜单
x-ui start              # 启动
x-ui stop               # 停止
x-ui restart            # 重启
x-ui status             # 查看状态
x-ui enable             # 开机自启
```

### 3.4 面板安全设置

1. 修改默认端口（不要用 8080 等常见端口）
2. 设置复杂的面板路径（如 `/cNHTtQgcDESQO7L7MJ`）
3. 定期更换密码
4. 可通过 Cloudflare Tunnel 暴露面板（更安全）

---

## 四、创建代理节点

### 4.1 协议选择

| 协议 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| VLESS + Reality | 伪装成正常网站，抗封锁强 | xray 26.x 有 bug | ⚠️ 不稳定 |
| Shadowsocks (aes-256-gcm) | 稳定可靠，兼容性好 | 特征明显，直连可能被检测 | ✅ 推荐（配合中转） |
| VMess + WebSocket + TLS | 通过 CDN 可抗封锁 | 延迟高 | 可用 |

> ⚠️ **重要经验：** xray 26.x 版本（26.6.22、26.3.27 等）对 VLESS+Reality、SS 2022、WebSocket 传输层有 bug，会导致连接失败。目前最稳定的是 **Shadowsocks + aes-256-gcm**。

### 4.2 通过面板创建 SS 节点

1. 登录面板 → **Inbounds** → **+ Add Inbound**
2. 设置：
   - **Remark（备注）**：如 `SS-Relay`
   - **Protocol**：`shadowsocks`
   - **Port**：`28450`（自定义高位端口）
   - **Security**：`aes-256-gcm`
   - **Password**：设置一个强密码
3. 点击 **Add**

### 4.3 通过面板创建 VLESS+Reality 节点

1. **Inbounds** → **+ Add Inbound**
2. 设置：
   - **Protocol**：`vless`
   - **Port**：`443`
   - **Security**：`reality`
   - **SNI**：`www.microsoft.com`（或 `www.apple.com`）
   - **Dest**：`www.microsoft.com:443`
   - **Private Key**：点击 Generate
   - **ShortIds**：随机生成
3. 在 **Clients** 中添加用户（UUID 自动生成）
4. 点击 **Add**

### 4.4 防火墙放行端口

```bash
ufw allow 443/tcp
ufw allow 28450/tcp
ufw allow 61228/tcp
ufw allow 51820/udp    # WireGuard
ufw reload
```

---

## 五、客户端配置

### 5.1 iOS（Shadowrocket 小火箭）

1. 打开 Shadowrocket
2. 点击右上角 **+**
3. 选择 **Type**：`Shadowsocks` 或 `VLESS`
4. 填写：
   - **Address**：你的 VPS IP 或中转 IP
   - **Port**：节点端口
   - **Password**：节点密码
   - **Encryption**：`aes-256-gcm`
5. 保存 → 连接测试

**扫码导入：**
- 面板中点击节点旁的二维码图标
- 用 Shadowrocket 扫描即可自动导入

### 5.2 Windows（Hiddify）

#### 方法一：订阅链接导入

1. 复制面板的订阅链接
2. 打开 Hiddify → **Profile** → **+ New Profile** → **Import from Clipboard**
3. 选择节点 → 连接

#### 方法二：手动配置（推荐，更稳定）

1. 打开 Hiddify → **Profile** → **+ New Profile** → **Manual**
2. 选择类型 **Shadowsocks**
3. 填写：
   - **Name**：自定义名称
   - **Server**：中转 IP（如 `8.137.20.244`）
   - **Port**：`443`
   - **Password**：你的 SS 密码
   - **Encryption**：`aes-256-gcm`
4. 保存 → 点击连接

#### 方法三：直接导入 SS 链接

在 Hiddify 中导入：
```
ss://YWVzLTI1Ni1nY206UmF5U3RhbmRhbG9uZVNTMjAyNkA4LjEzNy4yMC4yNDQ6NDQz
```

### 5.3 Mac（V2rayU / Clash Verge）

类似 Windows，手动填入参数即可。

---

## 六、中转方案（国内 VPS 转发）

### 6.1 为什么需要中转？

**问题：** 国内网络（校园网、公司网、部分运营商）直连海外 SS 节点会被 GFW 检测并封锁。

**解决方案：** 用国内 VPS 做中转，通过 WireGuard 隧道转发流量。

### 6.2 架构图

```
用户（WiFi/4G）
    ↓
国内中转 VPS（阿里云 ECS，端口 443）
    ↓ WireGuard 加密隧道
LA VPS（RackNerd，SS 端口 28450）
    ↓
外网（Google/YouTube/Instagram）
```

### 6.3 购买国内中转 VPS

**推荐：阿里云 ECS 学生计划**

| 项目 | 配置 |
|------|------|
| CPU | 2 核 |
| 内存 | 2 GB |
| 带宽 | 8 Mbps |
| 流量 | 不限量 |
| 价格 | ~100 元/年（学生优惠） |
| 位置 | 华北/华东均可 |

> 阿里云有学生优惠计划（https://developer.aliyun.com/plan/student），可领取优惠券。

### 6.4 配置 WireGuard 隧道

#### 第一步：生成密钥对（两台机器都要做）

**LA VPS（服务端）：**
```bash
wg genkey | tee /etc/wireguard/server_private.key | wg pubkey > /etc/wireguard/server_private.pub
```

**阿里云 ECS（客户端）：**
```bash
wg genkey | tee /etc/wireguard/client_private.key | wg pubkey > /etc/wireguard/client_private.pub
```

#### 第二步：LA VPS 配置（`/etc/wireguard/wg0.conf`）

```ini
[Interface]
PrivateKey = <LA服务端私钥>
Address = 10.0.0.2/24
ListenPort = 51820

[Peer]
PublicKey = <阿里云公钥>
AllowedIPs = 10.0.0.3/32
```

#### 第三步：阿里云 ECS 配置（`/etc/wireguard/wg0.conf`）

```ini
[Interface]
PrivateKey = <阿里云私钥>
Address = 10.0.0.3/24

[Peer]
PublicKey = <LA服务端公钥>
AllowedIPs = 10.0.0.2/32
Endpoint = 173.254.204.29:51820
PersistentKeepalive = 25
```

#### 第四步：启动 WireGuard

两台都执行：
```bash
systemctl enable wg-quick@wg0
systemctl start wg-quick@wg0
```

验证：
```bash
wg show
ping 10.0.0.2   # 从阿里云 ping LA
```

### 6.5 配置 iptables 端口转发（阿里云 ECS）

```bash
# 开启 IP 转发
echo "net.ipv4.ip_forward = 1" >> /etc/sysctl.conf
sysctl -p

# 443 端口转发到 LA VPS 的 SS 端口
iptables -t nat -A PREROUTING -p tcp --dport 443 -j DNAT --to-destination 10.0.0.2:28450
iptables -t nat -A POSTROUTING -p tcp -d 10.0.0.2 --dport 28450 -j MASQUERADE

# 持久化规则
apt install iptables-persistent -y
netfilter-persistent save
```

### 6.6 阿里云安全组

在阿里云控制台 → 安全组 → 入方向规则：
- 放行 **TCP 443**
- 放行 **UDP 51820**（WireGuard）

### 6.7 配置独立 SS 服务（LA VPS）

创建 `/etc/xray-ss.json`：
```json
{
  "log": {"loglevel": "warning"},
  "inbounds": [{
    "port": 28450,
    "protocol": "shadowsocks",
    "settings": {
      "method": "aes-256-gcm",
      "password": "你的SS密码",
      "network": "tcp"
    }
  }],
  "outbounds": [{"protocol": "freedom", "tag": "direct"}]
}
```

创建 systemd 服务 `/etc/systemd/system/xray-ss.service`：
```ini
[Unit]
Description=Xray SS Service
After=network.target

[Service]
ExecStart=/usr/local/x-ui/bin/xray-linux-amd64 run -c /etc/xray-ss.json
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

启动：
```bash
systemctl daemon-reload
systemctl enable xray-ss
systemctl start xray-ss
```

### 6.8 最终连接参数

| 参数 | 值 |
|------|-----|
| 地址 | 阿里云 ECS IP（如 `8.137.20.244`） |
| 端口 | `443` |
| 加密 | `aes-256-gcm` |
| 密码 | 你的 SS 密码 |

SS 链接：
```
ss://YWVzLTI1Ni1nY206[base64密码]@8.137.20.244:443
```

---

## 七、常见问题排查

### 7.1 连接超时 / 无法访问

**排查步骤：**

1. **检查 VPS 是否在线：**
   ```bash
   ping 你的IP
   ```

2. **检查端口是否开放：**
   ```bash
   nc -zv 你的IP 端口
   ```

3. **检查服务是否运行：**
   ```bash
   systemctl status x-ui
   systemctl status xray-ss
   wg show
   ```

4. **检查防火墙：**
   ```bash
   ufw status
   iptables -t nat -L -n
   ```

5. **检查 xray 日志：**
   ```bash
   journalctl -u x-ui -f
   journalctl -u xray-ss -f
   ```

### 7.2 xray 版本问题

**症状：** VLESS+Reality 连接失败、SS 2022 方法报错、WebSocket 传输异常

**原因：** xray 26.x 多个版本存在协议级 bug

**解决：**
- SS 节点：使用 `aes-256-gcm`（经典方法），不要用 `2022-blake3-aes-256-gcm`
- VLESS+Reality：降级到 xray 1.8.24 或等待修复
- 推荐版本：**xray 26.3.27**（SS 可用）

### 7.3 直连被封但中转可用

**症状：** 手机 4G 能连，WiFi 不能连；或直连超时但中转正常

**原因：** GFW 对直连海外 SS 的检测

**解决：** 使用国内 VPS 中转方案（见第六章）

### 7.4 面板无法访问

**排查：**
```bash
systemctl status x-ui
netstat -tlnp | grep 面板端口
```

**解决：**
- 检查端口是否被占用
- 通过 Cloudflare Tunnel 或 SSH 隧道访问面板
- 面板地址格式：`http://IP:端口/路径`

### 7.5 Hiddify 超时（Windows）

**可能原因：**
1. 订阅链接过期 → 手动配置参数
2. DNS 解析问题 → 尝试直连 IP
3. 防火墙拦截 → 关闭 Windows Defender 防火墙测试
4. 协议不匹配 → 确认加密方法一致

**手动配置方法：** 见 5.2 节方法二

---

## 附录：当前配置速查

### LA VPS（RackNerd）

| 项目 | 值 |
|------|-----|
| IP | `173.254.204.29` |
| SSH | `ssh vps` 或 `ssh vps-cf`（CF Tunnel） |
| 面板端口 | `61228` |
| 面板路径 | `/cNHTtQgcDESQO7L7MJ` |
| SS 端口 | `28450` |
| WireGuard | `wg0` = 10.0.0.2/24 |
| md-pdf 服务 | `8789` |
| md-extract 服务 | `8790` |

### 国内中转（阿里云 ECS）

| 项目 | 值 |
|------|-----|
| IP | `8.137.20.244` |
| WireGuard | `wg0` = 10.0.0.3/24 |
| 转发规则 | 443 → 10.0.0.2:28450 |

### SS 连接参数

| 参数 | 值 |
|------|-----|
| 地址 | `8.137.20.244` |
| 端口 | `443` |
| 加密 | `aes-256-gcm` |
| 密码 | `RayStandaloneSS2026` |

### 常用命令速查

```bash
# SSH 连接
ssh vps                    # 直连
ssh vps-cf                 # Cloudflare Tunnel

# 面板管理
x-ui                       # 面板菜单
systemctl status x-ui      # 查看面板状态

# WireGuard
wg show                    # 查看隧道状态
systemctl restart wg-quick@wg0   # 重启隧道

# SS 服务
systemctl status xray-ss   # 查看 SS 状态
journalctl -u xray-ss -f   # 查看 SS 日志

# 防火墙
ufw status                 # 查看防火墙规则
ufw allow 443/tcp          # 放行端口

# 端口转发
iptables -t nat -L -n      # 查看 NAT 规则
```

---

> 💡 **提示：** 网络环境随时变化，如果直连被封，优先使用中转方案。中转方案通过 WireGuard 加密隧道传输，GFW 无法区分是代理流量还是正常 VPN 流量，因此更稳定。
