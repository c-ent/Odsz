import { Link } from 'react-router-dom';
import { Head } from '@/components/Head';

export const NotFound = () => {
  return (
    <>
      <Head title="Not found | odsz" />
      <div className="px-4 w-screen h-dvh flex flex-col justify-center items-center text-center gap-6">
        <h1 className="text-gradient-main font-bold">lost in the cosmos</h1>
        <p className="max-w-md text-white/80">This page doesn&apos;t exist. Head back to begin your journey.</p>
        <Link to="/" className="btn-secondary">
          Return Home
        </Link>
      </div>
    </>
  );
};
