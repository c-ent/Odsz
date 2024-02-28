import { useRef, useEffect, useState } from 'react';
import { Head } from '@/components/Head';
import { Banner } from '@/components/Banner';
import { Form } from '@/components/Form';
import { motion } from 'framer-motion';

export const Landing = () => {
  const [showBanner, setShowBanner] = useState(true); 
  const [showForm, setShowForm] = useState(false); 

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
  }, []);

  const ref = useRef(null);
  document.body.style.overflow = 'hidden';

  const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
    setShowBanner(false);
    setShowForm(true); // Show the form when the button is clicked

  };

  return (
    // A div with a background image and full screen width
    <div className="bg-main w-screen" >
      <Head title="Landing" />

      <div className="bg-black "className=""style={{height: '100vh', width: '100vw'}}>
        {showBanner && <Banner  begin={handleClick} />}
      </div>
      
    
      <div className='w-screen' ref={ref} style={{height: '100vh'}} >
        
        {showForm &&
         <motion.div 
         className='h-full p-10'
         initial={{ scale: 0, opacity: 0 }} // Start from scale 0 and opacity 0
         animate={{ scale:1, opacity: 1 }} // Animate to scale 1 and opacity 1
         transition={{ repeat: 0, duration: 1, delay: 0  }} >

          <Form />

          </motion.div>
        }
      </div>
   
      
    </div>
  );
};