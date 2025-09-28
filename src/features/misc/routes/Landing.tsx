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
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
    setShowForm(true);
  };

  return (
    <div className="w-screen flex flex-col justify-center star-section">
      {/* Span tags are the comets */}
      <span></span>
      <span></span>
    
      <Head title="ods" />
      <div className="h-screen w-screen">
        <Navbar />
        <Banner  begin={handleClick} />
      </div>

      <div className=' w-screen h-screen' ref={ref}  >
        {showForm &&
          <motion.div className='h-full p-3  md:p-10'>
            <Form />
          </motion.div>
        }
      </div>
    </div>
  );
};