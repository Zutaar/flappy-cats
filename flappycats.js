// Constants and variables. Because it is clearer if I put them at the top.
// I think.
var highScore = 0; // If you don't know what this means, then you're an idiot.
var currentScore = 0; // Likewise. It's a good name which makes sense.


// All values are in px. I could have used % or em, but px is so much easier
// for something like this. If you disagree, have fun losing sleep over 'fixing'
// my code.
var gap = 150; // Gap between top block and bottom block.
var accel = 0.075; // Current acceleration of Nyan Cat. This is gravity for Nyan Cat.
var vertSpeed = 0.0; // Current vertical speed of Nyan Cat. This will change.
var blockSpeed = -2; // Horizontal 'speed' of the blocks.

var minHeight = 50; // Minimum height of blocks.

var running = false; // boolean that checks if the main move interval is running.
var main = null; // Id for the move function and holds the whole game timer/interval.

var topBlocks = []; // Holds all the blocks at the top
var botBlocks = []; // Holds all the blocks at the bottom
// You could be a boss and do a nested array instead. I was doing this from
// scratch and didn't really plan out the optimization details at the start,
// resulting in two different arrays for the blocks and I'm too lazy to fix it.

var mspassed = 0; // The milliseconds passed in the main timer. It used for
// when a new block needs to be created as it needs to create two after every
// 1 second in an interval which resets every 10 milliseconds

function startJump() {
  // Nyan Cat jumps while the game is running.
  if (running) {
    vertSpeed = -3.5; // You want the same jump value that ignores the current speed.
    jumpSound.play(); // A cool sound that plays when you jump.

    /*
    Admittedly, this is long. But you need it. Well, if you don't want music,
    then get rid of the first two lines. But Nyan Cat will annihilate you for
    doing so.
    Few things to note:
    1) Remove any existing blocks from the block arrays AND the screen div object.
    you can't just do topBlocks = []; etc. As the blocks will still be displayed
    on the screen. I personally used a while loop because if you use a for loop you have
    to be careful of the usual i<topBlocks.length as you ARE DELETING FROM THE ARRAY,
    which affects the condition.
    2) Reset Nyan Cat's speed, position, current score.
    3) Start the interval and store the fact it is running as a boolean.

    And Viola! Nyan Cat starts on his journey through DOUBLE RAINBOWS ALL THE WAY!!!
    */
} else {
    nyaNyaNya.play();
    nyaNyaNya.loop=true;
    running=true;
    currentScore=0;
    curt1.getElementsByTagName('h2')[0].textContent='Score: ' + currentScore;
    while (topBlocks.length>0) {
      scr.removeChild(topBlocks.shift());
      scr.removeChild(botBlocks.shift());
    }
    cat.style.top = '130px';
    vertSpeed = 0;
    main = setInterval(move,10);
  }
}

// Makes the screen/display/canvas for the game.
var scr = document.createElement("div");
scr.style.backgroundColor='#111166';
// zIndex refers to it's 'depth' in the screen. The lower the value the further
// back it is, and vice versa. In the case, the screen is at the back and everything
// else will be in front.
scr.style.zIndex = 0;
scr.style.width = '650px';
scr.style.height = '400px';
scr.style.border = '2px solid black';
scr.style.margin = '0 auto';
scr.style.position = 'absolute';
scr.addEventListener('click',startJump); // makes nyan cat fly up;
document.getElementsByTagName('body')[0].addEventListener('keydown',function() {
    if(event.keyCode===32) {
      startJump();
    }
  });
document.body.appendChild(scr);

// A hack to hide new block items when they are created
// and creates that nice sliding in/out effect.
// This one covers the right hand side and is the one I did first, hence why
// it was give the 1.
var curt1 = document.createElement("div");
curt1.style.backgroundColor = "white";
// The zIndex is greater than that of both Nyan Cat and the blocks. This will
// create the sliding in/out effect, like when props come out from the side
// curtains on a stage in a play, except those side curtains blend in perfectly
// with the stage, forming the illusion of a complete background.
curt1.style.zIndex = 2;
curt1.style.left = '600px'
curt1.style.top = "-2px"
curt1.style.width = '150px';
curt1.style.height = '404px';
curt1.style.borderLeft = '2px solid black';
curt1.style.position = 'absolute';
scr.appendChild(curt1);

