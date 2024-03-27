var HttpsProxyAgent = require('https-proxy-agent');
// TODO: changed proxy to UAT

var proxyConfig = [
    {
        context: '/api',
        target: 'https://marketplacedev.gammasprint.com/',
        secure: false,
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
    },
];

function setupForCorporateProxy(proxyConfig) {
    var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
    if (proxyServer) {
        var agent = new HttpsProxyAgent(proxyServer);
        console.log('Using corporate proxy server: ' + proxyServer);
        proxyConfig.forEach(function (entry) {
            entry.agent = agent;
        });
    }
    return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);
