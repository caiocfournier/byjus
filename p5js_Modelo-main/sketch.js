var aluno = {
  nome: "caio",
  turma: 7,
  numeroMatricula: 7895178,
  materiaFavorita: "ciencias",
  notas: [98, 99, 100, 97, 85]
};

function setup() {
  createCanvas(400, 400);
  console.log(aluno.nome);
  console.log(aluno.materiaFavorita);
}

function draw() {
  background(220);
}