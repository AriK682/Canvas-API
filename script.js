//get canvas element
const canvas = document.getElementById('myCanvas');

//get 2D context
const context = canvas.getContext('2d');

//animation speed and rotation
let speed = 0.002;
let rotation = 0;

//stars for the canvas
const stars = [
    {offset: 0,radius:40,color:'#00FFFF'},
    {offset: 1.5,radius:50,color:'#8000FF'},
    {offset: 3,radius:45,color:'#FF69B4'},
    {offset: 4.5,radius:45,color:'#FF00FF'}
]

//center of the aniamtion
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;
const pathRadius = 200;

//function to draw a star on the canvas
function drawStar(x,y,radius,color){

    context.beginPath();
    context.moveTo(x, y - radius); // the top
    context.lineTo(x + radius * 0.2, y - radius * 0.2); // the bottom right
    context.lineTo(x + radius, y); // the right
    context.lineTo(x + radius * 0.2, y + radius * 0.2); // the bottom right
    context.lineTo(x, y + radius); // the bottom
    context.lineTo(x - radius * 0.2, y + radius * 0.2); // the bottom left
    context.lineTo(x - radius, y); // the left
    context.lineTo(x - radius * 0.2, y - radius * 0.2); // the top left
    // close the path
    context.closePath();
    // set the fill color
    context.fillStyle = color;
    context.fill();

    
}

//increase speed on click
canvas.addEventListener('click', function() {
    speed += 0.002;
});

//update the center of the animation based on mouse position
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    centerX = (event.clientX - rect.left) * (canvas.width / rect.width);
    centerY = (event.clientY - rect.top) * (canvas.height / rect.height);

    
});

function animate() {

    //clear the canvas with a semi-transparent black rectangle for the trail effect
    context.fillStyle = "rgba(0, 0, 0, 0.1)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    //controls the speed
    const time = rotation;
    rotation += speed * 16;

    //go through each star
    stars.forEach((star) => {
        const angle = time + star.offset;
        const x = centerX + Math.cos(angle) * pathRadius;
        const y = centerY + Math.sin(angle) * pathRadius;
        drawStar(x, y, star.radius, star.color);

        //add the glow
        context.save();
        context.shadowBlur = 25;
        context.shadowColor = star.color;

        //draw the star with the glow
        drawStar(x, y, star.radius, star.color);
        context.restore();
    });

    //request the next animation frame
    requestAnimationFrame(animate);
}

//start the animation
animate();