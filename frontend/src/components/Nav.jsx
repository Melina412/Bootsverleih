import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <div>
        <NavLink to='/'>
          <img src='/img/circle-info-solid.svg' alt='boot icon' />
        </NavLink>
      </div>

      <div>
        <NavLink to='/boote'>
          <img src='/img/sailboat-solid.svg' alt='boot icon' />
        </NavLink>
      </div>

      <div>
        <NavLink to='/reservierungen'>
          <img src='/img/calendar-week-solid.svg' alt='kalender icon' />
        </NavLink>
      </div>
    </nav>
  );
}

export default Nav;
