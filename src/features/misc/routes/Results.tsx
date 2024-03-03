import { useParams } from 'react-router-dom';
import DreamChaserSvg from '../../../../public/svg/DreamChaserSvg.svg';
import RiskTakerSvg from '../../../../public/svg/RiskTakerSvg.svg';
import SteadySailerSvg from '../../../../public/svg/SteadySailerSvg.svg';


type CategoryData = {
  [key: string]: {
    title: string;
    description: string;
    file: string;
  };
};

const categoryData:CategoryData = {
  'dream': {
    title: "Dream Chaser",
    description: `You pursue your deepest aspirations, driven by the vision of what you want to achieve in life. Whether it's a career goal, a creative endeavor, or a personal ambition, you relentlessly strive to turn your dreams into reality.`,
    file: DreamChaserSvg,
  },
  'soul': {
    title: "Soul Searcher",
    description: `You embrace change as the catalyst for growth and transformation on your quest to discover your personal legend. Through introspection and exploration, you unravel the layers of your being, unearthing the true essence of your existence.`,
    file: RiskTakerSvg,
  },
  'adventure': {
    title: "Adventurer",
    description: `You fearlessly delve into the uncharted territories of life, seeking wisdom amidst the mysteries of the unknown. Every step you take is infused with curiosity and a thirst for knowledge, for you understand that true enlightenment lies in the depths of exploration.`,
    file: SteadySailerSvg,
  },
};


export const Results = () => {
  const { category } = useParams<{ category: string }>();
  
  if (!category) {
    return <div>Oops</div>;
  }

  const categoryInfo = categoryData[category];


  if (!categoryInfo) {
    return <div>Category not found</div>;
  }

  const { title, description, file } = categoryInfo;

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center text-center space-y-5'>


      <div className="border-r h-[120px] border-white my-4"></div>
      <h2>you are a</h2>
      <h1 className='font-bold'>{title}</h1>
      <p className='max-w-xl '>{description}</p>
      <img src={file} alt={title} />
      <p className='max-w-md text-sm'> And, when you want something, all the universe conspires in helping you to achieve it.</p>
    </div>
  );
}