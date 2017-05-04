var BasicCard = require("./basic-card.js");
var ClozeCard = require("./cloze-card.js");
var inquirer = require("inquirer");
var fs = require("fs");

var basicFlashCards = [];
var questionCount = 0;
var correct = 0;
var incorrect = 0;

var createFlashCard = function() {
    if (basicFlashCards.length < 5) {
        console.log("Add a flash card!");
        inquirer.prompt([{
                name: "front",
                message: "What is your question?"
            }, {
                name: "back",
                message: "What is the answer?"
            }

        ]).then(function(answers) {
            var flashcard = new BasicCard(answers.front, answers.back);
            basicFlashCards.push(flashcard);
            createFlashCard();
        });
    } else {
        console.log("Time to study!")
        study();
    }
};
var study = function() {
        if (questionCount < basicFlashCards.length) {            
            var currentQuestion = basicFlashCards[questionCount].front;


                inquirer.prompt([{
                    type: "input",
                    message: currentQuestion,
                    name: "answer"
                }]).then(function(user) {
                    if (user.answer === basicFlashCards[questionCount].back || user.answer === basicFlashCards[questionCount].back.toLowerCase()) {
                        console.log("Correct!");
                        questionCount++;
                        correct++
                        study();
                    } else {
                        console.log("Incorrect! The correct answer is: " + basicFlashCards[questionCount].back);
                        questionCount++;
                        incorrect++;
                        study();
                    }
                });
            }
         else {
            console.log("Thanks for studying! Here are your results:\n" + "Correct: " + correct + "\n" + "Incorrect: " + incorrect + "\n");
        }
    };
        createFlashCard();
