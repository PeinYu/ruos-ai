#!/bin/bash

# Bash脚本：生成Android签名密钥并配置GitHub Secrets指南
# 适用于Linux/Mac系统

echo "========================================="
echo "Ruos-AI Android签名密钥生成脚本"
echo "========================================="
echo ""

# 检查Java是否安装
echo "检查Java环境..."
if ! command -v java &> /dev/null; then
    echo "错误: Java未安装或未添加到PATH" >&2
    echo "请先安装Java JDK 8或更高版本" >&2
    echo "下载地址: https://adoptium.net/"
    exit 1
fi

java_version=$(java -version 2>&1 | head -n 1)
echo "Java已安装: $java_version"

# 设置参数
KEYSTORE_FILE="ruosai.keystore"
KEYSTORE_PASSWORD="ruosai2025"
KEY_ALIAS="ruosai"
KEY_PASSWORD="ruosai2025"
VALIDITY_DAYS=10000

echo ""
echo "生成参数:"
echo "- Keystore文件: $KEYSTORE_FILE"
echo "- Keystore密码: $KEYSTORE_PASSWORD"
echo "- 密钥别名: $KEY_ALIAS"
echo "- 别名密码: $KEY_PASSWORD"
echo "- 有效期: $VALIDITY_DAYS 天"
echo ""

# 提示用户输入信息
echo "请输入以下信息（按Enter使用默认值）:"

read -p "名字与姓氏 (如: John Doe): " FIRST_NAME
FIRST_NAME=${FIRST_NAME:-"RuosAI Developer"}

read -p "组织单位名称 (如: Development): " ORGANIZATIONAL_UNIT
ORGANIZATIONAL_UNIT=${ORGANIZATIONAL_UNIT:-"Development"}

read -p "组织名称 (如: RuosAI): " ORGANIZATION
ORGANIZATION=${ORGANIZATION:-"RuosAI"}

read -p "城市名称 (如: Beijing): " CITY
CITY=${CITY:-"Beijing"}

read -p "省份名称 (如: Beijing): " STATE
STATE=${STATE:-"Beijing"}

read -p "国家代码 (2字母，如: CN): " COUNTRY_CODE
COUNTRY_CODE=${COUNTRY_CODE:-"CN"}

echo ""
echo "生成密钥库文件..."

# 生成keystore文件
keytool -genkey -v \
  -keystore "$KEYSTORE_FILE" \
  -alias "$KEY_ALIAS" \
  -keyalg RSA \
  -keysize 2048 \
  -validity "$VALIDITY_DAYS" \
  -storepass "$KEYSTORE_PASSWORD" \
  -keypass "$KEY_PASSWORD" \
  -dname "CN=$FIRST_NAME, OU=$ORGANIZATIONAL_UNIT, O=$ORGANIZATION, L=$CITY, ST=$STATE, C=$COUNTRY_CODE"

if [ $? -ne 0 ]; then
    echo "错误: 生成keystore文件失败" >&2
    exit 1
fi

echo ""
echo "✅ Keystore文件生成成功: $KEYSTORE_FILE"

# 验证keystore文件
echo ""
echo "验证生成的keystore文件..."
keytool -list -v -keystore "$KEYSTORE_FILE" -storepass "$KEYSTORE_PASSWORD"

if [ $? -ne 0 ]; then
    echo "警告: 验证keystore文件时出现问题" >&2
fi

# 转换为Base64
echo ""
echo "将keystore文件转换为Base64编码..."
BASE64_FILE="keystore_base64.txt"
base64 -i "$KEYSTORE_FILE" | tr -d '\n' > "$BASE64_FILE"

if [ $? -ne 0 ]; then
    echo "错误: 转换为Base64失败" >&2
    exit 1
fi

echo "✅ Base64文件生成成功: $BASE64_FILE"
FILE_SIZE=$(wc -c < "$BASE64_FILE")
echo "文件大小: $FILE_SIZE 字符"

# 显示GitHub Secrets配置指南
echo ""
echo "========================================="
echo "GitHub Secrets 配置指南"
echo "========================================="
echo ""
echo "请按照以下步骤在GitHub仓库中配置Secrets:"
echo ""
echo "1. 打开GitHub仓库页面"
echo "2. 点击 'Settings' → 'Secrets and variables' → 'Actions'"
echo "3. 点击 'New repository secret'"
echo ""
echo "需要添加以下4个Secrets:"
echo ""
echo "Secret名称: ANDROID_KEYSTORE_BASE64"
echo "值: 从 $BASE64_FILE 文件复制全部内容"
echo ""
echo "Secret名称: KEYSTORE_PASSWORD"
echo "值: $KEYSTORE_PASSWORD"
echo ""
echo "Secret名称: KEYSTORE_ALIAS"
echo "值: $KEY_ALIAS"
echo ""
echo "Secret名称: KEYSTORE_ALIAS_PASSWORD"
echo "值: $KEY_PASSWORD"
echo ""
echo "4. 保存所有Secrets"
echo ""
echo "✅ 配置完成后，GitHub Actions将能够构建签名的Release APK"
echo ""
echo "重要安全提示:"
echo "- 不要将 $KEYSTORE_FILE 提交到Git仓库"
echo "- 妥善保管keystore文件和密码"
echo "- 定期更新签名密钥"

# 显示Base64内容的前100个字符作为示例
echo ""
echo "Base64内容预览（前100字符）:"
head -c 100 "$BASE64_FILE"
echo "..."
