import { useRef, useEffect, useState } from 'react';
import { Head } from '@/components/Head';
import { Banner } from '@/components/Banner';
import { Form } from '@/components/Form';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';

export const Landing = () => {
  const [showForm, setShowForm] = useState(false); 

  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
    setShowForm(true); // Show the form when the button is clicked
  };

  return (
    <div className="w-screen star-section">
    
            <span></span>
            <span></span>
    
      <Head title="ods" />

      <div className="h-screen w-screen">
        <Navbar />
    <Banner  begin={handleClick} />
      </div>

      <div className='w-screen h-screen' ref={ref}  >
        {showForm &&
          <motion.div className='h-full p-3 md:p-10'>
            <Form />
          </motion.div>
        }
      </div>
    </div>
  );
};