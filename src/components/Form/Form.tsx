import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import questionsorig from '../../../public/files/questions.json'; // Import the JSON data
import { useNavigate } from 'react-router-dom';

const choiceToCategory = {
  1: "dream",
  2: "soul",
  3: "adventure",
  // Add more mappings as needed
};

// Function to shuffle an array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const questions = shuffle(questionsorig); // Shuffle the questions

export const Form = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Start at the first question
  const [selectedChoices, setSelectedChoices] = useState([]); // Store the selected choice IDs

  const handleChoiceClick = (choiceId) => {
    setSelectedChoices(prevChoices => [...prevChoices, choiceId]); // Add the choice ID to the array
    setCurrentQuestionIndex(prevIndex => prevIndex + 1); // Move to the next question
  };
  
  const currentQuestion = questions[currentQuestionIndex]; // Get the current question

 
  console.log(questions)
  if (currentQuestionIndex >= questions.length) {
    // All questions have been answered
    const categoryCounts = selectedChoices.reduce((counts, choiceId) => {
      const category = choiceToCategory[choiceId];
      return { ...counts, [category]: (counts[category] || 0) + 1 };
    }, {});

    const maxCategory = Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b);

    navigate(`/result/${maxCategory}`);
  }
  return (
    <div className='p-8 text-center flex flex-col  items-center bg-gradient-to-br from-[#fdfdfd07] to-[#ffffff0c] rounded-lg h-full backdrop-blur-[5px]'>
      
      <div 
        className='flex flex-col gap-2'
       
      >
      <p>Question {currentQuestionIndex + 1} out of {questions.length}</p>
        <motion.h2
          key={`motion-h2-${currentQuestion.question}`}
          className='max-w-5xl underline decoration-1 underline-offset-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: ["0%", "3%", "0%"] }}
          transition={{
            opacity: { duration: 5, ease: "easeOut" },
          }}
        >{currentQuestion.question}</motion.h2>
      </div>


<div className='flex-1 flex flex-col justify-center items-center gap-20'>
    <div className='flex flex-row justify-between gap-20'>
    <motion.div 
          key={`motion-div-1-${currentQuestion.choices[0].choice}`}
          className='flex cursor-pointer flex-1 gap-5'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            opacity: { duration: 3, ease: "easeOut",delay:1 },
          }}
          onClick={() => handleChoiceClick(currentQuestion.choices[0].id)} // Add an onClick handler
        >
          <p className='text-4xl'>
            α
          </p>
          <h3>{currentQuestion.choices[0].choice}</h3>
        </motion.div>

        <motion.div 
        key={`motion-div-2-${currentQuestion.choices[1].choice}`}
          className='flex  cursor-pointer flex-1 gap-5'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            opacity: { duration: 3, ease: "easeOut",delay:2 },
          }}
          onClick={() => handleChoiceClick(currentQuestion.choices[1].id)} // Add an onClick handler
        >
          <p className='text-4xl'>
          β
          </p>
          <h3>{currentQuestion.choices[1].choice}</h3>
        </motion.div>
      </div>

      <div>
      <motion.div 
      key={`motion-div-3-${currentQuestion.choices[2].choice}`}
          className='flex cursor-pointer gap-5'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            opacity: { duration: 3, ease: "easeOut",delay:3 },
          }}
          onClick={() => handleChoiceClick(currentQuestion.choices[2].id)} // Add an onClick handler
        >
          <p className='text-4xl'>
          γ
          </p>
          <h3>{currentQuestion.choices[2].choice}</h3>
        </motion.div>
      </div>
</div>

    </div>
  )
}


