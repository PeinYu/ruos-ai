const fs = require('fs');
const path = require('path');

console.log('🔍 Checking AndroidX configuration...');

// Check gradle.properties files
const rootGradleProps = path.join(__dirname, 'gradle.properties');
const androidGradleProps = path.join(__dirname, 'android', 'gradle.properties');

console.log('\n📁 Checking root gradle.properties:');
if (fs.existsSync(rootGradleProps)) {
    const content = fs.readFileSync(rootGradleProps, 'utf8');
    const useAndroidX = content.includes('android.useAndroidX=true');
    const enableJetifier = content.includes('android.enableJetifier=true');
    console.log(`  ✅ android.useAndroidX=true: ${useAndroidX}`);
    console.log(`  ✅ android.enableJetifier=true: ${enableJetifier}`);
} else {
    console.log('  ❌ gradle.properties not found');
}

console.log('\n📁 Checking android/gradle.properties:');
if (fs.existsSync(androidGradleProps)) {
    const content = fs.readFileSync(androidGradleProps, 'utf8');
    const useAndroidX = content.includes('android.useAndroidX=true');
    const enableJetifier = content.includes('android.enableJetifier=true');
    console.log(`  ✅ android.useAndroidX=true: ${useAndroidX}`);
    console.log(`  ✅ android.enableJetifier=true: ${enableJetifier}`);
} else {
    console.log('  ❌ android/gradle.properties not found');
}

// Check build.gradle files for conflicting project.ext settings
const appBuildGradle = path.join(__dirname, 'android', 'app', 'build.gradle');
const rootBuildGradle = path.join(__dirname, 'android', 'build.gradle');

console.log('\n📁 Checking android/app/build.gradle for conflicting settings:');
if (fs.existsSync(appBuildGradle)) {
    const content = fs.readFileSync(appBuildGradle, 'utf8');
    const hasProjectExt = content.includes('project.ext') && content.includes('android.useAndroidX');
    console.log(`  ${hasProjectExt ? '❌' : '✅'} project.ext android.useAndroidX: ${hasProjectExt ? 'FOUND (CONFLICT)' : 'NOT FOUND (GOOD)'}`);
} else {
    console.log('  ❌ android/app/build.gradle not found');
}

console.log('\n📁 Checking android/build.gradle for conflicting settings:');
if (fs.existsSync(rootBuildGradle)) {
    const content = fs.readFileSync(rootBuildGradle, 'utf8');
    const hasProjectExt = content.includes('project.ext') && content.includes('android.useAndroidX');
    console.log(`  ${hasProjectExt ? '❌' : '✅'} project.ext android.useAndroidX: ${hasProjectExt ? 'FOUND (CONFLICT)' : 'NOT FOUND (GOOD)'}`);
} else {
    console.log('  ❌ android/build.gradle not found');
}

console.log('\n🎯 AndroidX configuration check completed!');
