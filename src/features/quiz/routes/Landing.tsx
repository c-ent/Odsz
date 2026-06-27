import { useRef, useEffect, useState } from 'react';
import { Head } from '@/components/Head';
import { Banner } from '@/components/Banner';
import { Form } from '@/components/Form';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Comets } from '@/components/Comets/Comets';

export const Landing = () => {
  const [showForm, setShowForm] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setShowForm(true);
  };

  return (
    <div className="w-screen flex flex-col justify-center star-section">
      <Comets />

      <Head title="ods" />
      <div className="w-screen h-dvh">
        <Navbar />
        <Banner begin={handleClick} />
      </div>

      <div className="w-screen h-dvh" ref={ref}>
        {showForm && (
          <motion.div className="h-full p-3 md:p-10">
            <Form />
          </motion.div>
        )}
      </div>
    </div>
  );
};
