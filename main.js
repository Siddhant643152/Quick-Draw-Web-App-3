quick_draw_data_set=["alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup","compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher","diving board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear"]
random_number = Math.floor((Math.random()*quick_draw_data_set.length)+1);
Element_of_array = quick_draw_data_set[random_number];
document.getElementById("sketch_to_draw").innerHTML = "Sketch To Be Drawn:" + Element_of_array;

timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;
sketch = Element_of_array;

function preload(){
    classifier = ml5.imageClassifier("DoodleNet");
}
function setup(){
    canvas = createCanvas(300,300);
    canvas.center();
    background("white");
    canvas.mouseReleased(guesstheanswer);
}
function draw() {
    check_sketch();
    strokeWeight(13)
    stroke("black");
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    if(drawn_sketch == sketch){
        answer_holder = "set";
        score = score+1;
        document.getElementById("score").innerHTML = "Score: "+score;
    }
}
function check_sketch(){
    timer_counter++;
    document.getElementById("time").innerHTML = "Time: "+timer_counter;
    if(timer_counter>500){
        timer_counter = "0";
        timer_check = "completed";
    }
    if(timer_check == "completed" || answer_holder == "set"){
        timer_check = "";
        answer_holder = "";
        updateCanvas();
    }
}
function updateCanvas(){
    background("white");
    quick_draw_data_set=["alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup","compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher","diving board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear"]
    random_number = Math.floor((Math.random()*quick_draw_data_set.length)+1);
    Element_of_array = quick_draw_data_set[random_number];
    document.getElementById("sketch_to_draw").innerHTML = "Sketch To Be Drawn:" + Element_of_array;
    sketch = Element_of_array;
    document.getElementById("sketch_to_draw").innerHTML = "Sketch To Be Drawn:"+sketch;
}
function guesstheanswer(){
    classifier.classify(canvas, gotResults);
}
function gotResults(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    drawn_sketch = results[0].label;
    document.getElementById("sketch_txt").innerHTML = "Your Sketch:" + results[0].label;
    document.getElementById("confidence_txt").innerHTML = "Confidence:"+Math.round(results[0].confidence * 100)+"%";
}