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

// 路由：首页（备用）
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 路由：非遗手首页
app.get('/shouye', (req, res) => {
    res.sendFile(path.join(__dirname, '1.shouye.html'));
});

// 路由：非遗名录
app.get('/feiyiminglu', (req, res) => {
    res.sendFile(path.join(__dirname, '2.feiyiminglu.html'));
});

// 路由：数字体验
app.get('/shuzitiyan', (req, res) => {
    res.sendFile(path.join(__dirname, '3.shuzitiyan.html'));
});

// 路由：工艺教学
app.get('/gongyijiaoxue', (req, res) => {
    res.sendFile(path.join(__dirname, '4.gongyijiaoxue.html'));
});

// 路由：文化故事
app.get('/wenhuagushi', (req, res) => {
    res.sendFile(path.join(__dirname, '5.wenhuagushi.html'));
});

// 404处理
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '1.shouye.html'));
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
    const os = require('os');
    const interfaces = os.networkInterfaces();
    const addresses = [];
    
    for (const key of Object.keys(interfaces)) {
        for (const iface of interfaces[key]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                addresses.push(iface.address);
            }
        }
    }
    
    console.log('\n========================================');
    console.log('     非遗手·传承 服务已启动');
    console.log('========================================');
    console.log(`\n本地访问:`);
    console.log(`  http://localhost:${PORT}`);
    console.log(`  http://127.0.0.1:${PORT}`);
    console.log(`\n局域网访问（其他设备）:`);
    addresses.forEach(addr => {
        console.log(`  http://${addr}:${PORT}`);
    });
    console.log(`\n页面路由:`);
    console.log(`  /          -> 首页(index.html)`);
    console.log(`  /shouye    -> 非遗手首页`);
    console.log(`  /feiyiminglu -> 非遗名录`);
    console.log(`  /shuzitiyan -> 数字体验`);
    console.log(`  /gongyijiaoxue -> 工艺教学`);
    console.log(`  /wenhuagushi -> 文化故事`);
    console.log(`\n========================================`);
});
