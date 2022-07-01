let container= document.querySelector('.container');
let button= document.querySelector('.button');
let error=document.querySelector('.error');
let groupeC=document.querySelector('.groupe');
let boxes=[];
let pos=[];
let sound = new Audio('./assets/tada.mp3');
let animals = [new Card('./assets/dog.png'),
new Card('./assets/turtle.png'),
new Card('./assets/koala.png'),
new Card('./assets/lion.png'),
new Card('./assets/elephant.png'),
new Card('./assets/cat.png'),
new Card('./assets/fox.png'),
new Card('./assets/hen.png'),
new Card('./assets/bee.png'),
new Card('./assets/whale.png'),
new Card('./assets/owl.png'),
new Card('./assets/octopus.png'),
new Card('./assets/chameleon.png'),
new Card('./assets/chick.png'),
new Card('./assets/butterfly.png'),
new Card('./assets/panda.png')
]
let fruits=[
new Card('./assets/apple.png'),
new Card('./assets/strawberry.png'),
new Card('./assets/durian.png'),
new Card('./assets/lemon.png'),
new Card('./assets/bananas.png'),
new Card('./assets/fruit.png'),
new Card('./assets/grapes.png'),
new Card('./assets/watermelon.png'),
new Card('./assets/mango.png'),
new Card('./assets/dragon-fruit.png'),
new Card('./assets/passion-fruit.png'),
new Card('./assets/cherries.png'),
new Card('./assets/kiwi.png'),
new Card('./assets/grapess.png'),
new Card('./assets/cabbage.png'),
new Card('./assets/pumpkin.png'),
new Card('./assets/papaya.png'),
new Card('./assets/pineapple.png'),
new Card('./assets/peach.png'),
new Card('./assets/rambutan.png')
]
let groupe=[animals,fruits];
let chosenGroupe=undefined;
let m;
function create(){
for (let i=1; i<=m;i++){
   let u= document.createElement('div');
   u.classList.add('box');
   u.classList.add(`b${i}`);
   let j=document.createElement('div');
   j.classList.add('img');
   u.appendChild(j);
   j=document.createElement('div');
   j.classList.add('style')
   u.appendChild(j);
   container.appendChild(u);

}
for (let i=1;i<=m;i++){
    boxes.push(document.querySelector(`.b${i}`));
}


if (m<=10){
    container.style.width='340px';
}else if (m<=24){
    container.style.width='430px';
}else if (m<=30){
    container.style.width='520px';
}else{
    container.style.width='610px';

} 
}

function getPos(){
    let u= Math.floor(Math.random() * m);
    while (pos.includes(u)){
         u= Math.floor(Math.random() * m);
    }    
    pos.push(u);
    return u;

}
function Card(img){
    this.img=img;
    let p1;
    let p2;
    this.getPos=()=>{
        p1=getPos();
        p2=getPos();
    }
    Object.defineProperty(this,'p1',{
        get : ()=>{
            return p1;
        }
    });
    Object.defineProperty(this,'p2',{
        get: ()=>{
            return p2;
        }
    })
   
}

function start(){
    let used=[];
    for (let i=0; i<(m)/2; i++){
    let u= Math.floor(Math.random() *  groupe[chosenGroupe].length);
    while (used.includes(u)){
         u= Math.floor(Math.random() * groupe[chosenGroupe].length);
    }
    used.push(u);
    groupe[chosenGroupe][u].getPos();
    boxes[groupe[chosenGroupe][u].p1].firstElementChild.style.backgroundImage=`url(${groupe[chosenGroupe][u].img})`;
    boxes[groupe[chosenGroupe][u].p2].firstElementChild.style.backgroundImage=`url(${groupe[chosenGroupe][u].img})`;

}
}



let press=0;
let fTarget;
//-----------------------------------------------------------------
let tap=(e)=>{
 if(e.target.classList.contains('style')){
    if (press<2){
       e.target.classList.add('down')
       press++; 
     }

     
     
     if (press===2){
         if (e.target===fTarget){
           press=1;
        }else{
            container.removeEventListener('click',tap);
            setTimeout(()=>{
                if (fTarget.offsetParent.firstElementChild.style.backgroundImage!==e.target.offsetParent.firstElementChild.style.backgroundImage){
                    addvib(e.target.offsetParent,'shakeX',350);
                    addvib(fTarget.offsetParent,'shakeX',350);
                    e.target.classList.remove('down');
                    fTarget.classList.remove('down');  
                }
                container.addEventListener('click',tap);
                press=0;
                fTarget=undefined;
            },1000)
        }
    }else if (press===1){
       fTarget=e.target;
    } 

    let b=true;
    let i=0;

   while (i<boxes.length && b){
       b= boxes[i].children[1].classList.contains('down')
       i++;
   }
   if (b){
     setTimeout(() => {
        sound.play()
        addvib(container,'tada',1500);
        setTimeout(() => {  
            for (let i=0; i < boxes.length; i++){
                boxes[i].children[1].classList.remove('down')
            }
            setTimeout(() => {
                pos=[];
               start();
            }, 820);
        }, 1000);
     }, 500);
    
   }
}   
}
function addvib(e,t,d){
    e.classList.add('animate__animated');
    e.classList.add('animate__'+t);
    setTimeout(()=>{
    e.classList.remove('animate__animated');
    e.classList.remove('animate__'+t);
    },d);
}


button.addEventListener('click',(e)=>{
   button.classList.add('buttc')
   setTimeout(()=>{
    button.classList.remove('buttc')

   },200);

   if(button.offsetParent.firstElementChild.children[0].value.length===0 || chosenGroupe===undefined||button.offsetParent.firstElementChild.children[0].value > groupe[chosenGroupe].length+1 ){
       addvib(button.offsetParent,'shakeX',300);
   }else{
       m= parseInt(button.offsetParent.firstElementChild.children[0].value) *2;
       create();
       start();
       container.style.display='flex';
       button.offsetParent.style.display='none';
       container.addEventListener('click',tap);

   }
})


groupeC.addEventListener('click',(e)=>{
    if (e.target!==groupeC){
       if (e.target===groupeC.children[0]){
           if (groupeC.children[1].classList.contains('clicked') ){
               groupeC.children[1].classList.remove('clicked')
            }
            groupeC.children[0].classList.add('clicked');
               chosenGroupe=0;

      }else if(e.target===groupeC.children[1]){
        if (groupeC.children[0].classList.contains('clicked') ){
            groupeC.children[0].classList.remove('clicked')
         }
         groupeC.children[1].classList.add('clicked');
            chosenGroupe=1;

      }
    e.target.classList.add('clicked')
   } }
)


