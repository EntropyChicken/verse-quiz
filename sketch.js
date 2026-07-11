/*
 * Standalone p5.js conversion of the original Khan Academy/ProcessingJS quiz.
 * The study data and quiz logic are preserved; only platform-specific setup,
 * drawing aliases, and keyboard/touch input were adapted for regular p5.js.
 */

var preventClashingAnswerChoices = true;
var ignoreSpanishChars = false;
var comboWindow = 180;
var choiceOptionDisplayLength = 70;
var deletableRegex = /[!()*,-.;?[\]`{}~'"]/g; // stuff that is ignored when checking if answer is correct

// FOR PHONES: https://www.khanacademy.org/computer-programming/~/4580394835230720?editor=no

// FOR COMPUTERS: https://www.khanacademy.org/computer-programming/~/4580394835230720?width=600&height=500








var ganime = ~~ (9/18/22 - 9/27/22);
var screen = "menu";


/** ~~~~~~~~~~~~~~~~~ Variables ~~~~~~~~~~~~~~~~~ **/
                        {
var loadScreen, voidTextbox, isAcceptableAnswer, makeCorrectionPopup, generateNextQuestionID, resetSessionStats, shortenStringToOneLine;



var menuListScroll = 0;

var answerHistory = []; // past 12 seconds, for speed practice
var streak = 0, bestStreak = 0;
var totalCorrect = 0, totalIncorrect = 0;
var combo = 0, comboTimer = 0, bestCombo = 0;
var scoreRate = 0, bestScoreRate = 0;
var writeRaceCount = 0, writeRaceScore = 0, writeRaceTimer = -1;
var rememberListCount = 0, rememberListDone = [];

var cursorBlinkTimer = 0, cursorBlinkPeriod = 60;

var questionID = -1; // ngl i'm not sure why i didn't use this for the 4 button choice questions
var sayCorrectAnswerWhenIncorrect = true;
                        }

/** ~~~~~~~~~~~~~~~~ STUDY SETS ~~~~~~~~~~~~~~~~~ **/
                        {





var studySetSet = [
    {
        name:"before message 1",
        studySet:[
            {a:"Acts 1:8",b:"But you shall receive power when the Holy Spirit comes upon you, and you shall be My witnesses both in Jerusalem and in all Judea and Samaria and unto the uttermost part of the earth."},
            {a:"Acts 22:15",b:"For you will be a witness to Him unto all men of the things which you have seen and heard."},
            {a:"Philippians 1:27",b:"Only, conduct yourselves in a manner worthy of the gospel of Christ, that whether coming and seeing you or being absent, I may hear of the things concerning you, that you stand firm in one spirit, with one soul striving together along with the faith of the gospel,"},
        ]
    },
    {
        name:"before message 3",
        studySet:[
            {a:"1 Timothy 2:7",b:"For which I was appointed a herald and an apostle (I speak the truth; I do not lie), a teacher of the Gentiles in faith and truth."},
            {a:"Matthew 4:19",b:"And He said to them, Come after Me, and I will make you fishers of men."},
            {a:"1 Corinthians 9:16",b:"For if I preach the gospel, I have no boast, for necessity is laid upon me; for woe to me if I do not preach the gospel."},
        ]
    },
    {
        name:"cumulative before message 3",
        studySet:[
            {a:"Acts 1:8",b:"But you shall receive power when the Holy Spirit comes upon you, and you shall be My witnesses both in Jerusalem and in all Judea and Samaria and unto the uttermost part of the earth."},
            {a:"Acts 22:15",b:"For you will be a witness to Him unto all men of the things which you have seen and heard."},
            {a:"Philippians 1:27",b:"Only, conduct yourselves in a manner worthy of the gospel of Christ, that whether coming and seeing you or being absent, I may hear of the things concerning you, that you stand firm in one spirit, with one soul striving together along with the faith of the gospel,"},
            {a:"1 Timothy 2:7",b:"For which I was appointed a herald and an apostle (I speak the truth; I do not lie), a teacher of the Gentiles in faith and truth."},
            {a:"Matthew 4:19",b:"And He said to them, Come after Me, and I will make you fishers of men."},
            {a:"1 Corinthians 9:16",b:"For if I preach the gospel, I have no boast, for necessity is laid upon me; for woe to me if I do not preach the gospel."},
        ]
    },
    {
        name:"before message 5",
        studySet:[
            {a:"2 Corinthians 5:20",b:"On behalf of Christ then we are ambassadors, as God entreats you through us; we beseech you on behalf of Christ, Be reconciled to God."},
            {a:"1 Corinthians 4:15",b:"For though you have ten thousand guides in Christ, yet you do not have many fathers; for in Christ Jesus I have begotten you through the gospel."},
            {a:"Romans 15:16",b:"That I might be a minister of Christ Jesus to the Gentiles, a laboring priest of the gospel of God, in order that the offering of the Gentiles might be acceptable, having been sanctified in the Holy Spirit."},
        ]
    },
    {
        name:"cumulative before message 5",
        studySet:[
            {a:"Acts 1:8",b:"But you shall receive power when the Holy Spirit comes upon you, and you shall be My witnesses both in Jerusalem and in all Judea and Samaria and unto the uttermost part of the earth."},
            {a:"Acts 22:15",b:"For you will be a witness to Him unto all men of the things which you have seen and heard."},
            {a:"Philippians 1:27",b:"Only, conduct yourselves in a manner worthy of the gospel of Christ, that whether coming and seeing you or being absent, I may hear of the things concerning you, that you stand firm in one spirit, with one soul striving together along with the faith of the gospel,"},
            {a:"1 Timothy 2:7",b:"For which I was appointed a herald and an apostle (I speak the truth; I do not lie), a teacher of the Gentiles in faith and truth."},
            {a:"Matthew 4:19",b:"And He said to them, Come after Me, and I will make you fishers of men."},
            {a:"1 Corinthians 9:16",b:"For if I preach the gospel, I have no boast, for necessity is laid upon me; for woe to me if I do not preach the gospel."},
            {a:"2 Corinthians 5:20",b:"On behalf of Christ then we are ambassadors, as God entreats you through us; we beseech you on behalf of Christ, Be reconciled to God."},
            {a:"1 Corinthians 4:15",b:"For though you have ten thousand guides in Christ, yet you do not have many fathers; for in Christ Jesus I have begotten you through the gospel."},
            {a:"Romans 15:16",b:"That I might be a minister of Christ Jesus to the Gentiles, a laboring priest of the gospel of God, in order that the offering of the Gentiles might be acceptable, having been sanctified in the Holy Spirit."},
        ]
    },
    {
        name:"before message 7",
        studySet:[
            {a:"John 15:4",b:"Abide in Me and I in you. As the branch cannot bear fruit of itself unless it abides in the vine, so neither can you unless you abide in Me."},
            {a:"John 15:5",b:"I am the vine; you are the branches. He who abides in Me and I in him, he bears much fruit; for apart from Me you can do nothing."},
            {a:"John 15:16",b:"You did not choose Me, but I chose you, and I set you that you should go forth and bear fruit and that your fruit should remain, that whatever you ask the Father in My name, He may give you."},
        ]
    },
    {
        name:"cumulative before message 7",
        studySet:[
            {a:"Acts 1:8",b:"But you shall receive power when the Holy Spirit comes upon you, and you shall be My witnesses both in Jerusalem and in all Judea and Samaria and unto the uttermost part of the earth."},
            {a:"Acts 22:15",b:"For you will be a witness to Him unto all men of the things which you have seen and heard."},
            {a:"Philippians 1:27",b:"Only, conduct yourselves in a manner worthy of the gospel of Christ, that whether coming and seeing you or being absent, I may hear of the things concerning you, that you stand firm in one spirit, with one soul striving together along with the faith of the gospel,"},
            {a:"1 Timothy 2:7",b:"For which I was appointed a herald and an apostle (I speak the truth; I do not lie), a teacher of the Gentiles in faith and truth."},
            {a:"Matthew 4:19",b:"And He said to them, Come after Me, and I will make you fishers of men."},
            {a:"1 Corinthians 9:16",b:"For if I preach the gospel, I have no boast, for necessity is laid upon me; for woe to me if I do not preach the gospel."},
            {a:"2 Corinthians 5:20",b:"On behalf of Christ then we are ambassadors, as God entreats you through us; we beseech you on behalf of Christ, Be reconciled to God."},
            {a:"1 Corinthians 4:15",b:"For though you have ten thousand guides in Christ, yet you do not have many fathers; for in Christ Jesus I have begotten you through the gospel."},
            {a:"Romans 15:16",b:"That I might be a minister of Christ Jesus to the Gentiles, a laboring priest of the gospel of God, in order that the offering of the Gentiles might be acceptable, having been sanctified in the Holy Spirit."},
            {a:"John 15:4",b:"Abide in Me and I in you. As the branch cannot bear fruit of itself unless it abides in the vine, so neither can you unless you abide in Me."},
            {a:"John 15:5",b:"I am the vine; you are the branches. He who abides in Me and I in him, he bears much fruit; for apart from Me you can do nothing."},
            {a:"John 15:16",b:"You did not choose Me, but I chose you, and I set you that you should go forth and bear fruit and that your fruit should remain, that whatever you ask the Father in My name, He may give you."},
        ]
    },
    {
        name:"before message 8",
        studySet:[
            {a:"Revelation 21:2",b:"And I saw the holy city, New Jerusalem, coming down out of heaven from God, prepared as a bride adorned for her husband."},
            {a:"Matthew 28:19",b:"Go therefore and disciple all the nations, baptizing them into the name of the Father and of the Son and of the Holy Spirit,"},
            {a:"Revelation 22:14",b:"Blessed are those who wash their robes that they may have right to the tree of life and may enter by the gates into the city."},
        ]
    },
    {
        name:"cumulative before message 8",
        studySet:[
            {a:"Acts 1:8",b:"But you shall receive power when the Holy Spirit comes upon you, and you shall be My witnesses both in Jerusalem and in all Judea and Samaria and unto the uttermost part of the earth."},
            {a:"Acts 22:15",b:"For you will be a witness to Him unto all men of the things which you have seen and heard."},
            {a:"Philippians 1:27",b:"Only, conduct yourselves in a manner worthy of the gospel of Christ, that whether coming and seeing you or being absent, I may hear of the things concerning you, that you stand firm in one spirit, with one soul striving together along with the faith of the gospel,"},
            {a:"1 Timothy 2:7",b:"For which I was appointed a herald and an apostle (I speak the truth; I do not lie), a teacher of the Gentiles in faith and truth."},
            {a:"Matthew 4:19",b:"And He said to them, Come after Me, and I will make you fishers of men."},
            {a:"1 Corinthians 9:16",b:"For if I preach the gospel, I have no boast, for necessity is laid upon me; for woe to me if I do not preach the gospel."},
            {a:"2 Corinthians 5:20",b:"On behalf of Christ then we are ambassadors, as God entreats you through us; we beseech you on behalf of Christ, Be reconciled to God."},
            {a:"1 Corinthians 4:15",b:"For though you have ten thousand guides in Christ, yet you do not have many fathers; for in Christ Jesus I have begotten you through the gospel."},
            {a:"Romans 15:16",b:"That I might be a minister of Christ Jesus to the Gentiles, a laboring priest of the gospel of God, in order that the offering of the Gentiles might be acceptable, having been sanctified in the Holy Spirit."},
            {a:"John 15:4",b:"Abide in Me and I in you. As the branch cannot bear fruit of itself unless it abides in the vine, so neither can you unless you abide in Me."},
            {a:"John 15:5",b:"I am the vine; you are the branches. He who abides in Me and I in him, he bears much fruit; for apart from Me you can do nothing."},
            {a:"John 15:16",b:"You did not choose Me, but I chose you, and I set you that you should go forth and bear fruit and that your fruit should remain, that whatever you ask the Father in My name, He may give you."},
            {a:"Revelation 21:2",b:"And I saw the holy city, New Jerusalem, coming down out of heaven from God, prepared as a bride adorned for her husband."},
            {a:"Matthew 28:19",b:"Go therefore and disciple all the nations, baptizing them into the name of the Father and of the Son and of the Holy Spirit,"},
            {a:"Revelation 22:14",b:"Blessed are those who wash their robes that they may have right to the tree of life and may enter by the gates into the city."},
        ]
    },
];





var studySet = studySetSet[studySetSet.length-1].studySet;
var groupSetLabels = studySetSet[studySetSet.length-1].groupSetLabels;
var groupSetCanBeQuestion = studySetSet[studySetSet.length-1].groupSetCanBeQuestion;
var sessionStats = []; // reset at end of starter frame


// !!!!! studySet is assigned by reference !!!!!


                        }

/** ~~~~~~~~~~~~~~~ Program Stuff ~~~~~~~~~~~~~~~ **/
                        {
Function.prototype.new = function(){
    
    // Preserve the original Constructor.new(...) shorthand.

    var obj = Object.create(this.prototype);
    this.apply(obj, arguments);
    return obj;
};

// Compatibility aliases let the original ProcessingJS-style drawing code
// run with regular p5.js while keeping the quiz logic unchanged.
var pushMatrix = function(){ push(); };
var popMatrix = function(){ pop(); };
var pushStyle = function(){ push(); };
var popStyle = function(){ pop(); };
var createFont = function(fontName){ return fontName; };
var println = function(){ console.log.apply(console, arguments); };
                        }

/** ~~~~~~~~~~~~~~~~~~~ Input ~~~~~~~~~~~~~~~~~~~ **/
                        {
var mouse = {
    /*
        status:
        "idle" = not clicking or anything
        "clicking" = on first frame of going from unpressed to pressed
        "was clicking" = clicked, but to prevent it from triggering other things if the click loaded a page, it's disabled for the frame.
        "pressing" = is still pressing
        "released" = on first frame of going from pressed to unpressed
    */
    
    status:"idle",
    releaseAfterClick:false, // exists because i think in chromebooks, if you tap click it releases instantly after pressing, giving no time for click to register
    x:-1,
    y:-1,
};
var inp = [];
var activeTextbox = voidTextbox;

// Native text input bridge for iOS and other touch devices. The canvas
// textbox remains visible; this HTML input only summons the software keyboard
// and relays text into the active canvas textbox.
var mobileTextInput = null;
var mobileTextInputTarget = null;
var mobileTextInputIsComposing = false;

var mouseNature = function(){
    if(mouse.status==="clicking"||mouse.status==="was clicking"){
        if(mouse.releaseAfterClick){
            mouse.status="released";
            mouse.releaseAfterClick=false;
        }
        else{
            mouse.status="pressing";
        }
    }
    if(mouse.status==="released"){
        mouse.status="idle";
    }
};
var mouseUpdate = function(){
    mouse.x=mouseX*600/width;
    mouse.y=mouseY*500/height;
};

var initializeMobileTextInput = function(){
    var isTouchDevice =
        ("ontouchstart" in window) ||
        (navigator.maxTouchPoints>0) ||
        (window.matchMedia&&window.matchMedia("(pointer: coarse)").matches);

    if(!isTouchDevice){
        return;
    }

    var previousMobileTextInput = document.getElementById("quiz-mobile-text-input");
    if(previousMobileTextInput&&previousMobileTextInput.parentNode){
        previousMobileTextInput.parentNode.removeChild(previousMobileTextInput);
    }

    mobileTextInput = document.createElement("input");
    mobileTextInput.id = "quiz-mobile-text-input";
    mobileTextInput.type = "text";
    mobileTextInput.autocomplete = "off";
    mobileTextInput.autocapitalize = "none";
    mobileTextInput.autocorrect = "off";
    mobileTextInput.spellcheck = false;
    mobileTextInput.setAttribute("inputmode","text");
    mobileTextInput.setAttribute("enterkeyhint","done");
    mobileTextInput.setAttribute("aria-label","Quiz answer input");

    // Keep the input focusable without displaying a second textbox.
    mobileTextInput.style.position = "fixed";
    mobileTextInput.style.left = "0";
    mobileTextInput.style.bottom = "0";
    mobileTextInput.style.width = "1px";
    mobileTextInput.style.height = "1px";
    mobileTextInput.style.padding = "0";
    mobileTextInput.style.border = "0";
    mobileTextInput.style.opacity = "0.01";
    mobileTextInput.style.fontSize = "16px";
    mobileTextInput.style.pointerEvents = "none";

    document.body.appendChild(mobileTextInput);

    mobileTextInput.addEventListener("compositionstart",function(){
        mobileTextInputIsComposing = true;
    });

    mobileTextInput.addEventListener("compositionend",function(){
        mobileTextInputIsComposing = false;
        if(activeTextbox&&activeTextbox!==voidTextbox){
            activeTextbox.txt = mobileTextInput.value;
            cursorBlinkTimer = cursorBlinkPeriod/4;
        }
    });

    mobileTextInput.addEventListener("input",function(){
        if(activeTextbox&&activeTextbox!==voidTextbox){
            activeTextbox.txt = mobileTextInput.value;
            cursorBlinkTimer = cursorBlinkPeriod/4;
        }
    });

    mobileTextInput.addEventListener("keydown",function(event){
        if(
            event.key==="Enter" &&
            activeTextbox &&
            activeTextbox!==voidTextbox
        ){
            event.preventDefault();
            activeTextbox.onEnter();
            mobileTextInputTarget = activeTextbox;
            mobileTextInput.value = activeTextbox.txt;
        }
    });
};

var focusMobileTextInputAt = function(logicalX,logicalY){
    if(!mobileTextInput||!textboxes){
        return;
    }

    for(var i=textboxes.length-1;i>-1;i--){
        if(
            logicalX>textboxes[i].x-2 &&
            logicalX<textboxes[i].x+textboxes[i].w+2 &&
            logicalY>textboxes[i].y-2 &&
            logicalY<textboxes[i].y+textboxes[i].h+2
        ){
            activeTextbox=textboxes[i];
            mobileTextInputTarget=activeTextbox;
            mobileTextInput.value=activeTextbox.txt;

            try{
                mobileTextInput.focus({preventScroll:true});
            }
            catch(focusError){
                mobileTextInput.focus();
            }

            try{
                var end=mobileTextInput.value.length;
                mobileTextInput.setSelectionRange(end,end);
            }
            catch(selectionError){
                // Some keyboards do not expose a selection range.
            }

            cursorBlinkTimer=cursorBlinkPeriod/4;
            break;
        }
    }
};

keyPressed = function(){
    // The native input already handles these keystrokes on touch devices.
    if(mobileTextInput&&document.activeElement===mobileTextInput){
        return;
    }

    inp[keyCode]=true;
    switch(keyCode){
        case 8:
            // backspace
            if(activeTextbox&&activeTextbox.txt.length){
                if(inp[17]){
                    while(activeTextbox.txt.length&&(activeTextbox.txt[activeTextbox.txt.length-1]===' ')){
                        activeTextbox.txt=activeTextbox.txt.substr(0,activeTextbox.txt.length-1);
                    }
                    while(activeTextbox.txt.length&&(activeTextbox.txt[activeTextbox.txt.length-1]!==' ')){
                        activeTextbox.txt=activeTextbox.txt.substr(0,activeTextbox.txt.length-1);
                    }
                    inp[17]=false;
                }
                else{
                    activeTextbox.txt=activeTextbox.txt.substr(0,activeTextbox.txt.length-1);
                }
                cursorBlinkTimer=cursorBlinkPeriod/4;
            }
            break;
        case 10:
        case 13:
            // Normalize p5/browser Enter to the program's original Enter slot.
            inp[10]=true;
            break;
        default:
            if(activeTextbox&&typeof key==="string"&&key.length===1){
                activeTextbox.txt+=key;
                cursorBlinkTimer=cursorBlinkPeriod/4;
            }
            break;
    }
};
keyReleased = function(){
    if(mobileTextInput&&document.activeElement===mobileTextInput){
        return;
    }
    inp[keyCode]=false;
};
                        }

/** ~~~~~~~~~~~~ Themes :) and stuff ~~~~~~~~~~~~ **/
                        {
var themeSet = [];
var theme = null;
var initializeThemes = function(){
    themeSet = [
        {
            name:"Dark",
            backgroundColor:color(20,10,55),
            boxColor:color(35,35,80),
            textColor:color(220,220,240),
            //primeColor:color(244,68,46),
            chillColor:color(20,140,150),
            chillerColor:color(20,100,110),
            correctColor:color(0,200,50),
            incorrectColor:color(255,50,0),
            font:"Verdana",
        },
    ];
    theme = themeSet[0];
};
var applyTheme = function(themeObj){
    textFont(createFont(themeObj.font));
    rectMode(CORNER);
    strokeJoin(ROUND);
};

var flashes = [];
// {col:color(),opacity,fadeVelocity}

var drawFlashes = function(){
    for(var i = flashes.length-1; i>-1; i--){
        fill(red(flashes[i].col),green(flashes[i].col),blue(flashes[i].col),flashes[i].opacity);
        noStroke();
        rect(-1,-1,602,602); // height 502
        
        flashes[i].opacity-=flashes[i].fadeVelocity;
        flashes[i].fadeVelocity++;
        if(flashes[i].opacity<=0){flashes.splice(i,1);}
    }
};

var confettiColors = [
    [255,0,0],
    [255,120,0],
    [255,200,0],
    [255,245,0],
    [150,255,0],
    [0,255,0],
    [0,255,180],
    [0,255,255],
    [0,180,255],
    [0,50,255],
    [150,0,255],
    [255,0,255],
    [255,0,150],
];
var particles = [];
var Particle = function(col,rad,x,y,xv,yv){
    // is actually a rotated rect. no trig, for speed
    this.col=col;
    this.opacity=255;
    //this.fadeRate=fadeRate;
    this.x=x;
    this.y=y;
    this.xv=xv;
    this.yv=yv;
    this.rad = rad;
    this.ang = random(0,360);
    this.rotateRate = (floor(random(0,2))*2-1)*random(3,8);
};
Particle.prototype.exist = function(id){
    pushMatrix();
    translate(this.x,this.y);
    rotate(this.ang);
    fill(this.col[0],this.col[1],this.col[2],200);
    rect(-this.rad,-this.rad*1.3,this.rad*2,this.rad*2.6);
    popMatrix();
    
    this.x+=this.xv;
    this.y+=this.yv;
    this.xv*=0.985;
    this.yv+=0.2;
    this.ang+=this.rotateRate;
    
    if(this.y-this.rad*2>500){
        particles.splice(id,1);
    }
};
var confettiBlast = function(count,x,y,xv,yv,spread){
    if(particles.length>250){
        count/=2;
        if(particles.length>800){
            // println(random());
            return;
        }
    }
    for(var i = 0; i<count; i++){
        particles.push(Particle.new(confettiColors[floor(random(0,confettiColors.length))],random(4,7),x+random(-spread,spread),y+10*random(0,spread),xv+random(-spread,spread),yv+random(-spread,spread)));
    }
};

                        }

/** ~~~~ i refuse to use HTML and CSS!!!! :/ ~~~~ **/
                        {
// STUFF ISN'T CLEARED BY FRAME! ONLY INITIALIZE ON LOADINGS

var keepCheckingClickables = true;

var boxes = [];
var Box = function(txt,x,y,w,h,lineCount,centered,tag){
    this.txt = txt;
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    if(lineCount===undefined){this.lineCount=1;}
    else{this.lineCount=lineCount;}
    if(centered===undefined){this.centered=false;}
    else{this.centered=centered;}
    this.tag=tag||"untagged";
};
Box.prototype.display = function(){
    noStroke();
    fill(theme.boxColor);
    rect(this.x,this.y,this.w,this.h,5);
    fill(theme.textColor);
    textSize(this.h/this.lineCount*0.65);
    
    var showTxt = this.txt;
    if(activeTextbox===this){
        if(cursorBlinkTimer<cursorBlinkPeriod/2){
            showTxt+="│"; // pretend cursor. (it's a special vertical bar character. replace it with "|" if it causes issues.)
        } // ganime%37 seems to be more accurate rate btw
        
        // this is annoying because it sometimes still considers it one word (to linebreak early) even if there's a space before the special char. i think the space is considered part of the word
        else{
            showTxt+=" ";
        } // a fix that only works if the char is the same size as a space
    }
    if(this.centered){
        textAlign(CENTER,CENTER);
        text(showTxt,this.x+this.w/2,this.y+this.h/2);
    }
    else{
        textAlign(LEFT,TOP);
        text(showTxt,this.x+7,this.y+this.h/15,this.w-15,1000);
    }
};
Box.prototype.shortenStringToOneLine = function(s){
    var width = -1;
    pushStyle();
    textSize(this.h/this.lineCount*0.65);
    if(this.centered){
        textAlign(CENTER,CENTER);
        return "ERROR: cannot shorten string for a centered box";
    }
    else{
        textAlign(LEFT,TOP);
        width = this.w-15;
    }
    
    var ans = "";
    var i = 0;
    while(i<s.length&&textWidth(ans+s[i])<width-1){
        ans+=s[i];
        i++;
    }
    popStyle();
    return ans;
};
Box.prototype.update = function(){
    // special cases
    switch(this.tag){
        case "streak":
            this.txt="Streak\n"+streak;
            break;
        case "best streak":
            this.txt="Best Streak\n"+bestStreak;
            break;
        case "combo":
            this.txt="Combo\n"+combo;
            break;
        case "best combo":
            this.txt="Best Combo\n"+bestCombo;
            break;
        case "total correct":
            this.txt="Correct\n"+totalCorrect;
            break;
        case "total incorrect":
            this.txt="Incorrect\n"+totalIncorrect;
            break;
        case "score rate":
            this.txt="Score Rate\n"+scoreRate;
            if(scoreRate===round(scoreRate)){this.txt+=".0";}
            this.txt+="/min";
            break;
        case "best score rate":
            this.txt="Best Score Rate\n"+bestScoreRate;
            if(bestScoreRate===round(bestScoreRate)){this.txt+=".0";}
            this.txt+="/min";
            break;
        case "write race score":
            this.txt="Score:\n"+writeRaceScore+"/"+writeRaceCount;
            break;
        case "write race timer":
            if(writeRaceTimer===-1){
                this.txt = "Seconds:\nDone";
            }
            else{
                this.txt="Seconds:\n"+floor(writeRaceTimer/60);//+"."+floor((writeRaceTimer%60)/6);
            }
            break;
    }
};

var buttons = [];
var Button = function(txt,onClick,x,y,w,h,lineCount,centered,tag){
    Box.call(this,txt,x,y,w,h,lineCount,centered,tag);
    this.onClick=onClick; // function run on first click frame
};
Button.prototype = Object.create(Box.prototype);
Button.prototype.interactWithMouseFeedback = function(){
    //if(!(mouse.x>this.x-2&&mouse.x<this.x+this.w+2&&mouse.y>this.y-2&&mouse.y<this.y+this.h+2)){
        // uh i guess this can go here. larger idle outline
        strokeWeight(2.5);
        stroke(lerpColor(theme.boxColor,theme.textColor,0.2));
        noFill();
        rect(this.x,this.y,this.w,this.h,5);
    //}
};
Button.prototype.interactWithMouse = function(){
    if(mouse.x>this.x-2&&mouse.x<this.x+this.w+2&&mouse.y>this.y-2&&mouse.y<this.y+this.h+2){
        // being hovered over, so draw outline
        strokeWeight(1.5);
        stroke(lerpColor(theme.boxColor,theme.textColor,0.7));
        noFill();
        rect(this.x,this.y,this.w,this.h,5);
        cursor("pointer");
        
        if(mouse.status==="clicking"){
            // click (overrides buttons that come after)
            this.onClick();
            mouse.status="was clicking";
        }
        keepCheckingClickables = false;
    }
};

var textboxes = [];
var Textbox = function(onEnter,x,y,w,h,lineCount,centered,tag){
    // the actual typing happens in keyPressed. it uses a reference to a focus textbox to make changes.
    Box.call(this,"",x,y,w,h,lineCount,centered,tag);
    this.active = false;
    this.onEnter = onEnter;
};
Textbox.prototype = Object.create(Box.prototype);
Textbox.prototype.interactWithMouseFeedback = function(){
    //if(!(mouse.x>this.x-2&&mouse.x<this.x+this.w+2&&mouse.y>this.y-2&&mouse.y<this.y+this.h+2)){
        strokeWeight(2.5);
        stroke(lerpColor(theme.boxColor,theme.textColor,0.2));
        noFill();
        rect(this.x,this.y,this.w,this.h,5);
    //}
};
Textbox.prototype.interactWithMouse = function(){
    if(mouse.x>this.x-2&&mouse.x<this.x+this.w+2&&mouse.y>this.y-2&&mouse.y<this.y+this.h+2){
        // being hovered over, so draw outline
        strokeWeight(1.5);
        stroke(lerpColor(theme.boxColor,theme.textColor,0.7));
        noFill();
        rect(this.x,this.y,this.w,this.h,5);
        
        cursor("text");
        
        if(mouse.status==="clicking"){
            // click (overrides textboxes that come after)
            activeTextbox = this; // does this work?? i think so
            mouse.status="was clicking";
            cursorBlinkTimer = cursorBlinkPeriod/4;
        }
        keepCheckingClickables = false;
    }
};
voidTextbox = Textbox.new(function(){},0,0,0,0,1,false,"void text box");

                        }

/** ~~~~~~~~~~~~ Page Load Functions ~~~~~~~~~~~~ **/
                        {

var screenHistory = [];
var onScreenHistoryID = 0;

var loadFourChoiceQuestion = function(){
    // clear stuff from previous question
    for(var i = buttons.length-1; i>-1; i--){
        if(buttons[i].tag==="answer choice"){
            buttons.splice(i,1);
        }
    }
    for(var i = boxes.length-1; i>-1; i--){
        if(boxes[i].tag==="question header"){
            boxes.splice(i,1);
        }
    }
    
    // choose the new question
    generateNextQuestionID();
    
    var spots = [
        {x:40,y:140},
        {x:310,y:140},
        {x:310,y:250},
        {x:40,y:250},
    ];
    
    if(studySet[questionID].length===undefined){
    
        // make question header
        boxes.push(Box.new(studySet[questionID].a,20,20,560,80,2,false,"question header"));
    
        var correctSpot = floor(random(0,4));
        
        // make correct answer choice
        var txt = studySet[questionID].b;
        if(txt.length>choiceOptionDisplayLength){
            txt = studySet[questionID].b.substring(0,choiceOptionDisplayLength-3)+"...";
        }
        buttons.push(Button.new(
            txt,
            function(){
                sessionStats[questionID].correct++;
                totalCorrect++;
                streak++;
                combo++;
                answerHistory.push({score:1,time:0});
                flashes.push({col:theme.correctColor,opacity:80,fadeVelocity:-1});
                loadFourChoiceQuestion();
            },
            spots[correctSpot].x,spots[correctSpot].y,250,90,3,false,
            "answer choice"
        ));
        
        // make 3 incorret answer choices
        var alreadyUsedChoiceIDs = [questionID];
        var onSelectingIncorrect = function(){
            sessionStats[questionID].incorrect++;
            totalIncorrect++;
            streak=0;
            combo=0;
            answerHistory.push({score:-1,time:0});
            flashes.push({col:theme.incorrectColor,opacity:120,fadeVelocity:-5});
            var wasQuestionID = questionID;
            loadFourChoiceQuestion();
            if(sayCorrectAnswerWhenIncorrect){
                makeCorrectionPopup(wasQuestionID);
            }
        };
        for(var i = 0; i<3; i++){
            if(studySet.length-1-i<=0){
                // we're out of possible wrong answers. don't make
                break;
            }
            
            var nextWrongID;
            var j = 0; // looper defined in this scope
            for(; true; j++){
                nextWrongID = floor(random(0,studySet.length));
                var usable = true;
                for(var k = 0; k<alreadyUsedChoiceIDs.length; k++){
                    if(preventClashingAnswerChoices){
                        if(nextWrongID===alreadyUsedChoiceIDs[k]||studySet[nextWrongID].b===studySet[alreadyUsedChoiceIDs[k]].b){
                            usable = false;
                            break;
                        }
                    }
                    else{
                        if(nextWrongID===alreadyUsedChoiceIDs[k]){
                            usable = false;
                            break;
                        }
                    }
                }
                if(usable){
                    alreadyUsedChoiceIDs.push(nextWrongID);
                    break; // success
                }
                if(j===10000){
                    println("Either you're super unlucky or RandomChicken needs to fix Error 1"); // we've tried 10000 randoms and they're all taken even though there should be at least 1 remaining choice
                    break;
                }
            }
            if(j===10000){break;}
            
            
            
            
            
            
            var txt = studySet[nextWrongID].b;
            if(txt.length>choiceOptionDisplayLength){
                txt = studySet[nextWrongID].b.substring(0,choiceOptionDisplayLength-3)+"...";
            }
            var spot = (correctSpot+i+1)%4;
            buttons.push(Button.new(
                txt,
                onSelectingIncorrect, // can't def functions in loop
                spots[spot].x,spots[spot].y,250,90,3,false,
                "answer choice"
            ));
        }
    }
    else{
        
        // it's a groupSet type studySet
        
        var a,b;
        while(true){
            b = floor(random(0,groupSetLabels.length));
            var tries = 0;
            do{
                tries++;
                if(tries===100){
                    break;
                }
                a = floor(random(0,groupSetLabels.length));
            }
            while(a===b||(groupSetCanBeQuestion[a]===false)||(studySet[questionID][a]===true)||(studySet[questionID][a]===false)); // might go in infinite loop if you have a goofy ahh (small) groupSet
            if(tries!==100){
                break;
            }
        }
        
        // make question header
        boxes.push(Box.new(studySet[questionID][a]+" --> "+groupSetLabels[b],20,20,560,80,2,false,"question header"));
        
        if((studySet[questionID][b]===true)||(studySet[questionID][b]===false)){
            // println(studySet[questionID][b]);
            // true or false reponse
            // correct answer choice
            buttons.push(Button.new(
                studySet[questionID][b],
                function(){
                    sessionStats[questionID].correct++;
                    totalCorrect++;
                    streak++;
                    combo++;
                    answerHistory.push({score:1,time:0});
                    flashes.push({col:theme.correctColor,opacity:80,fadeVelocity:-1});
                    loadFourChoiceQuestion();
                },
                spots[0+studySet[questionID][b]].x,spots[0+studySet[questionID][b]].y,250,90,3,false,
                "answer choice"
            ));
            buttons.push(Button.new(
                !studySet[questionID][b],
                function(){
                    sessionStats[questionID].incorrect++;
                    totalIncorrect++;
                    streak=0;
                    combo=0;
                    answerHistory.push({score:-1,time:0});
                    flashes.push({col:theme.incorrectColor,opacity:120,fadeVelocity:-5});
                    var wasQuestionID = questionID;
                    loadFourChoiceQuestion();
                    if(sayCorrectAnswerWhenIncorrect){
                        makeCorrectionPopup(wasQuestionID);
                    }
                },
                spots[1-studySet[questionID][b]].x,spots[1-studySet[questionID][b]].y,250,90,3,false,
                "answer choice"
            ));
        }
        else{
            // 4 choices
        
            var correctSpot = floor(random(0,4));
            
            // correct answer choice
            buttons.push(Button.new(
                studySet[questionID][b],
                function(){
                    sessionStats[questionID].correct++;
                    totalCorrect++;
                    streak++;
                    combo++;
                    answerHistory.push({score:1,time:0});
                    flashes.push({col:theme.correctColor,opacity:80,fadeVelocity:-1});
                    loadFourChoiceQuestion();
                },
                spots[correctSpot].x,spots[correctSpot].y,250,90,3,false,
                "answer choice"
            ));
            // make 3 incorret answer choices
            var alreadyUsedChoiceIDs = [questionID];
            var onSelectingIncorrect = function(){
                sessionStats[questionID].incorrect++;
                totalIncorrect++;
                streak=0;
                combo=0;
                answerHistory.push({score:-1,time:0});
                flashes.push({col:theme.incorrectColor,opacity:120,fadeVelocity:-5});
                var wasQuestionID = questionID;
                loadFourChoiceQuestion();
                if(sayCorrectAnswerWhenIncorrect){
                    makeCorrectionPopup(wasQuestionID);
                }
            };
            for(var i = 0; i<3; i++){
                if(studySet.length-1-i<=0){
                    // we're out of possible wrong answers. don't make
                    break;
                }
                
                var nextWrongID;
                var j = 0; // looper defined in this scope
                for(; true; j++){
                    nextWrongID = floor(random(0,studySet.length));
                    var usable = true;
                    for(var k = 0; k<alreadyUsedChoiceIDs.length; k++){
                        if(nextWrongID===alreadyUsedChoiceIDs[k]){
                            usable = false;
                            break;
                        }
                    }
                    if(usable){
                        alreadyUsedChoiceIDs.push(nextWrongID);
                        break; // success
                    }
                    if(j===10000){
                        println("Either you're super unlucky or RandomChicken needs to fix Error 1"); // we've tried 10000 randoms and they're all taken even though there should be at least 1 remaining choice
                        break;
                    }
                }
                if(j===10000){break;}
                
                var spot = (correctSpot+i+1)%4;
                buttons.push(Button.new(
                    studySet[nextWrongID][b],
                    onSelectingIncorrect, // can't def functions in loop
                    spots[spot].x,spots[spot].y,250,90,3,false,
                    "answer choice"
                ));
            }
        }
    }
    
    comboTimer = comboWindow;
};
var loadWritingQuestion = function(){
    // clear stuff from previous question
    for(var i = textboxes.length-1; i>-1; i--){
        if(textboxes[i].tag==="answer textbox"){
            textboxes.splice(i,1);
        }
    }
    for(var i = boxes.length-1; i>-1; i--){
        if(boxes[i].tag==="question header"){
            boxes.splice(i,1);
        }
    }
    
    // come up with a new question (preferably not repeat)
    generateNextQuestionID();
    
    boxes.push(Box.new(
        studySet[questionID].a,
        20,20,560,80,2,false,
        "question header"
    ));
    textboxes.push(Textbox.new(
        function(){
            var wasQuestionID = questionID;
            var accepted;
            var userAnswer = activeTextbox.txt;
            accepted = isAcceptableAnswer(userAnswer,studySet[questionID].b);
            if(accepted){
                sessionStats[questionID].correct++;
                flashes.push({col:theme.correctColor,opacity:80,fadeVelocity:-1});
            }
            loadWritingQuestion();
            if(!accepted){
                sessionStats[wasQuestionID].incorrect++;
                flashes.push({col:theme.incorrectColor,opacity:120,fadeVelocity:-5});
                if(sayCorrectAnswerWhenIncorrect){
                    makeCorrectionPopup(wasQuestionID,userAnswer);
                }
            }
        },
        30,130,540,180,5,false,
        "answer textbox"
    ));
    activeTextbox = textboxes[textboxes.length-1]; // less annoying than clicking on it every time
};
var loadWritingRaceQuestion = function(){
    // clear stuff from previous question
    for(var i = textboxes.length-1; i>-1; i--){
        if(textboxes[i].tag==="answer textbox"){
            textboxes.splice(i,1);
        }
    }
    for(var i = boxes.length-1; i>-1; i--){
        if(boxes[i].tag==="question header"){
            boxes.splice(i,1);
        }
    }
    
    
    if(writeRaceCount>=studySet.length){
        activeTextbox = voidTextbox;
        boxes.push(Box.new(
            "Final score: "+writeRaceScore+"/"+writeRaceCount+"\nTime: "+floor(writeRaceTimer/6)/10+" sec",
            20,120,560,160,2,false,
            "end state"
        ));
        if(writeRaceScore===writeRaceCount){
            for(var i = 0; i<20; i++){
                confettiBlast(random(4,18),random(50,550),499,random(-2.5,2.5),random(-6,-22),2);
            }
        }
        resetSessionStats();
        writeRaceTimer = -1;
    }
    else{
    
        // come up with a new question (preferably not repeat)
        generateNextQuestionID();
        
        boxes.push(Box.new(
            studySet[questionID].a,
            20,20,560,80,2,false,
            "question header"
        ));
        boxes.push(Box.new(
            "Error 2",
            20,370,150,60,2,false,
            "write race score"
        ));
        boxes.push(Box.new(
            "Error 2",
            190,370,150,60,2,false,
            "write race timer"
        ));
        textboxes.push(Textbox.new(
            function(){
                var wasQuestionID = questionID;
                var accepted;
                var userAnswer = activeTextbox.txt;
                accepted = isAcceptableAnswer(userAnswer,studySet[questionID].b);
                
                writeRaceCount++;
                if(accepted){
                    sessionStats[questionID].correct++;
                    flashes.push({col:theme.correctColor,opacity:80,fadeVelocity:-1});
                    writeRaceScore++;
                }
                loadWritingRaceQuestion();
                if(!accepted){
                    sessionStats[wasQuestionID].incorrect++;
                    flashes.push({col:theme.incorrectColor,opacity:120,fadeVelocity:-5});
                    if(sayCorrectAnswerWhenIncorrect){
                        makeCorrectionPopup(wasQuestionID,userAnswer);
                    }
                }
            },
            30,130,540,180,5,false,
            "answer textbox"
        ));
        activeTextbox = textboxes[textboxes.length-1]; // less annoying than clicking on it every time
    }
};
// var loadLearningQuestion = function(){};

loadScreen = function(screenType,ignoreHistoryOperations){
    
    activeTextbox = voidTextbox;
    if(mobileTextInput&&document.activeElement===mobileTextInput){
        mobileTextInput.blur();
    }
    
    screen = screenType;
    
    if(ignoreHistoryOperations===undefined||ignoreHistoryOperations===false){
        // going to a new screen, so delete "future history"
        screenHistory.splice(onScreenHistoryID+1,max(0,screenHistory.length-onScreenHistoryID-1));
        screenHistory.push(screen);
        if(screenHistory.length>100){ // how would this happen tho.
            screenHistory.splice(0,screenHistory.length-100);
        }
        onScreenHistoryID=screenHistory.length-1;
    }
    
    menuListScroll = 0;
    answerHistory = [];
    streak = 0;
    totalCorrect = 0; totalIncorrect = 0;
    combo = 0; comboTimer = 0;
    scoreRate = 0;
    
    buttons = [];
    boxes = [];
    textboxes = [];
    
    switch(screenType){
        case "menu":
            buttons.push(Button.new(
                "4-Choice (Accuracy)",
                function(){
                    loadScreen("practice accuracy");
                },
                20,20,200,40,1.5,true,
                "enter mode"
            ));
            buttons.push(Button.new(
                "4-Choice (Speed)",
                function(){
                    loadScreen("practice speed");
                },
                20,70,200,40,1.5,true,
                "enter mode"
            ));
            buttons.push(Button.new(
                "Write (Accuracy)",
                function(){
                    loadScreen("write");
                },
                20,120,200,40,1.5,true,
                "enter mode"
            ));
            buttons.push(Button.new(
                "Write (Speed)",
                function(){
                    loadScreen("write race");
                },
                20,170,200,40,1.5,true,
                "enter mode"
            ));
            buttons.push(Button.new(
                "Remember List",
                function(){
                    loadScreen("remember list");
                },
                20,220,200,40,1.5,true,
                "enter mode"
            ));
            
            buttons.push(Button.new(
                "Settings",
                function(){
                    loadScreen("settings");
                },
                20,340,200,40,1.5,true,
                "enter mode"
            ));
            buttons.push(Button.new(
                "Study Sets",
                function(){
                    loadScreen("study sets");
                },
                20,390,200,40,1.5,true,
                "enter mode"
            ));
            break;
        case "study sets":
            // can't gen unique functions in a for loop :( 
            break;
        case "learn":
            sayCorrectAnswerWhenIncorrect=true;
            boxes.push(Box.new("",20,120,560,240,1,false,"answer region"));
            break;
        case "write":
            sayCorrectAnswerWhenIncorrect=true;
            boxes.push(Box.new("",20,120,560,200,1,false,"answer region"));
            loadWritingQuestion();
            break;
        case "write race":
            sayCorrectAnswerWhenIncorrect=false;
            boxes.push(Box.new("",20,120,560,200,1,false,"answer region"));
            resetSessionStats(); // since it stops when you finish all the questions once
            writeRaceTimer = 0;
            writeRaceCount = 0;
            writeRaceScore = 0;
            loadWritingRaceQuestion();
            break;
        case "practice accuracy":
            sayCorrectAnswerWhenIncorrect=false;
            boxes.push(Box.new("",20,120,560,240,1,false,"answer region"));
            boxes.push(Box.new("Error 2 moment",20,380,125,50,2,true,"streak"));
            boxes.push(Box.new("Error 2 moment",165,380,125,50,2,true,"best streak"));
            boxes.push(Box.new("Error 2 moment",310,380,125,50,2,true,"total correct"));
            boxes.push(Box.new("Error 2 moment",455,380,125,50,2,true,"total incorrect"));
            loadFourChoiceQuestion();
            break;
        case "practice speed":
            sayCorrectAnswerWhenIncorrect=false;
            boxes.push(Box.new("",20,120,560,240,1,false,"answer region"));
            boxes.push(Box.new("Error 2 moment",20,380,125,50,2,true,"combo"));
            boxes.push(Box.new("Error 2 moment",165,380,125,50,2,true,"best combo"));
            boxes.push(Box.new("Error 2 moment",310,380,105,50,2,true,"score rate"));
            boxes.push(Box.new("Error 2 moment",435,380,145,50,2,true,"best score rate"));
            loadFourChoiceQuestion();
            break;
        case "remember list":
            rememberListDone = [];
            for(var i = 0; i<studySet.length; i++){
                rememberListDone.push(false);
            }
            rememberListCount = 0;
            // sayCorrectAnswerWhenIncorrect=false;
            boxes.push(Box.new("",20,70,560,160,1,false,"answer region"));
            boxes.push(Box.new(rememberListCount+"/"+studySet.length,20,20,80,40,1,false,"remember list count"));
            if(studySet.length<18){
                boxes.push(Box.new("",20,240,560,240,max(9,studySet.length),false,"remember list list"));
            }
            else{
                boxes.push(Box.new("",20,240,280,240,max(9,studySet.length/2),false,"remember list list 1"));
                boxes.push(Box.new("",300,240,280,240,max(9,studySet.length/2),false,"remember list list 2"));
            }
            textboxes.push(Textbox.new(
                function(){
                    var userAnswer = activeTextbox.txt;
                    var acceptedId = -1;
                    for(var qi = 0; qi<studySet.length; qi++){
                        if(rememberListDone[qi]===false&&isAcceptableAnswer(userAnswer,studySet[qi].a+" "+studySet[qi].b)){
                            acceptedId = qi;
                            break;
                        }
                    }
                    if(acceptedId!==-1){
                        rememberListDone[acceptedId] = true;
                        rememberListCount++;
                        if(studySet.length<18){
                            for(var i = 0; i<boxes.length; i++){
                                if(boxes[i].tag==="remember list list"){
                                    boxes[i].txt+=boxes[i].shortenStringToOneLine(studySet[acceptedId].a+" "+studySet[acceptedId].b)+"\n";
                                }
                            }
                        }
                        else{
                            for(var i = 0; i<boxes.length; i++){
                                if(boxes[i].tag==="remember list list "+(1+(acceptedId>studySet.length/2)).toString()){
                                    boxes[i].txt+=boxes[i].shortenStringToOneLine(studySet[acceptedId].a+" "+studySet[acceptedId].b)+"\n";
                                }
                            }
                        }
                        activeTextbox.txt = ""; // in writing mode, you delete the textbox and make a new one, but it's unnecessary
                        flashes.push({col:theme.correctColor,opacity:80,fadeVelocity:-1});
                    }
                    // load question ();
                    if(acceptedId===-1){
                        flashes.push({col:theme.incorrectColor,opacity:120,fadeVelocity:-5});
                    }
                    
                    for(var i = 0; i<boxes.length; i++){
                        if(boxes[i].tag==="remember list count"){
                            boxes[i].txt = rememberListCount+"/"+studySet.length;
                        }
                    }
                },
                30,80,540,140,4,false,
                "answer textbox"
            ));
            break;
        case "settings":
            buttons.push(Button.new(
                "No settings.\nOnly confetti",
                function(){
                    //loadScreen("learn");
                    for(var i = 0; i<5; i++){
                        confettiBlast(random(4,18),random(50,550),499,random(-1.5,1.5),random(-4,-12),2);
                    }
                },
                200,200,200,60,2,true,
                "enter mode"
            ));
            break;
    }
};

var goToPreviousScreen = function(){
    if(onScreenHistoryID>0){
        onScreenHistoryID--;
        loadScreen(screenHistory[onScreenHistoryID],true);
    }
};
var goToNextScreen = function(){
    // not really "next screen" but can't think of a better name. it's the one you went to before you decided to go to the previous screen from that.
    if(onScreenHistoryID<screenHistory.length-1){
        onScreenHistoryID++;
        loadScreen(screenHistory[onScreenHistoryID],true);
    }
};

                        }

/** ~~~~~~~~~ Other Shorthand Functions ~~~~~~~~~ **/
                        {
var removeDuplicateSpaces = function(s){
    return s.replace(/\s{2,}/g, ' ');
};
var replaceSpanishChars = function(str){
    var replacements = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ü': 'u',
        'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U', 'Ü': 'U',
        'ñ': 'n', 'Ñ': 'N',
        '¿': '', '¡': ''
    };
    return str.replace(/[áéíóúüÁÉÍÓÚÜ¿¡ñÑ]/g, function(match) {
        return replacements[match];
    });
};
var isAcceptableAnswer = function(submittedAnswer,correctAnswer){
    if(ignoreSpanishChars){
        submittedAnswer = replaceSpanishChars(submittedAnswer);
        correctAnswer = replaceSpanishChars(correctAnswer);
    }
    var s = submittedAnswer.trim().toLowerCase().replaceAll(deletableRegex,"");
    // println(s);
    if(s[0]==='t'&&s[1]==='o'&&s[2]===' '){
        s=s.substring(3);
    }
    s = removeDuplicateSpaces(s);
    correctAnswer = correctAnswer.trim().toLowerCase().replaceAll(deletableRegex,"");
    // println(correctAnswer);
    var corrects = correctAnswer.split("/");
    corrects.push(correctAnswer);
    for(var i = 0; i<corrects.length; i++){
        var c = corrects[i].trim();
        if(c[0]==='t'&&c[1]==='o'&&c[2]===' '){
            c=c.substring(3);
        }
        c = removeDuplicateSpaces(c);
        if(c===s){
            return(true);
        }
    }
    return(false);
};

var makeCorrectionPopup = function(wasQuestionID,userWrongAnswer){
    var displayTxt;
    if(userWrongAnswer===undefined){
        displayTxt = "Answer:\n"+studySet[wasQuestionID].b+"\n\n[Click/enter to continue]";
    }
    else{
        displayTxt = "Answer:\n"+studySet[wasQuestionID].b+"\n\nYou said:\n"+userWrongAnswer+"\n\n[Click/enter to continue]";
    }
    buttons.push(Button.new(
        displayTxt,
        function(){
            for(var i = 0; i<buttons.length; i++){
                if(buttons[i].tag==="answer correction"){
                    buttons.splice(i,1);
                    i--;
                }
            }
        },
        20,20,560,410,16,false,
        "answer correction"
    ));
};

var houseIcon = function(backCol,iconCol){
    fill(iconCol);
    rect(-12,-2,24,16);
    triangle(-18,-2,18,-2,0,-15);
    fill(backCol);
    rect(-3,6,6,8);
};
var arrowIcon = function(backCol,iconCol){
    fill(iconCol);
    triangle(-17,0,14,-15,14,15);
    fill(backCol);
    triangle(0,0,14,-6,14,6);
};

var bottomBar = function(){
    noStroke();
    var backCol = lerpColor(theme.backgroundColor,color(60,60,60),0.6),
        iconCol = lerpColor(theme.textColor,color(60,60,60),0.8);
    fill(backCol);
    rect(0,450,600,50);
    
    // previous
    pushMatrix();
    translate(90,475);
    if(dist(mouse.x,mouse.y,90,485)<25){
        cursor("pointer");
        if(mouse.status==="clicking"||mouse.status==="pressing"){
            scale(1.1);
            if(mouse.status==="clicking"){
                mouse.status="was clicking";
                goToPreviousScreen();
            }
        }
        arrowIcon(backCol,lerpColor(iconCol,backCol,-0.5));
    }
    else{arrowIcon(backCol,iconCol);}
    popMatrix();
    
    // home
    pushMatrix();
    translate(40,475);
    if(dist(mouse.x,mouse.y,40,485)<25){
        cursor("pointer");
        if(mouse.status==="clicking"||mouse.status==="pressing"){
            scale(1.1);
            if(mouse.status==="clicking"){
                mouse.status="was clicking";
                loadScreen("menu");
            }
        }
        houseIcon(backCol,lerpColor(iconCol,backCol,-0.5));
    }
    else{houseIcon(backCol,iconCol);}
    popMatrix();
    
    // ... the thing you were at, before you pressed previous
    pushMatrix();
    translate(140,475);
    scale(-1,1);
    if(dist(mouse.x,mouse.y,140,485)<25){
        cursor("pointer");
        if(mouse.status==="clicking"||mouse.status==="pressing"){
            scale(1.1);
            if(mouse.status==="clicking"){
                mouse.status="was clicking";
                goToNextScreen();
            }
        }
        arrowIcon(backCol,lerpColor(iconCol,backCol,-0.5));
    }
    else{arrowIcon(backCol,iconCol);}
    popMatrix();
    
    noStroke();
    rectMode(CENTER);
    var spacing = (map(0,0,sessionStats.length,590,190)-map(1,0,sessionStats.length,590,190));
    for(var i = 0; i<sessionStats.length; i++){
        if(i===questionID){
            fill(222,32);
            rect(map(i+0.5,0,sessionStats.length,590,240),475,spacing,50);
        }
        var val = 2*constrain(sessionStats[i].incorrect/(sessionStats[i].correct+1),0,1);
        fill(255*constrain(val,0,1),255*constrain(2-val,0,1),0);
        var xCenter = map(i+0.5,0,sessionStats.length,590,240),
        yCenter = 475,
        xSize = spacing/2,
        ySize = constrain(pow(sessionStats[i].correct+sessionStats[i].incorrect,0.8),0,10)*3;
        rect(xCenter,yCenter,xSize,ySize);
        if(abs(mouse.x-xCenter)<=xSize/2+3&&abs(mouse.y-(yCenter-3))<=ySize/2+6){
            fill(255);
            textAlign(CENTER,CENTER);
            text(studySet[i].a+"\n=\n"+studySet[i].b,mouse.x,mouse.y);
        }
    }
    rectMode(CORNER);
};

var studySetsList = function(){
    textSize(15);
    textAlign(LEFT,TOP);
    
    // switch questions and answers
    {
    var txt = "Switch Questions and Answers";
    stroke(theme.chillerColor);
    strokeWeight(2);
    noFill();
    rect(10,10,textWidth(txt)+10,30);
    fill(theme.chillColor);
    text(txt,15,15);
    if(mouse.x<26+textWidth(txt)&&mouse.y>10&&mouse.y<=50){
        // exists more
        noFill();
        stroke(theme.chillColor);
        strokeWeight(2);
        rect(10,10,textWidth(txt)+10,30);
        fill(theme.chillColor);
        text(txt,15,15.5);
        if(mouse.status==="clicking"||mouse.status==="pressing"){
            if(mouse.status==="clicking"){
                for(var i = 0; i<studySet.length; i++){
                    var swapper = studySet[i].a;
                    studySet[i].a=studySet[i].b;
                    studySet[i].b = swapper;
                }
                //resetSessionStats(); // idk maybe do this
                mouse.status="was clicking";
            }
            // even more existingness
            text(txt,14.5,15);
            text(txt,15.5,15);
            noFill();
            strokeWeight(2.5);
            stroke(lerpColor(theme.chillColor,theme.backgroundColor,-0.2));
            rect(10,10,textWidth(txt)+10,30);
        }
    }
    }
    
    
    textSize(11);
    
    // normal draw
    for(var i = 0; i<studySetSet.length; i++){
        stroke(theme.chillerColor);
        strokeWeight(2);
        noFill();
        rect(10,50+i*14,textWidth(studySetSet[i].name)+10,14);
        fill(theme.chillColor);
        text(studySetSet[i].name,15,50+i*14);
    }
    // mouse interaction
    for(var i = 0; i<studySetSet.length; i++){
        // check for being hovered over
        if(mouse.x<26+textWidth(studySetSet[i].name)&&mouse.y>48+i*14&&mouse.y<=62+i*14){
            // exists more
            noFill();
            stroke(theme.chillColor);
            strokeWeight(2);
            rect(10,50+i*14,textWidth(studySetSet[i].name)+10,14);
            fill(theme.chillColor);
            text(studySetSet[i].name,15,50+i*14);
            if(mouse.status==="clicking"||mouse.status==="pressing"){
                if(mouse.status==="clicking"){
                    studySet = studySetSet[i].studySet;
                    groupSetLabels = studySetSet[i].groupSetLabels;
                    groupSetCanBeQuestion = studySetSet[i].groupSetCanBeQuestion;
                    resetSessionStats();
                    mouse.status="was clicking";
                }
                // even more existingness
                text(studySetSet[i].name,14.5,50+i*14);
                text(studySetSet[i].name,15.5,50+i*14);
                noFill();
                strokeWeight(2.5);
                stroke(lerpColor(theme.chillColor,theme.backgroundColor,-0.2));
                rect(10,50+i*14,textWidth(studySetSet[i].name)+10,14);
            }
        }
    }
};
var studySetSidePreview = function(){
    // scroll bar and stuff
    
    // 225-scrollMin+(i-(studySet.length/2-0.5))*20 should equal 225 when i = 0: so that you can scroll the first element to the middle of the screen.
    // 225-scrollMax+(i-(studySet.length/2-0.5))*20 should equal 225 when i = studySet.length-1.
    var scrollMin=(-(studySet.length/2-0.5))*20;
    var scrollMax=(studySet.length-1-(studySet.length/2-0.5))*20;
    
    //if(mouse.x>250){
        menuListScroll = map(constrain(mouse.y,20,430),20,430,scrollMin,scrollMax);
    /*}
    else{
        menuListScroll = map(constrain(menuListScroll,20,430),20,430,scrollMin,scrollMax);
    }*/
    
    fill(theme.chillColor);
    strokeWeight(2);
    stroke(theme.chillerColor);
    line(593,20,593,430);
    noStroke();
    rectMode(CENTER);
    rect(593,map(menuListScroll,scrollMin,scrollMax,20,430),6,30,8);
    rectMode(CORNER);
    
    // draw the actual list
    fill(theme.chillColor);
    textSize(11.5);
    
    if(studySet[0].a===undefined){
        
    }
    else{
        for(var i = 0; i<studySet.length; i++){
            textAlign(RIGHT,CENTER);
            var txt = studySet[i].a;
            if(txt.length>33){txt=txt.substr(0,30)+"...";}
            text(txt,445,225-menuListScroll+(i-(studySet.length/2-0.5))*20);
            textAlign(LEFT,CENTER);
            txt = studySet[i].b;
            if(txt.length>23){txt=txt.substr(0,20)+"...";}
            text(txt,465,225-menuListScroll+(i-(studySet.length/2-0.5))*20);
        }
    }
};

var updateCombo = function(){
    if(comboTimer<=0){
        comboTimer = 0;
        if(combo>0){combo-=(ganime%20===0);}
        else{combo = 0;}
    }
    else{comboTimer--;}
};
var updateWriteRace = function(){
    if(writeRaceTimer>=0){
        writeRaceTimer++;
    }
};
var updateAnswerHistory = function(){
    scoreRate = 0;
    for(var i = answerHistory.length-1; i>-1; i--){
        scoreRate+=answerHistory[i].score;
        answerHistory[i].time++;
        if(answerHistory[i].time>=720){answerHistory.splice(i,1);}
        else  if(answerHistory[i].time>=600){
            // make it not seem so rigid
            answerHistory[i].score*=0.99;
        }
    }
    scoreRate*=5;
    scoreRate=round(10*scoreRate)/10;
};

shortenStringToOneLine = function(s,width){
    var ans = "";
    var i = 0;
    while(textWidth(ans+s[i])<width-1){
        ans+=s[i];
        i++;
    }
    return ans;
};

resetSessionStats = function(){
    sessionStats = [];
    for(var i = 0; i<studySet.length; i++){
        sessionStats[i]={correct:0,incorrect:0};
    }
    questionID=-1;
};
generateNextQuestionID = function(){
    if(questionID===undefined){questionID=-1;}
    if(studySet.length>1){
        var possibilities = [];
        var quantityOfLeastSelected = -1;
        for(var i = 0; i<studySet.length; i++){
            if(i===questionID){continue;}
            
            var quantity = sessionStats[i].correct*3+sessionStats[i].incorrect;
            if(quantity<=quantityOfLeastSelected||quantityOfLeastSelected===-1){
                if(quantity!==quantityOfLeastSelected){
                    quantityOfLeastSelected=quantity;
                    possibilities = [];
                }
                possibilities.push(i);
            }
        }
        if(possibilities.length){ // should always be true?
            questionID=possibilities[floor(random(0,possibilities.length))];
        }
        else{
            questionID=0;
        }
    }
    else{
        questionID=0;
    }
};
                        }

function setup(){
    var canvas=createCanvas(600,500);
    canvas.parent("app");
    canvas.id("quiz-canvas");
    canvas.attribute("aria-label","Interactive study quiz");
    pixelDensity(1);
    frameRate(60);
    angleMode(DEGREES);

    initializeThemes();
    initializeMobileTextInput();
    resetSessionStats();
    applyTheme(theme);
    loadScreen(screen);
}

draw = function(){
    pushMatrix();
    scale(width/600,height/500);
    
    if(ganime<360){ganime++;}
    else{ganime=1;}
    
    mouseUpdate();
    cursor("default");
    
    // Keep the native iOS input synchronized when a new canvas textbox loads
    // or when the program clears the current answer.
    if(mobileTextInput&&!mobileTextInputIsComposing){
        if(mobileTextInputTarget!==activeTextbox){
            mobileTextInputTarget = activeTextbox;
            mobileTextInput.value = (activeTextbox&&activeTextbox!==voidTextbox) ?
                activeTextbox.txt :
                "";
        }
        else if(
            activeTextbox &&
            activeTextbox!==voidTextbox &&
            mobileTextInput.value!==activeTextbox.txt
        ){
            mobileTextInput.value = activeTextbox.txt;
        }
    }
    
    applyTheme(theme);
    
    background(theme.backgroundColor);
    pushMatrix();
    // scale(height/500);

    if(inp[10]){
        var action = false;
        for(var i = 0; i<buttons.length; i++){
            if(buttons[i].tag==="answer correction"){
                action = true;
                buttons.splice(i,1);
                i--;
            }
        }
        // println(action);
        if(!action){
            activeTextbox.onEnter();
        }
        inp[10]=false;
    }
    
    
    
    
    
    // most stuff happens in page elements like buttons' functions
    switch(screen){
        case "menu":
            studySetSidePreview();
            break;
        case "practice accuracy":
            if(streak>bestStreak){
                bestStreak = streak;
            }
            break;
        case "practice speed":
            updateCombo();
            if(combo>bestCombo){
                bestCombo = combo;
            }
            updateAnswerHistory();
            if(scoreRate>bestScoreRate){
                bestScoreRate = scoreRate;
            }
            break;
        case "write race":
            updateWriteRace();
            break;
        case "remember list":
            break;
        case "settings":
            break;
        case "study sets":
            studySetsList();
            studySetSidePreview();
            break;
    }
    


    
    // don't talk to me about this
    {
    for(var i = 0; i<boxes.length; i++){
        boxes[i].update();
        boxes[i].display();
    }
    
    keepCheckingClickables = true;
    
    
    for(var i = 0; i<textboxes.length; i++){
        textboxes[i].display();
        textboxes[i].interactWithMouseFeedback();
    }
    for(var i = 0; i<buttons.length; i++){
        buttons[i].display();
        buttons[i].interactWithMouseFeedback();
    }
    for(var i = buttons.length-1; i>-1&&i<buttons.length&&keepCheckingClickables; i--){
        buttons[i].interactWithMouse();
    }
    
    for(var i = textboxes.length-1; i>-1&&i<textboxes.length&&keepCheckingClickables; i--){
        textboxes[i].interactWithMouse();
    }
    }
    
    bottomBar();
    
    noStroke();
    for(var i = particles.length-1; i>-1; i--){
        particles[i].exist(i);
    }
    
    drawFlashes();
    
    cursorBlinkTimer++;
    if(cursorBlinkTimer>=cursorBlinkPeriod){
        cursorBlinkTimer = 0;
    }
    
    popMatrix();
    
    mouseNature();
    
    //println("");
    popMatrix();
};

var lastTouchStartedAt = -1000;

var registerPointerPress = function(logicalX,logicalY){
    if(mouse.status==="clicking"||mouse.status==="was clicking"){
        mouse.status="pressing";
    }
    else if(mouse.status!=="pressing"){
        mouse.status="clicking";
    }

    mouse.x=logicalX;
    mouse.y=logicalY;

    // Focusing here keeps the call inside the user's press, which iOS
    // requires before it will display the software keyboard.
    focusMobileTextInputAt(logicalX,logicalY);
};

var registerPointerRelease = function(){
    if(mouse.status!=="idle"){
        if(mouse.status==="clicking"){
            mouse.releaseAfterClick=true;
        }
        else{
            mouse.status="released";
        }
    }
};

mousePressed = function(){
    // iOS may synthesize a mouse event after touchStarted. Ignore that second
    // event so one tap cannot trigger twice.
    if(millis()-lastTouchStartedAt<500){
        return false;
    }

    registerPointerPress(
        mouseX*600/width,
        mouseY*500/height
    );
    return false;
};

mouseReleased = function(){
    if(millis()-lastTouchStartedAt<500){
        return false;
    }
    registerPointerRelease();
    return false;
};

touchStarted = function(){
    lastTouchStartedAt=millis();

    var touchX=mouseX;
    var touchY=mouseY;
    if(touches&&touches.length){
        touchX=touches[0].x;
        touchY=touches[0].y;
    }

    registerPointerPress(
        touchX*600/width,
        touchY*500/height
    );
    return false;
};

touchEnded = function(){
    registerPointerRelease();
    return false;
};
