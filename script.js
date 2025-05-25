const my_canvas = document.getElementById('my_canvas');

const context = my_canvas.getContext('2d');

my_canvas.width = window.innerWidth;
my_canvas.height = window.innerHeight;


let waterDropsArray = [];
let waterParticlesArray = [];

function WaterDrops()
{
    // intial positions
    this.x = Math.floor(((window.innerWidth/2) - 140) + Math.floor(Math.random()* window.innerWidth / 6));
    this.y = 180;
    
    this.size = 5; // radius of drops

    let speedArray = [10,8.9,8,11,10.5,7,9,15,11.7,10.7,10.1,15.4,11.1,12,12.54]; // random values
    // random falling speed
    let speedY = speedArray[Math.floor(Math.random()* speedArray.length)]; 

    // drop falls downward
    this.update = ()=>
    {
        this.y += speedY
    }

    // draw the drop as a blue circle
    this.draw = ()=>
    {
        context.fillStyle = 'blue';
        context.beginPath();
        context.arc(this.x,this.y,this.size,0,Math.PI * 2);
        context.fill();
    }
}

function WaterParticles(x) 
{
    // splash appear where the water drop lands
    this.x = x;
    this.y = window.innerHeight - 100;

    // Varied particle size when splashed
    this.size = Math.random() * 3 + 2;

    // Random splash motion in all directions
    let speedX = Math.random()*3 - 1.5;
    let speedY = Math.random() - 1.5;

    this.update = ()=>
    {
        this.y += speedY;
        this.x += speedX;
        if (this.size > .2) 
        {
            this.size -= .1;
        }
    }

    this.draw = ()=>
    {
        context.fillStyle = 'blue';
        context.beginPath();
        context.arc(this.x,this.y,this.size,0,Math.PI * 2);
        context.fill();
    }
}

// drawing and updating splashes
function renderWaterParticles() 
{
    for (let i = 0; i < waterParticlesArray.length; i++) 
    {
        waterParticlesArray[i].draw(); 
        waterParticlesArray[i].update(); 

        if (waterParticlesArray[i].size <= .2) 
        {
            waterParticlesArray.splice(i,1);
            i--;
        }
    }
}

// drawing and updating droplets
function renderWaterDrops() 
{
    for (let i = 0; i < waterDropsArray.length; i++) 
    {
        waterDropsArray[i].draw(); 
        waterDropsArray[i].update(); 
        if (waterDropsArray[i].y >= window.innerHeight - 100) 
        {
            for (let index = 0; index < 12; index++) 
            {
                waterParticlesArray.push(new WaterParticles(waterDropsArray[i].x))
            }
            waterDropsArray.splice(i,1);
            i--;
        }
    }
}

function animate() 
{
    // fill the canvas with the selected color
    context.fillStyle = 'rgb(131, 108, 141)';
    context.fillRect(0,0,my_canvas.width,my_canvas.height);
    
    // start drawing the line at the bottom
    context.beginPath();
    context.fillStyle = 'white';
    context.rect(window.innerWidth / 4,window.innerHeight - 100, window.innerWidth / 2,4);
    context.fill();

    renderWaterDrops();
    renderWaterParticles();
    requestAnimationFrame(animate);
}

animate();

setInterval(() => 
{
    // add 3 new water drops every 200 milliseconds
    for (let i = 0; i < 3; i++) 
    {
        waterDropsArray.push(new WaterDrops())
    }
}, 200);