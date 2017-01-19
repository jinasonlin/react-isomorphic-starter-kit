export default function (app) {
  // 服务器部署验证
  app.get('/health', (req, res) => res.status(200).send('OK'));
}
