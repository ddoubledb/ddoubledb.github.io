
var canvas;
var context;
/*
    var canvas;     //html 문서에서 id=pCanvas DOM 저장하기 위한 변수
    var context;    //context 저장하기 위한 변수.
*/

var ballArr = new Array();
/*
    공을 담을 배열을 선업합니다. 공의 개수가 동적이므로 배열을 사용했습니다.
*/
/*
    공의 객체를 만들기 위한 클래스 선언.
    최대한 타언어의 클래스와 비슷하게 만들으려 했습니다.
    공을 만들때마다 간편하게 사용하기 위해서 사용했습니다.
*/
var Ball = (function() {
    /* 생성자 */
    function Ball_(number) {
        this.num = parseInt(number);
        this.ballSize = 19;
        this.ballX = parseInt(Math.random()*700 + 40);
        this.ballY = parseInt(Math.random()*450 + 40);
        this.ballVx = -3;
        this.ballVy = -4;
        this.speed_x = parseInt(Math.random()*2);
        this.speed_y = parseInt(Math.random()*2);
    }
    /*
        ballX = 500;       //처음 시작할 때 공의 x 좌표.
        ballY = 200;       //처음 시작할 때 공의 y 좌표.
        ballVx = 2;        //처음 시작할 때 공의 x 증가량.
        ballVy = 2;        //처음 시작할 때 공의 y 증가량. 곧 속도를 의미합니다.
        score = 0;          //게임 점수를 담기위한 변수.
        speed_x = 0;        //x로의 추가 속도를 의미합니다.
        speed_y = 0;        //y로의 추가 속도를 의미합니다.
        index = true;       //현재 공의 변화값이 음수인지 아닌지 나타내는 변수입니다.
    */
    Ball_.prototype.start = function() {
        this.ballSize = 19;
        this.ballX = parseInt(Math.random()*600 + 40);
        this.ballY = parseInt(Math.random()*200 + 40);
        this.ballVx = 3;
        this.ballVy = 4;
        this.speed_x = parseInt(Math.random()*2);
        this.speed_y = parseInt(Math.random()*2);
    };
    /*
        게임이 새로 시작될 때마다 각 데이터르르 초기화 시켜주는 작업입니다.
        공의 크기, 초기 공의 속도, 그리고 추가 속도입니다.
        추가속도는 공의 개수에 따라 각각 다르며 1씩 증가합니다.
    */
    Ball_.prototype.checkHorizontal = function() {
    if(this.ballX >= barX - this.ballSize/2 && this.ballX <= barX + 160 + this.ballSize/2) {
            /*
            if(this.ballVx > 0) {
                var tmp = this.ballX % 2;
                if(tmp==0) this.ballVx = 3 + this.speed_x;
                else this.ballVx = 4+this.speed_x;
            }
            else {
                var tmp = this.ballX * (-1);
                tmp %=2;
                if(tmp==0) this.ballVx = -3-this.speed_x;
                else this.ballVx = -4-this.speed_x;
            }
            if(this.ballVy > 0) {
                var tmp = this.ballY % 2;
                if(tmp==0) this.ballVy = 4+this.speed_y;
                else this.ballVy = 3+this.speed_y;
            }
            else {
                var tmp = this.ballVy * (-1);
                tmp %=2;
                if(tmp==0) this.ballVy = -4 -this.speed_y;
                else this.ballVy = -3-this.speed_y;
            }
            */

            this.ballVy *= -1;
            score += 10;
            document.getElementById("p6").innerHTML = "점수 : " + score;
        }
        else {
            if(ballArr.length>=2) {
                ballArr.splice(ballArr.indexOf(this), 1);
            }
            else {
                ballArr.splice(ballArr.indexOf(this), 1);
                gameSet();
            }
        }
    };
    /*
        가로 패들에 대해서 공이 패들에 부딪혔는가 아닌가 체크하는 검사입니다.
        만약 공이 패들의 왼쪽과 오른쪽 좌표 사이에 없다면 그 공은 없어지구요.
        모든 공이 죽을 경우 게임이 끝이납니다.
    */
    Ball_.prototype.checkVertical = function() {
        if(this.ballY >= barY - this.ballSize/2 && this.ballY <= barY + 160 + this.ballSize/2) {
            /*
            if(this.ballVx > 0) {
                var tmp = this.ballX % 2;
                if(tmp==0) this.ballVx = 3+this.speed_x;
                else this.ballVx = 4+this.speed_x;
            }
            else {
            var tmp = this.ballX * (-1);
                tmp %=2;
                if(tmp==0) this.ballVx = -3-this.speed_x;
                else this.ballVx = -4-this.speed_x;
            }
            if(this.ballVy > 0) {
                var tmp = this.ballY % 2;
                if(tmp==0) this.ballVy = 4+this.speed_y;
                else this.ballVy = 3+this.speed_y;
            }
            else {
                var tmp = this.ballVy * (-1);
                tmp %=2;
                if(tmp==0) this.ballVy = -4 -this.speed_y;
                else this.ballVy = -3-this.speed_y;
            }*/
            this.ballVx *= -1;
            score += 10;
            document.getElementById("p6").innerHTML = "점수 : " + score;
        }
        else {
            if(ballArr.length>=2) {
                ballArr.splice(ballArr.indexOf(this), 1);
            }
            else {
                ballArr.splice(ballArr.indexOf(this), 1);
                gameSet();
            }
        }
    };
    /*
        세로 패들에 대해서 공이 패들에 부딪혔는가 아닌가 체크하는 검사입니다.
        만약 공이 패들의 위쪽과 아래쪽 좌표 사이에 없다면 그 공은 없어지구요.
        모든 공이 죽을 경우 게임이 끝이납니다.
    */
    /*
        공이 패들에 부딪혔을때 공의 속도를 나름의 알고리즘으로 바꿔보았습니다.
        X의 증가량과 Y의 증가량이 각각 1씩 차이가 날때도 있기때문에
        패들과 부딪힐 때마다 이 X의 증가량과 Y의 증가량을 서로 바꿔주고있습니다.
        그러면 계속 가는곳만 가는 공이아닌, 약간씩 방향이 바뀌므로,
        사용자가 덜 지루해할 수 있습니다.
    */
    return Ball_;
})();

