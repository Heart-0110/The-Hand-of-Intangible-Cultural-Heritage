const localtunnel = require('localtunnel');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 启用CORS
app.use(cors());

// 静态文件服务
app.use(express.static(path.join(__dirname)));

// 路由：首页
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/shouye', (req, res) => {
    res.sendFile(path.join(__dirname, '1.shouye.html'));
});

app.get('/feiyiminglu', (req, res) => {
    res.sendFile(path.join(__dirname, '2.feiyiminglu.html'));
});

app.get('/shuzitiyan', (req, res) => {
    res.sendFile(path.join(__dirname, '3.shuzitiyan.html'));
});

app.get('/gongyijiaoxue', (req, res) => {
    res.sendFile(path.join(__dirname, '4.gongyijiaoxue.html'));
});

app.get('/wenhuagushi', (req, res) => {
    res.sendFile(path.join(__dirname, '5.wenhuagushi.html'));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '1.shouye.html'));
});

// 启动服务器并创建localtunnel隧道
async function startServer() {
    try {
        // 启动Express服务器
        app.listen(PORT, '0.0.0.0', async () => {
            console.log('\n========================================');
            console.log('     非遗手·传承 服务已启动');
            console.log('========================================');
            console.log(`\n本地访问:`);
            console.log(`  http://localhost:${PORT}`);
            console.log(`  http://127.0.0.1:${PORT}`);
        });

        // 创建localtunnel隧道（不指定子域名，让系统随机分配）
        const tunnel = await localtunnel({ port: PORT });

        console.log('\n========================================');
        console.log('        🌐 外网访问地址（穿透成功）');
        console.log('========================================');
        console.log(`\n公网访问地址:`);
        console.log(`  ${tunnel.url}`);
        console.log(`\n页面路由:`);
        console.log(`  ${tunnel.url}/          -> 首页`);
        console.log(`  ${tunnel.url}/shouye    -> 非遗手首页`);
        console.log(`  ${tunnel.url}/feiyiminglu -> 非遗名录`);
        console.log(`  ${tunnel.url}/shuzitiyan -> 数字体验`);
        console.log(`  ${tunnel.url}/gongyijiaoxue -> 工艺教学`);
        console.log(`  ${tunnel.url}/wenhuagushi -> 文化故事`);
        console.log(`\n========================================`);
        console.log('💡 将上面的公网地址分享给任何人，');
        console.log('   即使不在同一WiFi也能访问！');
        console.log('========================================');

        // 监听隧道关闭
        tunnel.on('close', () => {
            console.log('\n👋 隧道已关闭');
        });

    } catch (error) {
        console.error('❌ 启动失败:', error.message);
        console.log('\n📖 解决方法:');
        console.log('1. 确保localtunnel已安装: npm install localtunnel');
        console.log('2. 检查网络连接是否正常');
        console.log('\n💡 提示: 子域名 feiyishou2024 可能已被占用，');
        console.log('   可以修改subdomain参数尝试其他名称');
        process.exit(1);
    }
}

startServer();

// 优雅关闭
process.on('SIGINT', async () => {
    console.log('\n👋 正在关闭服务...');
    process.exit(0);
});
