// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        uiGp:cc.Graphics,
        itemBase:cc.Prefab,
        board:cc.Node,
        score:cc.Label,
        isAI: {
            default: false,
            serializable: true
        },
        atk:1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.moves = new Array();

        this.isStart = false;

        this.lockDown = false;
    },

    startGame: function (shapeList) {
        this.row = 20;
        this.col = 10;
        this.boardsArr = new Array(this.row);
        for ( var i = 0; i < this.row; i++ ) {
            this.boardsArr[i] = new Array(this.col);
            for ( var j = 0; j < this.col; j++ ) {
                var newItem = cc.instantiate(this.itemBase);
                newItem.position = new cc.Vec2((j- 5)* 20, (i - 10)* 20);
                newItem.active = false;
                newItem.parent = this.board;
                newItem.color = cc.color(255,255,255);
                this.boardsArr[i][j] = newItem;
            }
        }

        this.showBoardsArr = new Array(4);
        for ( var i = 0; i < 4; i++ ) {
            this.showBoardsArr[i] = new Array(4);
            for (var j = 0; j < 4; j++) {
                var newItem = cc.instantiate(this.itemBase);
                newItem.position = new cc.Vec2(-220 + j* 20, -120 + i* 20);
                newItem.active = false;
                newItem.parent = this.board;
                newItem.color = cc.color(255,255,255);
                this.showBoardsArr[i][j] = newItem;
            }
        }
        //this.uiGp.fillRect(0,0,200,200);
        //this.uiGp.rect(0,0,100,100);
        //this.uiGp.strokeColor = cc.color(125,0,0);
        //this.uiGp.stroke();

        this.uiGp.strokeColor = cc.hexToColor('#ff0000');
        this.uiGp.rect(90, 190, -200, -400);
        this.uiGp.stroke();

        this.uiGp.strokeColor = cc.hexToColor('#0000ff');
        this.uiGp.rect(-260, -150, 120, 120);
        this.uiGp.stroke();

        this.score.node.position = cc.v2(-200,20);
        //this.score.string = "score:0";

        this.gameScene = new GameScene(shapeList);
        this.gameScene.initGame();
        this.gameScene.startGame(this.isAI);

        this.isStart = true;
    },

    reset:function(shapeList)
    {
        this.gameScene = new GameScene(shapeList);
        this.gameScene.initGame();
        this.gameScene.startGame(this.isAI);

        this.isStart = true;
    },

    start () {
        //this.row = 20;
        //this.col = 10;
        //this.boardsArr = new Array(this.row);
        //for ( var i = 0; i < this.row; i++ ) {
        //    this.boardsArr[i] = new Array(this.col);
        //    for ( var j = 0; j < this.col; j++ ) {
        //        var newItem = cc.instantiate(this.itemBase);
        //        newItem.position = new cc.Vec2((j- 5)* 20, (i - 10)* 20);
        //        newItem.active = false;
        //        newItem.parent = this.board;
        //        newItem.color = cc.color(255,255,255);
        //        this.boardsArr[i][j] = newItem;
        //    }
        //}
        //
        //this.showBoardsArr = new Array(4);
        //for ( var i = 0; i < 4; i++ ) {
        //    this.showBoardsArr[i] = new Array(4);
        //    for (var j = 0; j < 4; j++) {
        //        var newItem = cc.instantiate(this.itemBase);
        //        newItem.position = new cc.Vec2(-220 + j* 20, -120 + i* 20);
        //        newItem.active = false;
        //        newItem.parent = this.board;
        //        newItem.color = cc.color(255,255,255);
        //        this.showBoardsArr[i][j] = newItem;
        //    }
        //}
        ////this.uiGp.fillRect(0,0,200,200);
        ////this.uiGp.rect(0,0,100,100);
        ////this.uiGp.strokeColor = cc.color(125,0,0);
        ////this.uiGp.stroke();
        //
        //this.uiGp.strokeColor = cc.hexToColor('#ff0000');
        //this.uiGp.rect(90, 190, -200, -400);
        //this.uiGp.stroke();
        //
        //this.uiGp.strokeColor = cc.hexToColor('#0000ff');
        //this.uiGp.rect(-260, -150, 120, 120);
        //this.uiGp.stroke();
        //
        //this.score.node.position = cc.v2(-200,20);
        ////this.score.string = "score:0";
        //
        //this.shapeList = new Array();
        //    for (var n = 0; n < 10; n++) {
        //        this.shapeList.push(this.createShape());
        //    }
        //
        //this.gameScene = new GameScene(this.shapeList);
        //this.gameScene.initGame();
        //this.gameScene.startGame(this.isAI);
    },

    update (dt) {
        if(this.isStart) {
            this.gameScene.updateGame(this.isAI, this.moves);
            this.gameScene.renderGame(this.uiGp, this.boardsArr, this.showBoardsArr, this.score);
            if(this.gameScene.attack)
            {
                this.gameScene.attack = false;
                var event = new cc.Event.EventCustom('underAttack', true);
                event.setUserData({isAI:this.isAI,line:this.gameScene.attackLine,atk:this.atk});
                this.node.dispatchEvent(event);
            }
        }
        if(this.gameScene.isGameOver)
        {
            var event = new cc.Event.EventCustom('gameOver', true);
            event.setUserData({isAI:this.isAI});
            this.node.dispatchEvent(event);
        }
    },

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    underAttack:function(line,atk)
    {
        this.gameScene.underAttack(line,atk);
    },

    onKeyDown: function (event) {
        if(this.isStart) {
            switch (event.keyCode) {
                case cc.KEY.right:
                    this.moves = new Array();
                    this.moves.push({x: -1, y: 0, idx: 0});
                    break;
                case cc.KEY.left:
                    this.moves = new Array();
                    this.moves.push({x: 1, y: 0, idx: 0});
                    break;
                case cc.KEY.up:
                    this.moves = new Array();
                    this.moves.push({x: 0, y: 0, idx: 1});
                    break;
                case cc.KEY.down:
                    if(!this.lockDown) {
                        this.moves = new Array();
                        this.moves.push({x: 0, y: 1, idx: 0});
                        this.lockDown = true;
                    }
                    break;
            }
        }
    },

    onKeyUp: function (event) {
        switch(event.keyCode) {
            case cc.KEY.down:
                this.lockDown = false;
                break;
            //case cc.KEY.right:
            //    this.moves.push({ x: -1,y:0,idx:0 });
            //    break;
            //case cc.KEY.left:
            //    this.moves.push({ x: 1,y:0,idx:0 });
            //    break;
            //case cc.KEY.up:
            //    this.moves.push({ x:0,y:0,idx:1 });
            //    break;
        }
    },

    //var:GameState = {
    //    STATE_INIT:0,
    //    STATE_STEP:1,
    //    STATE_RUN:2,
    //    STATE_OVER:3
    //},

});
