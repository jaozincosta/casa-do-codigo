class LivroDao {
  constructor(db) {
    this._db = db;
  }

  adiciona(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `
        INSERT INTO livros (
          titulo,
          preco,
          descricao
        ) VALUES (?, ?, ?)
        `,
        [livro.titulo, livro.preco, livro.descricao],
        function (err) {
          if (err) {
            console.log(err);
            return reject("Não foi possível adicionar o livro!");
          }

          resolve();
        }
      );
    });
  }

  lista() {
    return new Promise((resolve, reject) => {
      this._db.all("SELECT * FROM livros", (erro, resultados) => {
        if (erro) return reject("Não foi possível listar os livros!");
        return resolve(resultados);
      });
    });
  }

  buscaPorId(id) {
    return new Promise((resolve, reject) => {
      this._db.get(
        "SELECT * FROM livros WHERE id = ?",
        [id],
        (erro, resultado) => {
          if (erro) {
            return reject("Não foi possível encontrar o livro!");
          }
          return resolve(resultado);
        }
      );
    });
  }

  atualiza(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `
        UPDATE livros 
        SET 
          titulo = ?, 
          preco = ?, 
          descricao = ?
        WHERE id = ?
        `,
        [livro.titulo, livro.preco, livro.descricao, livro.id],
        function (erro) {
          if (erro) {
            return reject("Não foi possível atualizar o livro!");
          }

          return resolve();
        }
      );
    });
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      this._db.run(`DELETE FROM livros WHERE id = ?`, [id], function (erro) {
        if (erro) {
          return reject("Não foi possível remover o livro!");
        }

        return resolve();
      });
    });
  }
}

module.exports = LivroDao;
