

const question = document.getElementById("question");

const choices = Array.from(document.getElementsByClassName("choice-text"));

const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");


const btn = document.getElementById('btn');

const btnBack = document.getElementById('btnBack');

radios = document.getElementsByTagName("input")








let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];


// Fetch questions from a local database
fetch('/static/allura_website/js/questions.json')
    .then( res => {
        return res.json();
    })
    .then(loadedQuestions => {
        questions = loadedQuestions;
        startGame();
    })
    .catch( err => {
        console.error(err);
    });






// let questions = [
//     {
//         question:"How is your nutrition?",
//         choice1: "Eats without assistance or prompting",
//         choice2: "Eats with prompting and/or encouragement",
//         choice3: "Requires constant supervision and some assistance e.g. cut into small pieces of pureed",
//         choice4: "Requires complete assistance to eat/is at risk of choking",
//     },
//     {
//         question:"How is my mobility?",
//         choice1: "Fully Mobile, including ascending and descending stairs",
//         choice2: "Mobilises independently with the use of mobility aids/supervision",
//         choice3: "Moderate risk of falls, mobilises with assistance from one person",
//         choice4: "Requires assistance from more than one person/use of a hoist/bedbound",
//     },
//     {
//         question:"What about my orientation?",
//         choice1: "Fully orientated in time/place/surroundings/people",
//         choice2: "Occasionally disorientated or orientated in a familiar environment or with familiar people only",
//         choice3: "Frequently disorientated, tends to wander",
//         choice4: "Completely disorientated at risk of getting lost",
//     },
//     {
//         question:"How is your communication?",
//         choice1: "Good, able to hold a conversation and remembers info",
//         choice2: "Able to communicate needs, remembers some info",
//         choice3: "Unable to communicate verbally but uses some non-verbal communication",
//         choice4: "Non-communicative",
//     },
//     {
//         question:"How do you readily accept support",
//         choice1: "Normally co-operative",
//         choice2: "Normally co-operative but ocassionaly needs persuasion",
//         choice3: "Regularly needs persuason",
//         choice4: "Needs persuasion",
//     },
//     {
//         question:"How is your general behaviour",
//         choice1: "Able to manage emotion",
//         choice2: "Occasionally upset but settles easily with distraction",
//         choice3: "Frequently upset but will settle after a period of distraction",
//         choice4: "Frequently upset and difficult to settle",
//     },
//     {
//         question:"Support at night",
//         choice1: "None",
//         choice2: "1-2 per week",
//         choice3: "3-5 per week",
//         choice4: "Frequently several times a night",
//     },
//     {
//         question:"What level of insight do I have into my care?",
//         choice1: "Understands care and support needs",
//         choice2: "Fair understanding of care but is occasionally vunerable",
//         choice3: "Poor understanding of care and suport needs, can be vunerable",
//         choice4: "No insight into care needs, requires others to make best interest decisions",
//     },
//     {
//         question:"How am I with dressing myself?",
//         choice1: "Can dress independently",
//         choice2: "Can dress myself but require supervision",
//         choice3: "Needs supervision and assistance",
//         choice4: "Unable to dress without full assistance",
//     },
//     {
//         question:"How well do I manage my personal hygiene",
//         choice1: "Manages personal hygiene independently",
//         choice2: "Manages personal hygiene with some prompting/assistance",
//         choice3: "Requires supervision and physical assistance",
//         choice4: "Unable to manage personal hygiene independently",
//     },
//     {
//         question:"What about my continence",
//         choice1: "Fully continent",
//         choice2: "Continent but requires assistance to the toilet",
//         choice3: "Frequently incontinent, requires support to manage with continence aids",
//         choice4: "Regularly incontinent and requires full support",
//     },
//     {
//         question:"Do I need support with medication",
//         choice1: "Self-administers without supervision",
//         choice2: "Administered with supervision, may require prompts",
//         choice3: "Administered by carer, occasionally refuses medication",
//         choice4: "Admninistered by carer, frequently refuses medication",
//     }
// ];

var answerData = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0
};

// Constants


const MAX_QUESTIONS = 12;