var testing;
/*
    공의 객체를 만들고 배열에 넣기까지 필요한 임시변수입니다.
    별다른 의미는 없습니다.
*/

var game_level =1;
var canvasWidth;
var canvasHeight
var barX;
var barY;
var ballSize = 19;

/*
    var game_level =1;  //게임 레벨을 나타낼 변수. 1, 2, 3단계가 있음.
    var canvasWidth;    //게임판(캔버스)의 너비를 나타내는 변수.
    var canvasHeight    //게임판(캔버스)의 높이를 나타내는 변수.
    var barX;          //게임의 바(bar)의 x 좌표
    var barY;          //게읨의 바(bar)의 y 좌표.
    var ballSize = 19; //공 크기의 사이즈. 가면 갈 수록 공의 크기가 줄어들음.
*/

var timer;
var playTimer_1;
var playTimer_15;
var playTimer_30;
var timeLimit = 300;
var image;
var pattern;
var currTime = 0;
var current = false;

/*
    var timer;              //타이머를 위한 변수들입니다
    var playTimer_1;       //1초마다 게임 타이머 실행. 게임의 실행 시간을 체크.
    var playTimer_15;      //대략 15초마다 타이머 실행. 공의 속도를 증가시키기 위한 시간 측정.
    var playTimer_30;      //대략 30초마다 타이머 실행. 공의 크기를 줄이기 위한 시간 측정.
    var timeLimit = 300;    //게임 제한. (현재는 구현 안됨)
    var image;              //image 삽입을 위한 변수.
    var pattern;
    var currTime = 0;      //현재 시간을 담기 위한 변수.
    var current = false;    //이벤트를 리스너에 중복으로 추가시키는것을 방지하기 위함.
*/

var score = 0;
var index = true;
/*
    score은 총 게임 점수를 담기위한 변수입니다.
*/

