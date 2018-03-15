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
        boards:[cc.Node],
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
    },

    // LIFE-CYCLE CALLBACKS:


     onLoad () {
         this.shapeList = [];
         for(var n = 0; n < 50; n ++)
         {
             this.shapeList.push(this.createShape());
         }


         this.node.on('underAttack', function (event) {
             this.attackCallBack(event.getUserData().isAI,event.getUserData().line);
             event.stopPropagation();
         },this);

         this.node.on('gameOver', function (event) {
             alert(event.getUserData().isAI ? "AI真菜！" : "你好菜啊！");
             this.reset();
             event.stopPropagation();
         },this);
     },



    start () {
        for(var i = 0; i < this.boards.length; i ++)
        {
            var board = this.boards[i].getComponent("MainBoard");
            if(board != null)
            {
                board.startGame(this.shapeList);
            }
        }
    },

    reset:function(){
        this.shapeList = [];
        for(var n = 0; n < 50; n ++)
        {
            this.shapeList.push(this.createShape());
        }
        for(var i = 0; i < this.boards.length; i ++)
        {
            var board = this.boards[i].getComponent("MainBoard");
            if(board != null)
            {
                board.reset(this.shapeList);
            }
        }
    },

    attackCallBack:function(isAI,line)
    {
        for(var j = 0;j < this.boards.length; j ++)
        {
            var board = this.boards[j].getComponent("MainBoard");
            if(board != null)
            {
                if(board.isAI != isAI)
                {
                    board.underAttack(line);
                }
            }
        }
    },

    createShape:function() {
        var shapeTypes = [LShape, JShape, IShape, OShape, TShape, SShape, ZShape];
        var colorTypes = [cc.color(255,0,0), cc.color(0,255,0), cc.color(0,0,255), cc.color(255,100,255)]

        var shapeIdx = Math.floor(Math.random() * 100) % shapeTypes.length;
        var shapePos = Math.floor(Math.random() * 100) % 4;
        var colorIdx = Math.floor(Math.random() * 100) % colorTypes.length;

        return new shapeTypes[shapeIdx](4, 0, shapePos, colorTypes[colorIdx]);
    }

    // update (dt) {},
});
