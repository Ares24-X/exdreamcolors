/**
 * GA4数据获取脚本
 * 自动获取网站流量数据
 */

const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const fs = require('fs');

const PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const CREDENTIALS = JSON.parse(process.env.GA4_CREDENTIALS);

async function fetchGA4Data() {
  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: CREDENTIALS
  });
  
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [
      { startDate: '7daysAgo', endDate: 'today' },
      { startDate: '30daysAgo', endDate: 'today' }
    ],
    dimensions: [
      { name: 'pagePath' },
      { name: 'date' }
    ],
    metrics: [
      { name: 'screenPageViews' },
      { name: 'totalUsers' },
      { name: 'newUsers' },
      { name: 'averageSessionDuration' }
    ]
  });
  
  // 保存数据
  const data = {
    timestamp: new Date().toISOString(),
    report: response
  };
  
  fs.writeFileSync('data/ga4-report.json', JSON.stringify(data, null, 2));
  console.log('GA4 data fetched successfully');
}

fetchGA4Data().catch(console.error);
