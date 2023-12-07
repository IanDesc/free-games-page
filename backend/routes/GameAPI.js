const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const { success, fail } = require("../helpers/resposta");
const { authenticateToken } = require("../auth/gameAuth");

const redis = require('redis');
const client = redis.createClient({
  host: 'localhost',
  port: 6379,
  password: '',  
});

client.on('error', (err) => {
  console.error(`Erro no Redis: ${err}`);
});

const ensureRedisConnection = () => {
  if (!client.connected) {
    console.error('O cliente Redis não está conectado.');
    return false;
  }
  return true;
};

const redisMiddleware = (req, res, next) => {
  console.log('Middleware Redis: Invalidando o cache...');
  if (ensureRedisConnection()) {
    client.del('chave_cache', (err, reply) => {
      if (err) {
        console.error(`Erro ao invalidar o cache: ${err}`);
      } else {
        console.log('Middleware Redis: Cache invalidado com sucesso.');
      }
      next();
    });
  } else {
    next(); 
  }
};

router.post("/", authenticateToken, redisMiddleware, async (req, res) => {
  console.log('Rota POST: Recebendo solicitação...');
  const { title, short_description, game_url, genre, platform, release_date, publisher } = req.body;

  try {
    console.log('Rota POST: Tentando salvar no banco de dados...');
    const newGame = await gameController.save(title, short_description, game_url, genre, platform, release_date, publisher);
    console.log('Rota POST: Operação de salvar no banco de dados concluída.');

    console.log('Rota POST: Invalidando o cache após a operação de salvar...');
    if (ensureRedisConnection()) {
      client.del('chave_cache', (err, reply) => {
        if (err) {
          console.error(`Erro ao invalidar o cache: ${err}`);
        } else {
          console.log('Rota POST: Cache invalidado após operação de salvar.');
        }
      });
    }
    
    res.json(success(newGame, "Sucesso"));
  } catch (error) {
    console.error('Rota POST: Erro ao salvar no banco de dados:', error);
    res.status(500).json(fail("Erro"));
  }
});

router.get("/", async (req, res) => {
  console.log('Rota GET: Tentando obter dados do cache...');
  if (ensureRedisConnection()) {
    client.get('chave_cache', async (err, cachedData) => {
      if (err) {
        console.error(`Erro ao obter dados do cache: ${err}`);
        res.status(500).json(fail("Erro"));
      } else if (cachedData) {
        console.log('Rota GET: Dados obtidos do cache.');
        res.json(JSON.parse(cachedData));
      } else {
        console.log('Rota GET: Dados não encontrados no cache. Buscando no banco de dados...');
        try {
          const games = await gameController.list();
          console.log('Rota GET: Dados obtidos do banco de dados. Armazenando em cache...');
          if (ensureRedisConnection()) {
            client.setex('chave_cache', 300, JSON.stringify(games), (err) => {
              if (err) {
                console.error(`Erro ao armazenar dados em cache: ${err}`);
              } else {
                console.log('Rota GET: Dados armazenados em cache.');
              }
              res.json(games);
            });
          } else {
            res.json(games); // Continuar sem armazenar em cache se a conexão com o Redis falhar
          }
        } catch (error) {
          console.error('Rota GET: Erro ao obter dados do banco de dados:', error);
          res.status(500).json(fail("Erro"));
        }
      }
    });
  } else {
    res.status(500).json(fail("Erro na conexão com o Redis"));
  }
});

router.get("/search", async (req, res) => {
  console.log('Rota SEARCH: Recebendo solicitação...');
  const { substring } = req.query;

  try {
    console.log('Rota SEARCH: Tentando obter dados do cache de pesquisa...');
    const games = await gameController.searchBySubstring(substring);
    console.log('Rota SEARCH: Dados obtidos da pesquisa. Armazenando em cache...');
    if (ensureRedisConnection()) {
      client.setex('chave_cache_search', 300, JSON.stringify(games), (err) => {
        if (err) {
          console.error(`Erro ao armazenar dados em cache: ${err}`);
        } else {
          console.log('Rota SEARCH: Dados armazenados em cache.');
        }
        res.json(success(games, "Resultados da pesquisa por substring"));
      });
    } else {
      res.json(success(games, "Resultados da pesquisa por substring")); 
    }
  } catch (error) {
    console.error('Rota SEARCH: Erro ao obter dados da pesquisa:', error);
    res.status(500).json(fail("Erro na pesquisa por substring"));
  }
});

module.exports = router;
