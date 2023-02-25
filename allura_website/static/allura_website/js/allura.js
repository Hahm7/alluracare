

const question = document.getElementById("question");

const choices = Array.from(document.getElementsByClassName("choice-text"));

const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");


const btn = document.getElementById('btn');

const btnBack = document.getElementById('btnBack');

radios = document.getElementsByTagName("input")


var answers = [];









let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
let checking = [];




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



var answerData = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0
};

// Constants


const MAX_QUESTIONS = 12;



// function collectUserAnswer() {
//     availableQuestions[questionCounter].userAnswer = document.querySelector('input[name="radio"]:checked').value;
// }

// var radios = document.getElementsByTagName("input");

// function restorePreviousAnswer() {
//     if (choices[currentquestion] != null) {
//         radios[choices[currentQuestion]].checked = true
//     }

// }

// Uncheck radio
        // var ele = document.getElementsByName("radio");
        // for (var i = 0; i < ele.length; i++)
        //     ele[i].checked = false;

        // // remove highlight from previous selected choice
        // var elem = document.getElementsByClassName('group');
        // for (var i = 0; i < elem.length; i++)
        //     elem[i].style.backgroundColor = '#fff';

        // // remove border color from previous selected choice
        // var elem = document.getElementsByClassName('group');
        // for (var i = 0; i < elem.length; i++)
        //     elem[i].style.border = '2px solid #ccc';


function collectUserAnswer () {
    availableQuestions[questionCounter].userAnswer = document.querySelector('input[name="choice"]:checked').value;
}




startGame = () => {
    counter = 1;
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];


    // chosen = [];

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

        // // Uncheck radio
        // var ele = document.getElementsByName("radio");
        // for (var i = 4; i > ele.length; i--)
        //     ele[i].checked = true;

        // // remove highlight from previous selected choice
        // var elem = document.getElementsByClassName('group');
        // for (var i = 0; i < elem.length; i++)
        //     elem[i].style.backgroundColor = "#28a7dc";

        // // remove border color from previous selected choice
        // var elem = document.getElementsByClassName('group');
        // for (var i = 0; i < elem.length; i++)
        //     elem[i].style.border = '2px solid black';


        // Uncheck radio from previous selected choice

        // var ele = document.getElementsByName("radio");
        // for (var i = 0; i < ele.length; i++)
        //     ele[i].checked = false;

        // // remove highlight from previous selected choice
        // var group = document.getElementsByClassName('group');
        // for (var i = 0; i < group.length; i++)
        //     group[i].style.backgroundColor = '#fff';

        // // remove border color from previous selected choice
        // var group= document.getElementsByClassName('group');
        // for (var i = 0; i < group.length; i++)
        //     group[i].style.border = '2px solid #ccc';







        var elem = document.getElementsByName("radio");

        for (var i = 0; i < elem.length; i++) {
            if (elem[i].checked === true) {
                // var backG = document.getElementsByClassName('group');
                elem[i].parentElement.style.backgroundColor = "#28a7dc";
                elem[i].parentElement.style.border = '2px solid black';




            } else {
                elem[i].parentElement.style.border = '2px solid #ccc';
                elem[i].parentElement.style.backgroundColor = "#fff";

            }
        }



        //     ele[i].checked = true;


        // Uncheck radio from previous selected choice

        // var ele = document.getElementsByName("radio");
        // for (var i = 0; i < ele.length; i++)
        //     ele[i].checked = false;

        // // remove highlight from previous selected choice
        // var group = document.getElementsByClassName('group');
        // for (var i = 0; i < group.length; i++)
        //     group[i].style.backgroundColor = '#fff';

        // // remove border color from previous selected choice
        // var group= document.getElementsByClassName('group');
        // for (var i = 0; i < group.length; i++)
        //     group[i].style.border = '2px solid #ccc';








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

        // restorePreviousAnswer();

        console.log(questionCounter);

        if (questionCounter === 0) {
            btnBack.style.display = "none";
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
            console.log(selectedAnswer)





            incrementScore(selectedAnswer);

            //












    //         // //NEXT BUTTON //
    //         // btn.onclick = function () {
    //         //     const rbs = document.querySelectorAll('input[name="radio"]');
    //         //     rbs.checked = false;
    //         //     for (const rb of rbs) {
    //         //         if (rb.checked === true) {
    //         //             getNewQuestion();
    //         //             break
    //         //         };
    //         //     };
    //         // };



    //         // old unchecked radio


    //         // if(document.querySelectorAll('input[name="radio"]').checked == true){

    //         //     nextQuestion.addEventListener("click", () => {
    //         //         getNewQuestion();
    //         //     });
    //         // } else return;






    //         // old get new question

    //         /*getNewQuestion();*/
        });
    });


    // var restorePreviousAnswer = function () {
    //     console.log
    //     if (choices[currentQ] != null) radios[choices[currentQ]].checked = true
    // }

    // console.log(radios[choices[currentQuestion]])












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

        checking = [];

        // btnBack.style.display = "#fff";

        const rbs = document.querySelectorAll('input[name="radio"]');
        // rbs.checked = false;

        // store picked value

        for (var i = 0; i < rbs.length; i++) {
            if(rbs[i].checked) {
                answers[questionCounter] = Number(rbs[i].value);


                // answers[questionCounter] = rbs[i].value;



            }
        }

        console.log(answers);

        // answers.forEach(item => {
        //     score += item;
        // });




        for (const rb of rbs) {
            if (rb.checked === true) {
                counter++;
                questionCounter++;
                if (counter > 1) {
                    btnBack.style.display = "inline-block";
                }
                // else if (counter === 1) {
                //     btnBack.style.display = "none";
                // }

                // store answers






                getNewQuestion();










                break
            };
        };
    });

    btnBack.addEventListener('click', () => {

        checking = answers.pop();

        score = score - checking;

        // answers.forEach(item => {
        //     score += item;
        // });






        // changes
        const rbs = document.querySelectorAll('input[name="radio"]');



        var rLen = rbs.length, i;
        for (i = 0; i < rbs.length; ++i) {
            if (checking === Number(rbs[i].value)) {
                rbs[i].checked = true;
            }
        }

        checking = [];








        if (counter > 1 & questionCounter > 0) {
            counter--;
            questionCounter--;




        }



        getPreviousQuestion();

        console.log(answers)








    });






    // btnBack.onclick = function () {
    //     if (questionCounter > 0) {
    //         getPreviousQuestion();
    //     };

    // };









};



// startGame();
