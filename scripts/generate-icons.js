const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// 确保目录存在
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// 创建简单的SVG图标 - RuosAI logo
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#4338ca" rx="100" />
  <path d="M128 170 H 384 V 200 H 158 V 250 H 354 V 280 H 158 V 342 H 128 Z" fill="white" />
  <path d="M384 170 V 342 H 354 V 250 V 200 H 384 Z" fill="white" />
  <circle cx="256" cy="128" r="30" fill="white" />
</svg>`;

// 写入SVG文件
fs.writeFileSync(path.join(iconsDir, 'icon.svg'), svgContent);

// 创建一个简单的PNG图标
const pngPath = path.join(iconsDir, 'icon.png');
const iconPath = path.join(iconsDir, 'icon.ico');
const trayIconPath = path.join(iconsDir, 'tray-icon.png');

console.log('SVG图标已创建: ' + path.join(iconsDir, 'icon.svg'));
console.log('请手动将SVG转换为PNG和ICO格式');
console.log('推荐的图标尺寸:');
console.log('- icon.ico: 256x256 (Windows应用图标)');
console.log('- icon.png: 512x512 (Linux应用图标)');
console.log('- tray-icon.png: 32x32 (系统托盘图标)');
console.log('- 对于Android, 还需要生成不同尺寸的图标到android/app/src/main/res/目录');

// 提示下一步打包应用
console.log('\n打包指南:');
console.log('1. 运行 npm run build 编译应用');
console.log('2. 运行 npm run build:win 构建Windows应用');
console.log('3. 运行 npm run build:android 构建Android应用 (需要安装Android SDK)'); 