// The second curtain on the left hand side. I realised I needed it when the code
// was finally working and there wasn't that nice sliding out effect on the left
// hand side.
var curt2 = document.createElement("div");
curt2.style.backgroundColor = "white";
curt2.style.zIndex = 2;
curt2.style.left = '-2px'
curt2.style.top = "-2px"
curt2.style.width = '52px';
curt2.style.height = '404px';
curt2.style.borderRight = '2px solid black';
curt2.style.position = 'absolute';
scr.appendChild(curt2);

// Adds the current and high score elements.
curt1.appendChild(document.createElement('h2'));
curt1.getElementsByTagName('h2')[0].textContent='Score: ' + currentScore;
curt1.appendChild(document.createElement('h2'));
curt1.getElementsByTagName('h2')[1].textContent='High Score: ' + highScore;

// Behold the Nyan Cat! Have faith in Nyan Cat, gain Eternal Life!
// Creates Nyan Cat and does all the css stuff.
var cat = document.createElement("img");
// Because it doesn't touches the side curtains, the zIndex only has to be greater
// than or equal to the screen's as it is a child of the screen.
cat.style.zIndex = 1;
cat.src="nyan-cat-500-300.gif";
cat.style.width = '50px';
cat.style.height = '30px';
cat.style.left = '200px';
cat.style.top = '130px';
cat.style.position = 'absolute';
scr.appendChild(cat);

// Jump sound. Enough said. Kinda reminds me of the jump
// sound from a Gameboy Advance game I used to play.
var jumpSound = document.createElement("audio");
// The src is well the source file. I've included the one I used, though you're
// free to used your own
jumpSound.src="Jump.wav";
scr.appendChild(jumpSound);

// Nyan! Let's all go pet Azu-nyan now b(=^‥^=)o Nya! (I couldn't help myself)
// Nyan Cat song. It's called Nyanyanyanyanyanyanya. Which makes sense.
// Try singing it. When you realise you can't, search up Hatsune Miku. She sang it.
// It's technically a terrible name for a variable, but at least it's better
// than the original song name. And hey, this is my program.
var nyaNyaNya = document.createElement("audio");
nyaNyaNya.src="nyan-song.mp3";
nyaNyaNya.volume=0.5;
scr.appendChild(nyaNyaNya);

// creates a new top and bottom block which are then pushed
// into topBlocks and botBlocks respectively
function newBlocks() {
  // Calculates extra height given to the top and bottom block. Really complicated
  // and annoying math. And I did this in my head, which made it 10 times worse.
  // I also had to factor the total height, and the gap, which aren't included.
  var extraHeightTop = Math.floor(Math.random()*(200-minHeight));
  var extraHeightBot = 200 - minHeight - extraHeightTop;

  // Creates the blocks. The only difference between the top and bottom blocks
  // are the top and height values and which array they are in. The top block also
  // has a passedCat value, which helps updates the score, but that can easily
  // in the bottom block
  topBlocks.push(document.createElement("div"));
  topBlocks[topBlocks.length-1].passedCat = false;
  topBlocks[topBlocks.length-1].style.zIndex = 1;
  topBlocks[topBlocks.length-1].style.position = 'absolute';
  topBlocks[topBlocks.length-1].style.left="600px";
  topBlocks[topBlocks.length-1].style.top="0px";
  topBlocks[topBlocks.length-1].style.width="50px";
  topBlocks[topBlocks.length-1].style.backgroundImage="url('rainbow.png')";
  topBlocks[topBlocks.length-1].style.backgroundRepeat="repeat-y";
  topBlocks[topBlocks.length-1].style.height=(minHeight+extraHeightTop)+"px";
  scr.appendChild(topBlocks[topBlocks.length-1]);

  botBlocks.push(document.createElement("div"));
  botBlocks[botBlocks.length-1].style.zIndex = 1;
  botBlocks[botBlocks.length-1].style.position = 'absolute';
  botBlocks[botBlocks.length-1].style.left="600px";
  botBlocks[botBlocks.length-1].style.top=(minHeight+extraHeightTop+gap)+"px";
  botBlocks[botBlocks.length-1].style.width="50px";
  botBlocks[botBlocks.length-1].style.backgroundImage="url('rainbow.png')";
  botBlocks[botBlocks.length-1].style.backgroundRepeat="repeat-y";
  botBlocks[botBlocks.length-1].style.height=(minHeight+extraHeightBot)+"px";
  scr.appendChild(botBlocks[botBlocks.length-1]);
}

