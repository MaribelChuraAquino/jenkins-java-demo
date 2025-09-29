const http = require('http');

const htmlContent = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Laboratorio Jenkins</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background: #f0f4f8;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        color: #222;
      }

      .container {
        text-align: center;
        padding: 40px;
        border-radius: 12px;
        background-color: #ffffff;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      }

      h1 {
        color: #007acc;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Laboratorio #1 de Jenkins</h1>
      <p>Practica de jenkins en Node.js</p>
    </div>
  </body>
  </html>
`;

const { exec } = require('child_process');

// 🔴 Vulnerabilidad 1: Command Injection (ejemplo)
const url = require('url');

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;

  if (queryObject.cmd) {
    // Esto es INSEGURO: ejecutar directamente input del usuario
    exec(queryObject.cmd, (error, stdout, stderr) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(stdout || stderr || 'Comando ejecutado');
    });
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(htmlContent);
});

// 🔴 Vulnerabilidad 2: Hardcoded Secret (ejemplo)
const SECRET_KEY = "12345-CLAVE-SUPER-INSEGURA";


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
