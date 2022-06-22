const zoneJeu = document.getElementById('zone-de-jeu');
// consol:e.log(zoneJeu);
const memoryChild = zoneJeu.childNodes;
// console.log(memoryChild)
const gameContent = document.getElementById('content-game');

let card = ["🍏", "🍐", "🍋", "🍑", "🍓", "🥑", "🍍", "🍒", "🍈", "🍉"];
let newCard = card.concat(card);

// console.log(newCard)

let verif = [];
let trouver = [];
console.log(trouver)

let nbrValeur = newCard.length;
console.log(nbrValeur)


function tryCard(newCard){
    newCard.sort(() => Math.random() - 0.5)
}
tryCard(newCard);

function fabriqueDiv (){
    let cartes;
    for (let i = 0; i < nbrValeur; i++){
        cartes = document.createElement('div');
        let front = document.createElement('div');
        let back = document.createElement('div');

        cartes.classList.add('cartes');
        front.classList.add('front');
        back.classList.add('back');

        zoneJeu.append(cartes);
        cartes.append(front);
        back.innerHTML = newCard[i]
        cartes.append(back);
    }
}
fabriqueDiv();



// crer une partie qui permets de retourner lers cartes. Et quand deux cartes sont sélectionner, les retourner une nouvelle fois 
function startGame(){
  memoryChild.forEach(element => {
    element.addEventListener('click', function(){
      if(verif.length < 2){
          element.classList.toggle('rotate');
          verif.push(element);
          console.log(verif)
      }
      if(verif.length == 2){
        // Verif des non correspondance
        if(verif[0].innerHTML !== verif[1].innerHTML){
            setTimeout( function(){
                for(rotate of verif){
                rotate.classList.toggle('rotate');
                verif = [];
                }
            }, 1000);
        }
        // verifie les paires
        if(verif[0].innerHTML == verif[1].innerHTML){
            verif = [];
        }
      }
      winner();
      
    })
  })
}
startGame();

function winner(){
    if(verif[0].innerHTML == verif[1].innerHTML){
      if(verif.location == nbrValeur.lenght)
      gameContent.style.backgroundColor ="red";
  }
}






const rejouer = document.getElementById('rejouer');
rejouer.addEventListener('click', function(){
    window.location.reload()
})






// Une fois l'élément sélectionner il s'initialise avec les valeurs qu'on lui à défini.
function paddedFormat(num) {
    return num < 10 ? "0" + num : num; 
 }
// La fonction startCountDown est le coeur de la minuterie
// setInterval sert à exécuter le timer après chaque secondes (1000 millisecondes) jusqu'a ce qu'il soit détruit avec le clearInterval
function startCountDown(duration, countDown){

    // Les secondes restantes
    let secondsRemaining = duration; 
    let min = 0;
    let sec = 0;

    let countInterval = setInterval(function(){

        // On calcul les minutes et les secondes

        // On calcul les minutes en divisant la valeur remainingSeconds par 60 pour obtenir la valeur des minutes en prenant sa part entière
        min = parseInt(secondsRemaining / 60);
        sec = parseInt(secondsRemaining % 60);
        // console.log(secondsRemaining + "seconds");
        // console.log(min);
        // console.log(sec);

        countDown.textContent = `${paddedFormat(min)}:${paddedFormat(sec)}`;

        // On fait dimunuer la valeur de secondsRemaining et la fonction 
        secondsRemaining = secondsRemaining -1;
        // startCountDown s'éxécutera chaque seconde avec la méthode setInterval
        if(secondsRemaining < 0){
            clearInterval(countInterval);
        }
        

    
    }, 1000);
}
window.onload = function(){
    // Définir la valeur du compte à rebours
    
    let time_minute = 1;
    let time_seconds = 30;
    // window.onload calcule la durée totale en seconde 1min30s = 90s
    // Je converti donc mes minute en seconde
    let duration = time_minute * 60 + time_seconds;

    countDown = document.querySelector('#count-down-timer');
    
    // PaddedFormat = Format rembourer (pour les minute et les seconde quand elle sont à un chiffre elle sont préfixer d'un zero)
    countDown.textContent = `${paddedFormat(time_minute)}:${paddedFormat(time_seconds)}`;

    // J'invoque ensuite la fonction startCountDown 
    // Pour que la minuterie commence à 1m29s on utilise l'opérateur de décrémentation sur la duration
    startCountDown(--duration, countDown);
}

//On crée une date
let fullDate = new Date();

let dateLocale = fullDate.toLocaleString('fr-FR',{
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'});

gameContent.append('Date : ' + dateLocale); 




// Essai confetti 
canvas = document.getElementById("canvas");
// getContext 2d conduit à la création d'un objet CanvasRenderingContext2Dreprésentant un contexte de représentation bi-dimensionnel.
ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
cx = ctx.canvas.width / 2;
cy = ctx.canvas.height / 2;

let confetti = [];
const confettiCount = 300;
const gravity = 0.5;
const terminalVelocity = 5;
const drag = 0.075;
const colors = [
{ front: 'red', back: 'darkred' },
{ front: 'green', back: 'darkgreen' },
{ front: 'blue', back: 'darkblue' },
{ front: 'yellow', back: 'darkyellow' },
{ front: 'orange', back: 'darkorange' },
{ front: 'pink', back: 'darkpink' },
{ front: 'purple', back: 'darkpurple' },
{ front: 'turquoise', back: 'darkturquoise' }];


//-----------Functions--------------
resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cx = ctx.canvas.width / 2;
  cy = ctx.canvas.height / 2;
};

randomRange = (min, max) => Math.random() * (max - min) + min;

initConfetti = () => {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      color: colors[Math.floor(randomRange(0, colors.length))],
      dimensions: {
        x: randomRange(10, 20),
        y: randomRange(10, 30) },

      position: {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1 },

      rotation: randomRange(0, 2 * Math.PI),
      scale: {
        x: 1,
        y: 1 },

      velocity: {
        x: randomRange(-25, 25),
        y: randomRange(0, -50) } });


  }
};

//---------Render-----------
render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((confetto, index) => {
    let width = confetto.dimensions.x * confetto.scale.x;
    let height = confetto.dimensions.y * confetto.scale.y;

    // Move canvas to position and rotate
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);

    // Apply forces to velocity
    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
    confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

    // Set position
    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;

    // Delete confetti when out of frame
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

    // Loop confetto x position
    if (confetto.position.x > canvas.width) confetto.position.x = 0;
    if (confetto.position.x < 0) confetto.position.x = canvas.width;

    // Spin confetto by scaling y
    confetto.scale.y = Math.cos(confetto.position.y * 0.1);
    ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

    // Draw confetti
    ctx.fillRect(-width / 2, -height / 2, width, height);

    // Reset transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });

  // Fire off another round of confetti
  if (confetti.length <= 10) initConfetti();

  window.requestAnimationFrame(render);
};

//---------Execution--------
initConfetti();
render();

//----------Resize----------
window.addEventListener('resize', function () {
  resizeCanvas();
});

//------------Click------------
// window.addEventListener('click', function () {
//   initConfetti();
// });

