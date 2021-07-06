import React, { useState , useContext , useEffect } from 'react';
import './style.css'
import {Link} from 'react-router-dom'
import {  UserContext } from '../../../ContextAPI/User'
import ShowUserHeader from '../userheader';
import AOS from 'aos'
import "aos/dist/aos.css"

export default function Diagnose() {
    const {user} = useContext(UserContext)
    /*          navbar             */
    const x = JSON.stringify(user)
    const y = JSON.parse(x)
    console.log("user = ",user._id)
    console.log("y = ",y._id)
	const questions = [
		{
            "questionText": "Do you have difficulty breathing or shortness of breath?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you suffer from chest pain or pressure?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have dry cough?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you feel extra tired?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have a high fever?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you suffer from loss of taste or smell?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have a sore throat?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have a headache?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have a runny nose?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have diarrhea?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have muscle or body aches?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you look pale or have blue-colored skin?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

    useEffect(()=>{
        AOS.init({
            duration : 1000
        });
    })

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};

    const tryagain = () => {
        setCurrentQuestion(0)
        setShowScore(false)
        setScore(0)
    }
	return (
        <>
        {ShowUserHeader("fas fa-stethoscope","diagnose")}
        <div className="body1">
		<div className='diagnose' data-aos="flip-left">
			{showScore ? (
				<div className='score-section'>
					{/*You scored {score} out of {questions.length}<br /> */}
                    you have possiblity of having covid-19 with percentage {(score * 100 / questions.length).toFixed(2)} %
                    <button style={{textAlign:'center'}} className="diagnosebutton" onClick={tryagain}>to test again click here</button>
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button className="diagnosebutton" onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
        </div>
        </>
	);
}