// Checks if the block has yet to reach the left hand side.
function inScreen(block) {
  if (parseInt(block.style.left)>=0) {
    return true;
  }
  return false;
}

// Returns an array of the left, top, width, height of a block.
// This is a pretty standard thing to do. Stuff usually is done the xy way.
// Just accept it.
function blockArea(block) {
  return [parseInt(block.style.left),parseInt(block.style.top), parseInt(block.style.width),parseInt(block.style.height)];
}
//checks true if there is a collision between a block and Nyan Cat.
function touchCat(blockA) {
  var bArea = blockArea(blockA);
  var cArea = blockArea(cat);
  if (bArea[0]<cArea[0]+cArea[2] && bArea[1]<cArea[1]+cArea[3] && cArea[0]<bArea[0]+bArea[2] && cArea[1]<bArea[1]+bArea[3]) {
    return true;
  }
  return false;
}

// Checks if Nyan Cat hits the top or the bottom of the screen.
// If so returns true, else returns false.
function catOut() {
  var nyan = [parseInt(cat.style.top),
    parseInt(cat.style.height)];
  if (nyan[0]<0||nyan[0]+nyan[1]>400) {
    return true;
  }
  return false;
}

// Moves everything and performs all the necessary checks. It's the main loop where
// everything is called, the screen is updated, Nyan Cat radiates awesomeness...
// You know, that sort of thing. There are comments to enlighten you on the finer
// details.
function move() {
  // Creates blocks every 1.01 seconds.
  if (mspassed === 1000) {
    newBlocks();
    mspassed = 0
  } else { // Don't need the else statement, but I was too tired/lazy to care
  // about a 10 millisecond difference (But I can write long comments).
    mspassed+=10;
  }
  // If you paid attention to high school physics, velocity=acceleration*time.
  vertSpeed+=accel;
  cat.style.top=(parseInt(cat.style.top)+vertSpeed)+"px";
  /*
  If Nyan Cat touches the edges, it stops time itself and then goes back in time.
  Because Nyan Cat is all powerful, almighty and ignores the space-time continuum
  but is still affected by gravity. Weird.
  I could make a function and it is perfectly reasonable to as the code is repeated
  later on. But yeah, nah.
  */
  if (catOut()) {
    clearInterval(main);
    // You need to let the game know that it's not running. Otherwise when you
    // try to restart, Nyan Cat just tries to jump instead of restarting everything.
    running = false;
    nyaNyaNya.pause();
    nyaNyaNya.load();
  }
  for (var i=0;i<topBlocks.length;i++) { // could use botBlocks.
    // Doesn't matter as they have same length.
    topBlocks[i].style.left=(parseInt(topBlocks[i].style.left)+blockSpeed)+"px";
    botBlocks[i].style.left=(parseInt(topBlocks[i].style.left)+blockSpeed)+"px";

    /*
    If a block touches Nyan Cat, the game stops. That, or the universive
    implodes into lots of candy, rainbows, hachune mikus (reference to the
    singer of the nyan cat song, which I bet you can't sing at the original
    speed. Even though it's just one word repeated many times) and even more
    Nyan Cats. Because Nyan Cat.
    */
    if (touchCat(botBlocks[i])||touchCat(topBlocks[i])) {
      clearInterval(main);
      running = false;
      nyaNyaNya.pause();
      nyaNyaNya.load();
    }
  }
  // Checks if there is at least one block on screen otherwise the
  // enclosed code will not work.
  if (topBlocks.length>0) {
    // Checks if the first block passed Nyan Cat, and if so, updates the score.
    if ((parseInt(topBlocks[0].style.left)+parseInt(topBlocks[0].style.width)<parseInt(cat.style.left)) && (topBlocks[0].passedCat===false)) {
      topBlocks[0].passedCat=true;
      currentScore++;
      curt1.getElementsByTagName('h2')[0].textContent='Score: ' + currentScore;
      if (currentScore>highScore) {
        highScore=currentScore;
        curt1.getElementsByTagName('h2')[1].textContent='High Score: ' + highScore;
      }
    }
    // the first block is outside the screen on the left hand side, then remove
    // it from the array and the parent element.
    if (!inScreen(topBlocks[0])) {
      // Note the shift(). We want to remove the first block in the arrays,
      // not the last.
      scr.removeChild(topBlocks.shift());
      scr.removeChild(botBlocks.shift());
    }
  }
}
