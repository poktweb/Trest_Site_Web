// Serverless function adapter para Trest na Vercel
// Este arquivo adapta o servidor HTTP do Trest para funcionar como serverless function

const path = require('path');

// Caminho do arquivo Trest - ajustado para src/main.trest
const TREST_FILE = path.join(__dirname, '../src/main.trest');

// O Trest v2.5.1 agora suporta execução serverless diretamente
// Importar e executar o Trest como módulo
module.exports = async (req, res) => {
  try {
    // A versão 2.5.1 do Trest suporta execução serverless
    // O runtime Trest será executado automaticamente pela Vercel
    
    // Preparar a requisição no formato esperado pelo Trest
    const trestRequest = {
      method: req.method,
      url: req.url,
      pathname: req.url.split('?')[0],
      query: req.query || {},
      headers: req.headers || {},
      body: req.body || {},
      ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress
    };

    // Executar o código Trest via runtime
    // O Trest v2.5.1 processa automaticamente requisições serverless
    const { execSync } = require('child_process');
    const fs = require('fs');

    // Verificar se o arquivo existe
    if (!fs.existsSync(TREST_FILE)) {
      return res.status(500).json({
        error: 'Arquivo Trest não encontrado',
        path: TREST_FILE
      });
    }

    // Executar o Trest e processar a requisição
    // Nota: O Trest v2.5.1 suporta modo serverless
    const env = {
      ...process.env,
      VERCEL: '1',
      REQUEST_METHOD: req.method,
      REQUEST_URL: req.url,
      REQUEST_BODY: JSON.stringify(req.body || {}),
      REQUEST_HEADERS: JSON.stringify(req.headers || {})
    };

    try {
      // Executar o Trest e capturar a saída
      const output = execSync(`trest ${TREST_FILE}`, {
        encoding: 'utf-8',
        env: env,
        maxBuffer: 10 * 1024 * 1024 // 10MB
      });

      // Se o output for JSON, parsear e retornar
      try {
        const response = JSON.parse(output);
        res.status(response.status || 200);
        
        if (response.headers) {
          Object.keys(response.headers).forEach(key => {
            res.setHeader(key, response.headers[key]);
          });
        }

        if (response.body) {
          res.send(response.body);
        } else {
          res.json(response);
        }
      } catch (parseError) {
        // Se não for JSON, tratar como HTML/texto
        res.status(200).send(output);
      }
    } catch (execError) {
      console.error('Erro ao executar Trest:', execError);
      res.status(500).json({
        error: 'Erro ao processar requisição',
        message: execError.message,
        stderr: execError.stderr?.toString() || ''
      });
    }

  } catch (error) {
    console.error('Erro no adapter:', error);
    res.status(500).json({
      error: 'Erro ao processar requisição',
      message: error.message
    });
  }
};
