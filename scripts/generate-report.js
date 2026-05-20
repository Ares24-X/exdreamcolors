/**
 * 每日报告生成脚本
 * 生成AdSense申请进度报告
 */

const fs = require('fs');
const path = require('path');

// 读取数据
function loadData() {
  const ga4Data = JSON.parse(fs.readFileSync('data/ga4-report.json', 'utf-8'));
  const gscData = JSON.parse(fs.readFileSync('data/gsc-report.json', 'utf-8'));
  
  // 统计页面数量
  const pageFiles = require('glob').sync('src/app/**/page.tsx');
  const blogFiles = require('glob').sync('src/app/blog/**/page.mdx');
  
  return {
    ga4: ga4Data,
    gsc: gscData,
    pageCount: pageFiles.length + blogFiles.length,
    blogCount: blogFiles.length
  };
}

// 生成报告
function generateReport(data) {
  const today = new Date().toISOString().split('T')[0];
  
  const report = `# exdreamcolors 每日数据报告

📅 报告日期：${today}

## 📊 网站概况

| 指标 | 数值 | 状态 |
|------|------|------|
| 总页面数 | ${data.pageCount} | ${data.pageCount >= 50 ? '✅ 达标' : `⚠️ 还需 ${50 - data.pageCount} 页`} |
| 博客文章数 | ${data.blogCount} | ${data.blogCount >= 35 ? '✅ 达标' : `⚠️ 还需 ${35 - data.blogCount} 篇`} |

## 🎯 AdSense申请进度

- [ ] 页面数量 ≥ 50页 (${data.pageCount}/50)
- [ ] 博客文章 ≥ 35篇 (${data.blogCount}/35)
- [ ] 隐私政策页面
- [ ] 服务条款页面
- [ ] Cookie政策页面
- [ ] 日PV稳定在100+
- [ ] 外链≥20个

## 📈 今日任务

${generateTodayTasks(data)}

## 📝 备注

- 报告生成时间：${new Date().toLocaleString()}
- 下次报告：明天 08:00 UTC

---
*自动生成的每日报告*
`;
  
  return report;
}

// 生成今日任务
function generateTodayTasks(data) {
  const dayOfMonth = new Date().getDate();
  
  if (dayOfMonth <= 7) {
    return '本周任务：基础完善 + 内容启动\n- 生成政策页面\n- 写工具教程\n- 补充SEO基础内容';
  } else if (dayOfMonth <= 14) {
    return '本周任务：内容爆发期\n- 配色理论文章\n- Tailwind专题\n- 无障碍专题';
  } else if (dayOfMonth <= 21) {
    return '本周任务：SEO优化 + 外链\n- 长尾内容补充\n- 技术SEO优化\n- 外链建设';
  } else {
    return '本周任务：流量冲刺\n- 社区分享\n- 数据监控\n- 申请准备';
  }
}

// 主函数
async function main() {
  const data = loadData();
  const report = generateReport(data);
  
  // 确保目录存在
  if (!fs.existsSync('reports')) {
    fs.mkdirSync('reports');
  }
  
  const reportPath = `reports/daily-report-${new Date().toISOString().split('T')[0]}.md`;
  fs.writeFileSync(reportPath, report);
  
  console.log(`Report generated: ${reportPath}`);
}

main().catch(console.error);
