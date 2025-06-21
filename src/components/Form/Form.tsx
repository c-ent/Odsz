import {  useState } from 'react'
import { motion } from 'framer-motion';
import questionsorig from '../../../public/files/questions.json';
import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


const choiceToCategory: { [key: number]: string } = {
  1: "dream",
  2: "soul",
  3: "adventure",
};

// Shuffle Quiz
function shuffle(array:object[]) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  
  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

interface Question{
  id: number;
  question: string;
  choices: Choice[];
}

interface Choice {
  id: number;
  choice: string;
}

const questions = shuffle(questionsorig) as Question[];

export const Form = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoices,setSelectedChoices] = useState<number[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<null | number>(null);
  const navigate = useNavigate();
  const handleChoiceClick = (choiceId:number) => {
    setSelectedChoice(choiceId);
    setSelectedChoices(prevChoices => [...prevChoices, choiceId]);
    setTimeout(() => {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedChoice(null);
    }, 700);
  };

  
  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestionIndex >= questions.length) {
    const categoryCounts = selectedChoices.reduce<{ [key: string]: number }>((counts, choiceId) => {
      const category = choiceToCategory[choiceId];
      return { ...counts, [category]: (counts[category] || 0) + 1 };
    }, {});
  
    const maxCategory = Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b);

    const updateCategoryCount = async () => {
      const { data: currentCountData, error: fetchError } = await supabase
      .from('results')
      .select('count')
      .eq('category', maxCategory);

      if (fetchError) {
        console.error('Error fetching count:', fetchError);
        return;
      }

      const currentCount = currentCountData[0]?.count || 0;

      const { error: updateError } = await supabase
      .from('results')
      .update({ count: currentCount + 1 })
      .eq('category', maxCategory);

      if (updateError) {
      console.error('Error updating count:', updateError);
      return;
      }
      
    }

    updateCategoryCount()
    navigate(`/result/${maxCategory}`);
  }


  return (
    <motion.div className='p-6 md:p-8 shadow-sm shadow-white text-center flex flex-col  items-center bg-gradient-to-br from-[#fdfdfd00] to-[#ffffff05] rounded-2xl h-full backdrop-blur-[5px]'
      animate={{  y: ["100%", "0%"] }}
      transition={{
        y: { duration: 2, ease: "easeInOut",  }
      }}
    >
    <div className='flex flex-col gap-6'>
        <p>Question {currentQuestionIndex + 1} out of {questions.length}</p>
        {currentQuestion ? (
          <motion.h2
            key={`question-${currentQuestionIndex}`}
            className='max-w-5xl underline decoration-1 underline-offset-8'
            initial={{ opacity: 0, y: "10%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1, ease: "easeOut" },
              y: { duration: 1, ease: "easeOut" }
            }}
          >
            {currentQuestion.question}
          </motion.h2>
        ) : (
          <p>No question available</p>
        )}
      </div>


      <div className='flex-1 flex flex-col justify-center items-center gap-10 max-w-7xl'>
          <div className='flex flex-col md:flex-row justify-between gap-10 md:gap-20'>
              <motion.div 
                key={`choice-${currentQuestionIndex}-1`}
                className='max-w-xl flex items-center cursor-pointer flex-1 gap-5'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileTap={{ scale: 1.50 }}
                transition={{
                  opacity: { duration: 0.8, ease: "easeOut", delay: 0.3 },
                  scale: { duration: 1.5 }
                }}
                onClick={() => handleChoiceClick(currentQuestion.choices[0].id)}
                style={{ visibility: selectedChoice === null || selectedChoice === currentQuestion.choices[0].id ? 'visible' : 'hidden' }}
              >
                  <p className='text-4xl'>
                    α
                  </p> 
                  <h3>
                    {currentQuestion?.choices?.[0]?.choice ?? 'No choices available'}
                  </h3>
              </motion.div>

              <motion.div 
                  key={`choice-${currentQuestionIndex}-2`}
                  className='max-w-xl flex items-center cursor-pointer flex-1 gap-5'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  whileTap={{ scale: 1.50 }}
                  transition={{
                    opacity: { duration: 0.8, ease: "easeOut", delay: 0.6 },
                    scale: { duration: 1.5 }
                  }}
                  onClick={() => handleChoiceClick(currentQuestion.choices[1].id)}
                  style={{ visibility: selectedChoice === null || selectedChoice === currentQuestion.choices[1].id ? 'visible' : 'hidden' }}
                >
                <p className='text-4xl'>
                β
                </p>
                <h3>
                  {currentQuestion?.choices?.[1]?.choice ?? 'No choices available'}
                </h3>
              </motion.div>
            </div>

            <div>
              <motion.div 
                key={`choice-${currentQuestionIndex}-3`}
                className='max-w-xl flex items-center cursor-pointer flex-1 gap-5'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileTap={{ scale: 1.50 }}
                transition={{
                  opacity: { duration: 0.8, ease: "easeOut", delay: 0.9 },
                  scale: { duration: 1.5 }
                }}
                onClick={() => handleChoiceClick(currentQuestion.choices[2].id)}
                style={{ visibility: selectedChoice === null || selectedChoice === currentQuestion.choices[2].id ? 'visible' : 'hidden' }}
              >
              <p className='text-4xl'>
                γ
              </p>

              <h3>
                {currentQuestion?.choices?.[2]?.choice ?? 'No choices available'}
              </h3>
              </motion.div>
            </div>
      </div>

    </motion.div>
  )
}