var init = function() {
    canvas = document.getElementById("pCanvas");
    context = canvas.getContext("2d");
    canvasWidth = document.getElementById("pCanvas").width;
    canvasHeight = document.getElementById("pCanvas").height;

    context.font="bold 40px Georgia white";
    context.fillStyle = "#ffffff";  //<======= and here
    context.fillText("환영합니다!",340,100);
    context.fillText("핑퐁 게임은 총 3단계로 나누어져있으며,", 60, 160);
    context.fillText("아래 버튼을 클릭 시 시작합니다.",150,220);

    context.font="25px Georgia white";
    context.fillText("1, 2, 3단계로 갈 수록 상하좌우의 paddle이 추가됩니다!",140,300);
    context.fillText("시간이 지남에 따라 공의 속도가 빨라지며,", 140, 340);
    context.fillText("25초마다 공의 크기가 줄어듭니다.",140,380);

    document.getElementById("ballNumber").addEventListener("mousewheel", function(e) {
       window.event.cancelBubble=true;
    });
}
/*
    게임 시작전 canvas 와 기타 설명을 쓰기위한 함수입니다.
    실제 게임 방법과 돌아가는 내용은 설명과 다릅니다,
*/

var moving = function(e) {
    context.clearRect(0 , canvasHeight-35, canvasWidth, 35);
    /*
        상하 좌우, 막대기를 그리기 위해 지워주는 작업을 진행함.
    */
    if(game_level == 2) {
        context.clearRect(0 , 0, canvasWidth, 25);
        context.fillRect(e.clientX-90, 20, 160, 5);
    }
    if(game_level == 3) {
        context.clearRect(0 , 0, 25, canvasHeight);
        context.clearRect(0 , 0, canvasWidth, 25);
        context.clearRect(canvasWidth-25 , 0, 25, canvasHeight);
        context.fillRect(e.clientX-90, 20, 160, 5);
        context.rect(20, e.clientY-90, 5, 160);
        context.rect(canvasWidth-25, e.clientY-90, 5, 160);
    }
    /*
        게임레벨이 2와 3일 경우, 위, 왼쪽 오른쪽 막대기를 추가로 그려줌.
    */
    context.rect(e.clientX-90, canvasHeight-30, 160, 5);
    context.fill();
    context.beginPath();

    barX = e.clientX-90;
    barY = e.clientY-90;
    if(current==false) {
        canvas.addEventListener("mousemove", moving, false);
        current = true;
    }
}
/*
    막대기가 움직일때마다 발생하는 이벤트에 대응하는 함수입니다.
    막대기를 다시 그려야 하므로 clearRect 로 부분부분을 지워줬으며
    각 레벨에 따른 막대기 수가 다르므로 if 문을 사용하여
    분기시켜줬습니다.

    또한 current 는 이미 한번 mousemove 이벤트를 리스너에 추가했으므로
    중복으로 추가하지 않기 위한 변수입니다.
*/


var gameSet = function() {
    clearInterval(timer);
    clearInterval(playTimer_1);
    clearInterval(playTimer_15);
    clearInterval(playTimer_30);
    clearInterval(movingBall);
    context.clearRect(0 , 0, canvasWidth, canvasHeight);
    canvas.removeEventListener("mousemove", moving, false);

    context.font="bold 40px Georgia white";
    context.fillStyle = "#ffffff";  //<======= and here
    context.fillText("플레이 시간 : " + currTime + "초!" ,280,200);
    context.fillText("게임 끝!",380,300);
    context.fillText("다시 시작하려면", 300,360);
    context.fillText("아래 버튼을 클릭하세요.",230,420);
}
/*
    gameSet 함수는 게임이 끝날 때 불려지는 함수입니다.
    각 timer들을 끝내주고
    게임이 종료되었다는 안내문을 출력해줍니다.
*/

