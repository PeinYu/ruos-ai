# PowerShell脚本：生成Android签名密钥并配置GitHub Secrets指南
# 适用于Windows系统

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Ruos-AI Android签名密钥生成脚本" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# 检查Java是否安装
Write-Host "检查Java环境..." -ForegroundColor Yellow
$javaVersion = java -version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: Java未安装或未添加到PATH" -ForegroundColor Red
    Write-Host "请先安装Java JDK 8或更高版本" -ForegroundColor Red
    Write-Host "下载地址: https://adoptium.net/" -ForegroundColor Yellow
    exit 1
}
Write-Host "Java已安装: $javaVersion" -ForegroundColor Green

# 设置参数
$keystoreFile = "ruosai.keystore"
$keystorePassword = "ruosai2025"
$keyAlias = "ruosai"
$keyPassword = "ruosai2025"
$validityDays = 10000

Write-Host ""
Write-Host "生成参数:" -ForegroundColor Yellow
Write-Host "- Keystore文件: $keystoreFile"
Write-Host "- Keystore密码: $keystorePassword"
Write-Host "- 密钥别名: $keyAlias"
Write-Host "- 别名密码: $keyPassword"
Write-Host "- 有效期: $validityDays 天"
Write-Host ""

# 提示用户输入信息
Write-Host "请输入以下信息（按Enter使用默认值）:" -ForegroundColor Yellow

$firstName = Read-Host "名字与姓氏 (如: John Doe)"
if ([string]::IsNullOrWhiteSpace($firstName)) { $firstName = "RuosAI Developer" }

$organizationalUnit = Read-Host "组织单位名称 (如: Development)"
if ([string]::IsNullOrWhiteSpace($organizationalUnit)) { $organizationalUnit = "Development" }

$organization = Read-Host "组织名称 (如: RuosAI)"
if ([string]::IsNullOrWhiteSpace($organization)) { $organization = "RuosAI" }

$city = Read-Host "城市名称 (如: Beijing)"
if ([string]::IsNullOrWhiteSpace($city)) { $city = "Beijing" }

$state = Read-Host "省份名称 (如: Beijing)"
if ([string]::IsNullOrWhiteSpace($state)) { $state = "Beijing" }

$countryCode = Read-Host "国家代码 (2字母，如: CN)"
if ([string]::IsNullOrWhiteSpace($countryCode)) { $countryCode = "CN" }

Write-Host ""
Write-Host "生成密钥库文件..." -ForegroundColor Yellow

# 创建DN字符串
$dname = "CN=$firstName, OU=$organizationalUnit, O=$organization, L=$city, ST=$state, C=$countryCode"

# 生成keystore文件
$keytoolCommand = "keytool -genkey -v -keystore `"$keystoreFile`" -alias `"$keyAlias`" -keyalg RSA -keysize 2048 -validity $validityDays -dname `"$dname`" -storepass `"$keystorePassword`" -keypass `"$keyPassword`""

Write-Host "执行命令: $keytoolCommand" -ForegroundColor Gray
Invoke-Expression $keytoolCommand

if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: 生成keystore文件失败" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Keystore文件生成成功: $keystoreFile" -ForegroundColor Green

# 验证keystore文件
Write-Host ""
Write-Host "验证生成的keystore文件..." -ForegroundColor Yellow
keytool -list -v -keystore "$keystoreFile" -storepass "$keystorePassword"

if ($LASTEXITCODE -ne 0) {
    Write-Host "警告: 验证keystore文件时出现问题" -ForegroundColor Yellow
}

# 转换为Base64
Write-Host ""
Write-Host "将keystore文件转换为Base64编码..." -ForegroundColor Yellow
$base64Content = [Convert]::ToBase64String([IO.File]::ReadAllBytes((Get-Item $keystoreFile).FullName))
$base64File = "keystore_base64.txt"
$base64Content | Out-File -Encoding ASCII -FilePath $base64File

Write-Host "✅ Base64文件生成成功: $base64File" -ForegroundColor Green
Write-Host "文件大小: $($base64Content.Length) 字符" -ForegroundColor Gray

# 显示GitHub Secrets配置指南
Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "GitHub Secrets 配置指南" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "请按照以下步骤在GitHub仓库中配置Secrets:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. 打开GitHub仓库页面" -ForegroundColor White
Write-Host "2. 点击 'Settings' → 'Secrets and variables' → 'Actions'" -ForegroundColor White
Write-Host "3. 点击 'New repository secret'" -ForegroundColor White
Write-Host ""
Write-Host "需要添加以下4个Secrets:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Secret名称: ANDROID_KEYSTORE_BASE64" -ForegroundColor Cyan
Write-Host "值: 从 $base64File 文件复制全部内容" -ForegroundColor White
Write-Host ""
Write-Host "Secret名称: KEYSTORE_PASSWORD" -ForegroundColor Cyan
Write-Host "值: $keystorePassword" -ForegroundColor White
Write-Host ""
Write-Host "Secret名称: KEYSTORE_ALIAS" -ForegroundColor Cyan
Write-Host "值: $keyAlias" -ForegroundColor White
Write-Host ""
Write-Host "Secret名称: KEYSTORE_ALIAS_PASSWORD" -ForegroundColor Cyan
Write-Host "值: $keyPassword" -ForegroundColor White
Write-Host ""
Write-Host "4. 保存所有Secrets" -ForegroundColor White
Write-Host ""
Write-Host "✅ 配置完成后，GitHub Actions将能够构建签名的Release APK" -ForegroundColor Green
Write-Host ""
Write-Host "重要安全提示:" -ForegroundColor Red
Write-Host "- 不要将 $keystoreFile 提交到Git仓库" -ForegroundColor Yellow
Write-Host "- 妥善保管keystore文件和密码" -ForegroundColor Yellow
Write-Host "- 定期更新签名密钥" -ForegroundColor Yellow

# 显示Base64内容的前100个字符作为示例
Write-Host ""
Write-Host "Base64内容预览（前100字符）:" -ForegroundColor Gray
Write-Host $base64Content.Substring(0, [Math]::Min(100, $base64Content.Length))"..." -ForegroundColor Gray