startGame = () => {
    counter = 1;
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];

    chosen = [];

    // getRadioInfo = () => {
    //     var decision = null;
    //     for (var i = 0; i < radios.length; i += 1) {
    //         if (radios[i].checked) {
    //             decision = radios[i].value;
    //         }
    //     }
    //     return decision;
    // }


    if (questionCounter === 0) {
        btnBack.style.display = "none";
        btnBack.disabled = true;
        btnBack.style.color = "black";
    }
    else {
        btnBack.style.color = "#fff";
    }



    getNewQuestion = () => {

        if(questionCounter > 0){
            btnBack.style.color = "#fff";
        }




        // Uncheck radio from previous selected choice

        var ele = document.getElementsByName("radio");
        for (var i = 0; i < ele.length; i++)
            ele[i].checked = false;

        // remove highlight from previous selected choice
        var elem = document.getElementsByClassName('group');
        for (var i = 0; i < elem.length; i++)
            elem[i].style.backgroundColor = '#fff';

        // remove border color from previous selected choice
        var elem = document.getElementsByClassName('group');
        for (var i = 0; i < elem.length; i++)
            elem[i].style.border = '2px solid #ccc';

        if (availableQuestions.length === 0 | questionCounter >= MAX_QUESTIONS) {
            localStorage.setItem("mostRecentScore", score);
            // go to the end page
            return window.location.assign('result');
        }




        progressText.innerText = `${counter}/${MAX_QUESTIONS}`;
        //Update the progress bar
        progressBarFull.style.width = `${(counter / MAX_QUESTIONS) * 100}%`;


        currentQuestion = availableQuestions[questionCounter];
        question.innerText = currentQuestion.question;







        choices.forEach(choice => {
            const number = choice.dataset['number'];
            choice.innerText = currentQuestion['choice' + number];

            // if (checkedRad = false) {
            //     choice.parentElement.style.backgroundColor = '#fff';
            // }

            // /* Add the active class to the button passed in */
            // function setThisButtonActive(button) {
            //     button.parentElement.classList.add("groupBlue");
            // }

            // /* select all active buttons, and remove the active class from them */
            // function resetActiveButton() {
            //     document.querySelectorAll("groupWhite").forEach((button) => {
            //         button.parentElement.classList.remove("groupWhite");
            //     });
            // }




            // // highlight label when radio checked
            // choice.addEventListener("click", e => {
            //     selectedChoice = e.target;

            //     resetActiveButton(selectedChoice);
            //     setThisButtonActive(selectedChoice);
            // });



            // Highlight selected choice
            // choice.addEventListener("click", e => {
            //     selectedChoice = e.target




            //     // checked radio
            //     var checkedRad = document.querySelector('input[name=radio]');


            //     if (checkedRad.checked) {
            //         selectedChoice.parentElement.style.backgroundColor = "#5D78FF";
            //     }

            // });







        });









        // result.innerText = score;

        acceptingAnswers = true;





    };



    // Previous Question

    getPreviousQuestion = () => {
        // var decision = getRadioInfo();
        // if(decision != null){
        //     choices[currentQuestion] = decision;
        // }
        // if(currentQuestion === 0){

        // }

        // Uncheck radio
        var ele = document.getElementsByName("radio");
        for (var i = 0; i < ele.length; i++)
            ele[i].checked = false;

        // remove highlight from previous selected choice
        var elem = document.getElementsByClassName('group');
        for (var i = 0; i < elem.length; i++)
            elem[i].style.backgroundColor = '#fff';

        // remove border color from previous selected choice
        var elem = document.getElementsByClassName('group');
        for (var i = 0; i < elem.length; i++)
            elem[i].style.border = '2px solid #ccc';



        if (availableQuestions.length === 0 | questionCounter >= MAX_QUESTIONS) {
            localStorage.setItem("mostRecentScore", score);
            // go to the end page
            return window.location.assign('result');
        }








        progressText.innerText = `${counter}/${MAX_QUESTIONS}`;
        //Update the progress bar
        progressBarFull.style.width = `${(counter / MAX_QUESTIONS) * 100}%`;


        currentQuestion = availableQuestions[questionCounter];
        question.innerText = currentQuestion.question;

        console.log(questionCounter);

        if (questionCounter === 0) {
            btnBack.disabled = true;
            btnBack.style.color = "black";
        }
        else {
            btnBack.style.color = "#fff";
        }










        choices.forEach(choice => {
            const number = choice.dataset['number'];
            choice.innerText = currentQuestion['choice' + number];



            // choice.addEventListener("click", e => {
            //     if (!acceptingAnswers) return;

            //     acceptingAnswers = false;
            //     const selectedChoice = e.target

            //     console.log(radios[selectedChoice]);
            // });

            // console.log(radios[number]);



            // if (checkedRad = false) {
            //     choice.parentElement.style.backgroundColor = '#fff';
            // }

            // /* Add the active class to the button passed in */
            // function setThisButtonActive(button) {
            //     button.parentElement.classList.add("groupBlue");
            // }

            // /* select all active buttons, and remove the active class from them */
            // function resetActiveButton() {
            //     document.querySelectorAll("groupWhite").forEach((button) => {
            //         button.parentElement.classList.remove("groupWhite");
            //     });
            // }



            // var ele = document.getElementsByName("radio");
        // for (var i = 0; i < ele.length; i++)
        //     ele[i].checked = false;




            // // highlight label when radio checked
            // choice.addEventListener("click", e => {
            //     selectedChoice = e.target;

            //     resetActiveButton(selectedChoice);
            //     setThisButtonActive(selectedChoice);
            // });



            //Highlight selected choice
            // choice.addEventListener("click", e => {
            //     selectedChoice = e.target




            //     // checked radio
            //     var checkedRad = document.querySelector('input[name=radio]:checked');


            //     if (checkedRad = true) {
            //         selectedChoice.parentElement.style.backgroundColor = "#5D78FF";
            //     }

            // });
        });

        // console.log(elem[choices[questionCounter]]);


        // if (counter = 1) {
        //     btnBack.style.display = "none";
        // }






        // result.innerText = score;

        acceptingAnswers = true;



    };






















    //




    choices.forEach(choice => {
        choice.addEventListener("click", e => {
            if (!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedChoice = e.target
            const selectedAnswer = selectedChoice.dataset["number"];





            incrementScore(selectedAnswer);

            //












            // //NEXT BUTTON //
            // btn.onclick = function () {
            //     const rbs = document.querySelectorAll('input[name="radio"]');
            //     rbs.checked = false;
            //     for (const rb of rbs) {
            //         if (rb.checked === true) {
            //             getNewQuestion();
            //             break
            //         };
            //     };
            // };



            // old unchecked radio


            // if(document.querySelectorAll('input[name="radio"]').checked == true){

            //     nextQuestion.addEventListener("click", () => {
            //         getNewQuestion();
            //     });
            // } else return;






            // old get new question

            /*getNewQuestion();*/
        });
    });


    // var restorePreviousAnswer = function () {
    //     console.log
    //     if (choices[currentQ] != null) radios[choices[currentQ]].checked = true
    // }

    console.log(radios[choices[currentQuestion]])










    incrementScore = num => {

        if (num === "1") {
            score += 1;
        } else if (num === "2") {
            score += 2;
        } else if (num === "3") {
            score += 3;
        } else if (num === "4") {
            score += 4;
        };



    };





    getNewQuestion();





    btn.addEventListener('click', () => {

        btnBack.style.display = "#fff";

        const rbs = document.querySelectorAll('input[name="radio"]');
        rbs.checked = false;
        for (const rb of rbs) {
            if (rb.checked === true) {
                counter++;
                questionCounter++;
                if (counter > 1) {
                    btnBack.style.display = "inline-block";
                }
                getNewQuestion();
                break
            };
        };
    });

    btnBack.addEventListener('click', () => {
        if (counter > 1 & questionCounter > 0) {
            counter--;
            questionCounter--;


        }



        getPreviousQuestion();








    });






    // btnBack.onclick = function () {
    //     if (questionCounter > 0) {
    //         getPreviousQuestion();
    //     };

    // };









};



// startGame();
