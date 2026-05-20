/**
 * GSC数据获取脚本
 * 自动获取搜索控制台数据
 */

const { google } = require('googleapis');
const fs = require('fs');

const CREDENTIALS = JSON.parse(process.env.GSC_CREDENTIALS);
const SITE_URL = 'sc-domain:exdreamcolors.win';

async function fetchGSCData() {
  const auth = new google.auth.GoogleAuth({
    credentials: CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
  });
  
  const searchconsole = google.searchconsole({
    version: 'v1',
    auth
  });
  
  // 获取查询数据
  const [queryResponse] = await searchconsole.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: '2025-01-01',
      endDate: new Date().toISOString().split('T')[0],
      dimensions: ['query'],
      rowLimit: 100
    }
  });
  
  // 获取页面数据
  const [pageResponse] = await searchconsole.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: '2025-01-01',
      endDate: new Date().toISOString().split('T')[0],
      dimensions: ['page'],
      rowLimit: 100
    }
  });
  
  // 保存数据
  const data = {
    timestamp: new Date().toISOString(),
    queries: queryResponse.data.rows,
    pages: pageResponse.data.rows
  };
  
  fs.writeFileSync('data/gsc-report.json', JSON.stringify(data, null, 2));
  console.log('GSC data fetched successfully');
}

fetchGSCData().catch(console.error);
