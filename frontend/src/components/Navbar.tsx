
import { NavLink } from 'react-router-dom' 

function Navbar() {
  return (
    <nav className='flex flex-row gap-4'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/new-note'>New Note</NavLink>
    </nav>
  )
}

export default Navbar