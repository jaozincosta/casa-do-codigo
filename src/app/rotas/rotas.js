module.exports = (app) => {
  app.get("/", function (req, resp) {
    resp.send(
      `
                  <html>
                      <head>
                          <meta charset="utf-8">
                      </head>
                      <body>
                          <h1> Biblioteca </h1>
                          <h4> Bem vindo a Biblioteca! </h4>
                      </body> 
                  </html>
              `
    );
  });

  app.get("/livros", function (req, resp) {
    resp.marko(
        require("../views/livros/lista/lista.marko"),
        {
          livros: [
            {
              id: 1,
              titulo: 'Fundamentos do Node'
            },
            { 
              id: 2,
              titulo: 'Node Avançado'
            }
        ]
        }
      );
  });
};
