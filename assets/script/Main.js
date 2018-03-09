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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    start () {
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
        this.uiGp.rect(190, 390, -200, -410);
        this.uiGp.stroke();

        this.uiGp.strokeColor = cc.hexToColor('#0000ff');
        this.uiGp.rect(-160, 50, 120, 120);
        this.uiGp.stroke();

        this.score.node.position = cc.v2(-200,20);
        //this.score.string = "score:0";

        this.gameScene = new GameScene();
        this.gameScene.initGame();
        this.gameScene.startGame();
    },

    update (dt) {
        this.gameScene.updateGame();
        this.gameScene.renderGame(this.uiGp,this.boardsArr,this.showBoardsArr,this.score);
    },

    //var:GameState = {
    //    STATE_INIT:0,
    //    STATE_STEP:1,
    //    STATE_RUN:2,
    //    STATE_OVER:3
    //},

});