var movingBall = function() {
    for(var i =0; i<ballArr.length; i++) {
        ballArr[i].ballX += ballArr[i].ballVx;
        ballArr[i].ballY += ballArr[i].ballVy;
    }
        /*
        if(game_level == 2) context.clearRect(0 ,25, canvasWidth, 645);
        else if(game_level == 3) context.clearRect(25 ,25, canvasWidth-49, 645);
        else if(game_level == 1) context.clearRect(0 ,0, canvasWidth, 670);
        */
        context.clearRect(0 ,0, canvasWidth, 670);

        for(var i =0; i<ballArr.length; i++) {
            context.beginPath();
            context.arc(ballArr[i].ballX, ballArr[i].ballY, ballArr[i].ballSize, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
            /*
                공을 그리는 부분입니다. ballArr 에 있는 공의 개수만큼 공을 그려줍니다.
                여기서 공은 각각 위치와 속도가 다르므로 다르게 그려질 수 밖에 없습니다.
            */
        }

        for(var i =0; i<ballArr.length; i++) {
          if(ballArr[i].ballY <= ballArr[i].ballSize - 3)                 ballArr[i].ballVy *= -1;
          if(ballArr[i].ballX <= ballArr[i].ballSize )                    ballArr[i].ballVx *= -1; // 왼쪽
          if(ballArr[i].ballY >= 675 - 7 - ballArr[i].ballSize)           ballArr[i].checkHorizontal();
          if(ballArr[i].ballX >= canvasWidth-ballArr[i].ballSize-1)       ballArr[i].ballVx *= -1; // 오른쪽
        /*
        if(game_level == 2) {
            if(ballArr[i].ballX <= ballArr[i].ballSize )                    ballArr[i].ballVx *= -1; // 왼쪽
            if(ballArr[i].ballX >= canvasWidth-ballArr[i].ballSize -1)      ballArr[i].ballVx *= -1; // 오른쪽
            if(ballArr[i].ballY >= 675 - 7 - ballArr[i].ballSize)           ballArr[i].checkHorizontal();
            if(ballArr[i].ballY <= 30 + ballArr[i].ballSize - 3)            ballArr[i].checkHorizontal(); //위쪽
        } else if(game_level == 3) {
            if(ballArr[i].ballY <= 30 + ballArr[i].ballSize - 3)            ballArr[i].checkHorizontal(); //위쪽
            if(ballArr[i].ballX <= 27 + ballArr[i].ballSize )               ballArr[i].checkVertical(); // 왼쪽
            if(ballArr[i].ballY >= 675 - 7 - ballArr[i].ballSize)           ballArr[i].checkHorizontal();
            if(ballArr[i].ballX >= canvasWidth-25-ballArr[i].ballSize-1)    ballArr[i].checkVertical(); //오른쪽
        }
        else if(game_level==1){
            if(ballArr[i].ballY <= ballArr[i].ballSize - 3)                 ballArr[i].ballVy *= -1;
            if(ballArr[i].ballX <= ballArr[i].ballSize )                    ballArr[i].ballVx *= -1; // 왼쪽
            if(ballArr[i].ballY >= 675 - 7 - ballArr[i].ballSize)           ballArr[i].checkHorizontal();
            if(ballArr[i].ballX >= canvasWidth-ballArr[i].ballSize-1)       ballArr[i].ballVx *= -1; // 오른쪽
        }
        */
    }
}
/*
    공이 움직일 때마다 불려지는 함수입니다.
    각공의 개수마다 반복을 해야하므로 for문을 사용하였습니다.
    game_level에 따라 검사하는 구역이 나눠져야하기 때문에 if 문을 사용하였습니다.
    레벨 1, 4는 아래부분만
    레벨 2, 5는 아래부분을 윗부분을
    레벨 3, 6은 아래 위를 포함한 좌우까지 검사합니다.

    if 문의 계산은 패들의 위치안에 공이 들어왔는가, 아닌가를 체크합니다.
*/
var mouseOut = function(e) {
    current = false;
    canvas.removeEventListener("mousemove", moving, false);
}
/*
    마우스가 캔버스를 나갈 때 발생하는 이벤트 발생시 호출되는 함수입니다.
    더이상 캔버스 위에 마우스가 없으므로 mousemove 이벤트를 리스너에서 제거해줍니다.
*/
var checkTime_1 = function() {
    currTime += 1;
    document.getElementById("p4").innerHTML = currTime;
}
/*
    1초마다 발생하는 함수입니다. 타이머가 1000일때마다 불려집니다.
    현재 시간을 측정하기 위해서 작성되었습니다.
    또한 현재 시간을 페이지에 출력해주고 있습니다.
*/
/*
var checkTime_15= function() {
    for(var i =0; i<ballArr.length; i++) {
        if(index == true) {
            ballArr[i].speed_x += 1;
            index = false;
        } else {
            ballArr[i].speed_y += 1;
            index = true;
        }
    }
    document.getElementById("p5").innerHTML = "현재 공 속도 : " + (ballArr[0].speed_x+1) ;
}
*/
/*
    checkTime_15 함수는 약 15초마다 불려지는 함수를 작성한 것입니다.
    현재는 20초마다 불려지고 있습니다.
    여기서는 공의 속도를 올려주기 위해서인데,
    x 축 속도와, y 축 속도를 번갈아가면서 올려주고 있습니다.
    한번에 증가시키기엔 난이도가 너무 어렵습니다.
*/
/*
var checkTime_30= function() {
    for(var i =0; i<ballArr.length; i++) {
        ballArr[i].ballSize -= 2;
    }
    document.getElementById("p7").innerHTML = "현재 공 크기 : " + ballArr[0].ballSize;
}
*/
/*
    checkTime_30 함수는 약 30초마다 불려지는 함수를 작성한 것입니다.
    여기서는 공의 크기를 -2만큼씩 해주고 있습니다.
*/

/*
    아래 gameStart 함수는 초기에 버튼을 클릭시 불려지는 함수입니다.
    e는 게임 레벨 ( 패들의 개수 ), num은 공의 개수를 나타냅니다.
    단계마다 패들의 개수, 공의 개수가 다릅니다.
*/
var gameStart = function(e) {
    var num = parseInt(document.getElementById("ballNumber").value); // 입력받은 공 개수
    ballArr.splice(0, ballArr.length);
    for(var i=0; i<num; i++) {
        testing = new Ball(i+1); // idx 1부터
        ballArr.push(testing);
    }
    for(var i=0; i<ballArr.length; i++) {
        ballArr[i].start();
    }

    game_level = e;
    score = 0;
    currTime = 0;
    index= true;
    current = false;

    document.getElementById("p6").innerHTML = "점수 : " + score;
    //document.getElementById("p5").innerHTML = "현재 공 속도 : " + (ballArr[0].speed_x+1) ;
    document.getElementById("p4").innerHTML = currTime;
    //document.getElementById("p7").innerHTML = "현재 공 크기 : " + ballArr[0].ballSize;
    /*
        사용자에게 보여지는 정보를 초기화 하고 있는 부분입니다.
    */
    clearInterval(timer);
    clearInterval(playTimer_1);
    //clearInterval(playTimer_15);
    //clearInterval(playTimer_30);
    /*
        이전에 등록한 타이머가 종료되지 않았을 경우를 대비해서 다시 초기화 하고 있습니다.
    */
    timer = setInterval(movingBall, 8);
    playTimer_1 = setInterval(checkTime_1, 1000);
    //playTimer_15 = setInterval(checkTime_15, 20000);
    //playTimer_30 = setInterval(checkTime_30, 25000);
    /*
        각 타이머들을 실행시키는 부분입니다.
        시간을 측정하기 위한 playTimer_1
        속도를 증가시키기 위한 playTimer_15
        공의 크기를 줄이기 위한 playTimer_30 으로 구성되어있습니다.
    */
    context.clearRect(0 , 0, canvasWidth, canvasHeight);
    var gradient = context.createLinearGradient(canvasWidth/2 - 90, canvasHeight-40, 160, 20);
    gradient.addColorStop(1, "white");
    gradient.addColorStop(0, "#3A8AC3");

    context.fillStyle = gradient;

    /*
    if(game_level >= 2) {
        context.fillRect(canvasWidth/2 - 90, 20, 160, 5);
    }
    */
    context.fillRect(canvasWidth/2 - 90, canvasHeight-30, 160, 5);

    /* 세로 막대기 */
    /*if(game_level >= 3) {
        context.fillRect(20, canvasHeight/2-90, 5, 160);
        context.fillRect(canvasWidth- 25, canvasHeight/2-90, 5, 160);
    }*/

    canvas.addEventListener("mouseover", moving, false);
}
