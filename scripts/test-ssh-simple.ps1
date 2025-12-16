# 简单的SSH连接测试脚本
Write-Host "=== SSH连接测试 ===" -ForegroundColor Cyan

# 1. 显示SSH公钥
Write-Host "`n1. SSH公钥内容:" -ForegroundColor Yellow
$publicKey = "$env:USERPROFILE\.ssh\id_ed25519.pub"
if (Test-Path $publicKey) {
    Get-Content $publicKey
} else {
    Write-Host "公钥文件不存在" -ForegroundColor Red
}

# 2. 检查远程URL
Write-Host "`n2. Git远程配置:" -ForegroundColor Yellow
git remote -v

# 3. 测试SSH连接
Write-Host "`n3. 测试SSH连接到GitHub:" -ForegroundColor Yellow
ssh -T git@github.com

# 4. 显示状态
Write-Host "`n4. 状态总结:" -ForegroundColor Yellow
if ($LASTEXITCODE -eq 0) {
    Write-Host "SSH连接成功！" -ForegroundColor Green
    Write-Host "现在可以推送代码到GitHub" -ForegroundColor Green
} else {
    Write-Host "SSH连接失败" -ForegroundColor Red
    Write-Host "请将上面的SSH公钥添加到GitHub账户" -ForegroundColor Yellow
    Write-Host "参考: docs/SSH_SETUP.md" -ForegroundColor Cyan
}
