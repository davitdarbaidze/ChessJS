var SQUARE_WIDTH = 50;
var SQUARE_HEIGHT = 50;
var rect;
var OFF_SET_FROMTOP = 40;
var BLACK_HIGH_CLASS_FIGURES_STARTING_LOCATION = 390;
var elem;
var playerOneScore = 0;
var playerTwoScore = 0;
var STATISTICS_OFFSET_FROM_BOARD = 5;
var playerOne;
var playerTwo;
var pauseBox;
var pause = true;


function start(){
    
    makeGrid();
    mouseClickMethod(click);
    setupFigures();
    //setTimer(players,50);
    playerOne = new Text("White's score: " + playerOneScore,"15pt Arial");
    playerTwo = new Text("Blacks's score: " + playerTwoScore,"15pt Arial");
    players();
    keyDownMethod(keyDown);
}
//function responsible to pause the game if P on keyboard is clicked
function keyDown(e){
    
    if (e.keyCode == Keyboard.letter('P') && pause == true){
        
        pauseBox = new Rectangle(getWidth(),getHeight());
        pauseBox.setColor(Color.black);
        pauseBox.setPosition(0,0);
        add(pauseBox);
        pause = false;
    }else if(e.keyCode == Keyboard.letter('P') && pause == false){
        remove(pauseBox);
        pause = true;
    }
}
//function which displays statistics of players 
function players(){
    playerOne.setText("White's score: " + playerOneScore);
    playerOne.setPosition(getWidth()/2,playerOne.getHeight()+STATISTICS_OFFSET_FROM_BOARD);
    playerTwo.setText("Blacks's score: " + playerTwoScore);
    playerTwo.setPosition(getWidth()/2,getHeight()-playerTwo.getHeight()+STATISTICS_OFFSET_FROM_BOARD);
    add(playerOne);
    add(playerTwo);
}
//function for monitoring the clicks on canvas
function click(e){
    elem = getElementAt(e.getX(),e.getY());
    if(elem == null){
        //do nothing, prevents clicking on whitespace to cause an error
    }else if(elem.getType() == "Rectangle"){
        //if clicked on rectangle does nothing, otherwise rectangle would be also moved like figures are.
    }else{
        mouseClickMethod(changePosition);
    }
    //checkFigure(elem.getType());
    //print(elem.getType());
    
}

//function which acts similarly like click() function but this one also moves

function changePosition(e){
    
    var currentPosition = getElementAt(e.getX(),e.getY());
    
    if(currentPosition.getType() == "Rectangle"){
        elem.setPosition(currentPosition.getX(),currentPosition.getY());
        elem = null;
        mouseClickMethod(click);
    }else if(currentPosition != "Rectangle"){
        if(currentPosition.getType() == 'BPAWN' || 
           currentPosition.getType() == 'BKNIGHT' ||
           currentPosition.getType() == 'BROOK'||
           currentPosition.getType() == 'BBISHOP' ||
           currentPosition.getType() == 'BKING' || 
           currentPosition.getType() == 'BQUEEN'){
            playerOneScore++;
            players();
        }else{
            playerTwoScore++;
            players();
        }
        remove(currentPosition);
        elem.setPosition(currentPosition.getX(),currentPosition.getY());
        elem = null;
        mouseClickMethod(click);
    }
    
    
}
function makeGrid(){
    var moveYlocation = 0;
    for(var i = 0; i < 8; i++){
        if(i % 2 == 0){
            makeRect(0,moveYlocation);
        }else{
            makeRect(1,moveYlocation);
        }
        moveYlocation += SQUARE_HEIGHT;
        
    }
}
function makeRect(count,yLocation){
    for (var i = 0; i < getWidth(); i+=SQUARE_WIDTH){
        rect = new Rectangle(SQUARE_WIDTH,SQUARE_HEIGHT);
        rect.setPosition(i,yLocation+OFF_SET_FROMTOP);
        
        if(count % 2 == 0){
            rect.setColor(Color.red);
        }else{
            rect.setColor("blue");
        }
        count++;
        add(rect);
    }
}
function figure(link,type,locationX,locationY){
    var txt = new WebImage(link);
    txt.setSize(50,50);
    txt.setType(type);
    //txt.setColor(color);
    txt.setPosition(locationX,locationY);
    add(txt);
}
function setupFigures(){
    var count = 0;    
    //ROOK
    figure("https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg","BROOK",0,BLACK_HIGH_CLASS_FIGURES_STARTING_LOCATION);
    figure("https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg","BROOK",350,BLACK_HIGH_CLASS_FIGURES_STARTING_LOCATION);
    figure("https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg","WROOK",0,OFF_SET_FROMTOP);
    figure("https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg","WROOK",350,OFF_SET_FROMTOP);
    
    //KNIGHT
    figure("https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg","BKNIGHT",50,BLACK_HIGH_CLASS_FIGURES_STARTING_LOCATION);
    figure("https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg","BKNIGHT",300,BLACK_HIGH_CLASS_FIGURES_STARTING_LOCATION);
    figure("https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg","WKNIGHT",50,OFF_SET_FROMTOP);
    figure("https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg","WKNIGHT",300,OFF_SET_FROMTOP);
    
    //BISHOP
    figure("https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg","BBISHOP",100,BLACK_HIGH_CLASS_FIGURES_STARTING_LOCATION);
    figure("https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg","BBISHOP",250,BLACK_HIGH_CLASS_FIGURES_STARTING_LOCATION);
    figure("https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg","WBISHOP",100,OFF_SET_FROMTOP);
    figure("https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg","WBISHOP",250,OFF_SET_FROMTOP);
    
    //KING
    figure("https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg","BKING",200,BLACK_HIGH_CLASS_FIGURES_STARTING_LOCATION);
    figure("https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg","WKING",200,OFF_SET_FROMTOP);
    
    //QUEEN
    figure("https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg","BQUEEN",150,BLACK_HIGH_CLASS_FIGURES_STARTING_LOCATION);
    figure("https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg","WQUEEN",150,OFF_SET_FROMTOP);
    
    //PAWN
    for(var i = 0; i < 8; i++){
       figure("https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg","BPAWN",count,BLACK_HIGH_CLASS_FIGURES_STARTING_LOCATION-SQUARE_HEIGHT); 
       figure("https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg","WPAWN",count,OFF_SET_FROMTOP * 2 + 5);
       count +=50;
    }
    
    

    
}