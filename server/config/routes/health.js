export default function (app) {
  // 服务器部署验证
  app.get('/health', (req, res) => res.status(200).send('OK'));
  app.all('/api/example', (req, res) => {
    res.json({
      code: 0,
      result: 'ok',
    });
  });
}
