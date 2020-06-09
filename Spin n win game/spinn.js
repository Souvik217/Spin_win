
let config={
    type:Phaser.AUTO,
    width:900,
    height:500,
    backgroundColor:0xffcc00,
    physics:{
        default:'arcade',
        arcade:{
            gravity:{
                y:-400,
            }
        }
    },
    
    
    scene:{
        preload:preload,
        create :create,
        update:update,
    }
    
    
};

var game =new Phaser.Game(config);


function preload(){
    console.log("Preload");
    
    this.load.image('wheel','assets/whl.png');
    this.load.image('pin','assets/pin.png');
    this.load.image('button','assets/spin.png');
    this.load.image('black','assets/bb1.png');
    this.load.image('base','assets/base1.png');
    this.load.image('saw','assets/saw.png');
    this.load.image("apple","assets/congo1.png");
    this.load.image("apple3","assets/bal3.png");
    this.load.video('back','assets/vv.mp4','loadeddata',false,true);
    this.load.audio('audio1', "assets/song.mp3");
    this.load.audio('pop', "assets/Kim-Possible.mp3");
    
}



function create(){
    console.log("Create");
    
    let w=game.config.width;
    let h=game.config.height;
    
    video = this.add.video(w/2,h/2,'back');
    video.play(true);
    
    this.saw=this.add.sprite(w/2-200,h/2-100,'saw');
    this.saw.setScale(0.7);
    
    base=this.add.sprite(w/2+210,h/2+150,'base');
    base.setScale(0.20);
    
    this.wheel=this.add.sprite(w/2+210,h/2-20,'wheel');
    this.wheel.setScale(0.65);
    
    black=this.add.sprite(w/2+210,h/2-20,'black');
    black.setScale(0.25);
    
    
    pin=this.add.sprite(w/2+210,h/2-180,'pin');
    pin.setScale(0.15);

    
   this.font_style={
        font:"bold 15px Roboto",
        align:"center",
        color:"white",
    }
    this.font_style1={
        font:"bold 85px Roboto",
        align:"center",
        color:"white",
    }
    this.game_text=this.add.text(208,350,"Tap to Spin",this.font_style);
    this.game_text=this.add.text(w/2+187,h/2-65,"",this.font_style1);
    
    
    this.canSpin=true;
    
    this.but=this.add.image(240,320,'button').setInteractive();
    this.but.on('pointerup',spinwheel,this)
    this.but.setScale(0.7);
    
    
    music = this.sound.add('audio1');
    pop = this.sound.add('pop');

    
}



function update(){
    console.log("Inside update");
     this.but.setScale(0.7);

    if(this.canSpin==false){
        this.but.scaleX+=0.2;
        this.but.scaleY+=0.2;
        
    }
    
}



function spinwheel(){
    
  if(this.canSpin){
     music.play();
     rounds=Phaser.Math.Between(2,5);
     this.degree=Phaser.Math.Between(0,11)*30;
     total=rounds*360+this.degree+15;
     this.canSpin = false;
    
     tween = this.tweens.add({
        targets:this.wheel,
        angle:total,
        ease:"Cubic.easeOut",
        duration:3000,
        callbackScope:this,
        onComplete:function(){
            
            music.stop();
            pop.play();
            
            this.game_text.setText(""+(12-(this.degree/30)));
            
            
            fruits1=this.physics.add.group({
                key:"apple",
                repeat:1,
                setScale:{x:1,y:1},
                setXY:{x:440,y:510},
            });
            
           
            fruits2=this.physics.add.group({
                key:"apple3",
                repeat:10,
                setScale:{x:0.2,y:0.2},
                setXY:{x:70,y:450,stepX:150},
            });
            
            fruits3=this.physics.add.group({
                key:"apple3",
                repeat:10,
                setScale:{x:0.2,y:0.2},
                setXY:{x:0,y:400,stepX:150},
            });
            
             
            
            this.canSpin=true;
            
           
        }
    });
  }
}


