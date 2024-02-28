import { useRef, useEffect } from 'react';
import { Head } from '@/components/Head';
import { Banner } from '@/components/Banner';

export const Landing = () => {

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
  };

  return (
    // A div with a background image and full screen width
    <div className="bg-main w-screen">
      <Head title="Landing" />

      <div className="bg-black"className=""style={{height: '100vh', width: '100vw'}}>
        <Banner begin={handleClick} />
        {/* <button onClick={handleClick}>Scroll to element</button> */}
      </div>
      
      // A div that can be referenced programmatically
      <div ref={ref} style={{height: '60vh'}} >
        Some content here
      </div>
      
    </div>
  );
};