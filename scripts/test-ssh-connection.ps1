# SSH连接测试脚本
Write-Host "=== SSH连接测试 ===" -ForegroundColor Cyan

# 1. 检查SSH密钥文件
Write-Host "`n1. 检查SSH密钥文件..." -ForegroundColor Yellow
$privateKey = "$env:USERPROFILE\.ssh\id_ed25519"
$publicKey = "$env:USERPROFILE\.ssh\id_ed25519.pub"

if (Test-Path $privateKey) {
    Write-Host "   ✓ 私钥文件存在: $privateKey" -ForegroundColor Green
} else {
    Write-Host "   ✗ 私钥文件不存在" -ForegroundColor Red
}

if (Test-Path $publicKey) {
    Write-Host "   ✓ 公钥文件存在: $publicKey" -ForegroundColor Green
    Write-Host "`n   公钥内容:" -ForegroundColor Yellow
    Get-Content $publicKey
} else {
    Write-Host "   ✗ 公钥文件不存在" -ForegroundColor Red
}

# 2. 检查远程仓库配置
Write-Host "`n2. 检查Git远程配置..." -ForegroundColor Yellow
$remoteUrl = git config --get remote.origin.url
if ($remoteUrl) {
    Write-Host "   ✓ 远程URL: $remoteUrl" -ForegroundColor Green
    
    if ($remoteUrl -like "*git@github.com*") {
        Write-Host "   ✓ 使用SSH协议" -ForegroundColor Green
    } elseif ($remoteUrl -like "*https://github.com*") {
        Write-Host "   ⚠ 使用HTTPS协议（建议切换到SSH）" -ForegroundColor Yellow
    } else {
        Write-Host "   ? 未知协议" -ForegroundColor Gray
    }
} else {
    Write-Host "   ✗ 未配置远程仓库" -ForegroundColor Red
}

# 3. 测试SSH连接到GitHub
Write-Host "`n3. 测试SSH连接到GitHub..." -ForegroundColor Yellow
Write-Host "   运行: ssh -T git@github.com" -ForegroundColor Gray
$sshTest = ssh -T git@github.com 2>&1

if ($LASTEXITCODE -eq 0 -or $sshTest -like "*successfully authenticated*") {
    Write-Host "   ✓ SSH连接成功！" -ForegroundColor Green
    Write-Host "   输出: $sshTest" -ForegroundColor Gray
} else {
    Write-Host "   ✗ SSH连接失败" -ForegroundColor Red
    Write-Host "   错误信息: $sshTest" -ForegroundColor Red
    Write-Host "`n   可能的原因:" -ForegroundColor Yellow
    Write-Host "   1. SSH公钥未添加到GitHub账户" -ForegroundColor Gray
    Write-Host "   2. 防火墙阻止SSH端口（22）" -ForegroundColor Gray
    Write-Host "   3. 网络连接问题" -ForegroundColor Gray
    Write-Host "`n   请参考 docs/SSH_SETUP.md 完成设置" -ForegroundColor Cyan
}

# 4. 检查SSH代理
Write-Host "`n4. 检查SSH代理..." -ForegroundColor Yellow
$agentProcess = Get-Process ssh-agent -ErrorAction SilentlyContinue
if ($agentProcess) {
    Write-Host "   ✓ SSH代理正在运行" -ForegroundColor Green
} else {
    Write-Host "   ⚠ SSH代理未运行" -ForegroundColor Yellow
    Write-Host "   可以运行以下命令启动代理:" -ForegroundColor Gray
    Write-Host "   eval `$(ssh-agent -s)" -ForegroundColor White
    Write-Host "   ssh-add ~/.ssh/id_ed25519" -ForegroundColor White
}

# 5. 网络连接测试
Write-Host "`n5. 网络连接测试..." -ForegroundColor Yellow
Write-Host "   测试到GitHub.com的连通性..." -ForegroundColor Gray

try {
    $pingResult = Test-Connection github.com -Count 2 -ErrorAction Stop
    Write-Host "   ✓ 网络连通性正常" -ForegroundColor Green
    Write-Host "   延迟: $($pingResult[0].ResponseTime)ms" -ForegroundColor Gray
} catch {
    Write-Host "   ✗ 网络连接失败" -ForegroundColor Red
}

Write-Host "`n=== 测试完成 ===" -ForegroundColor Cyan
Write-Host "`n下一步操作:" -ForegroundColor Yellow
Write-Host "1. 如果SSH连接失败，请将SSH公钥添加到GitHub" -ForegroundColor Gray
Write-Host "2. 参考 docs/SSH_SETUP.md 获取详细指南" -ForegroundColor Gray
Write-Host "3. 添加密钥后，重新运行此脚本测试连接" -ForegroundColor Gray
