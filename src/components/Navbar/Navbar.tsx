import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <div className='flex justify-between px-5 py-3'>
        <div>
          <Link to="/" ><p className='text-2xl'>odsz</p></Link>
        </div>

        <div>
          {/* <Link to="#" ><p className='text-2xl'>abt</p></Link> */}
        </div>
        
    </div>
  )
}

