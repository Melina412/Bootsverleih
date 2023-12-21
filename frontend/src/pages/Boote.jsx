import { useState } from 'react';
import Liste from '../components/Liste';
import AddBoot from '../components/Boote/AddBoot';

function Boote({ boote, fetchBoote }) {
  const [addMode, setAddMode] = useState(false);
  return (
    <main className='boote'>
      <h1>Boote</h1>
      {addMode ? (
        <AddBoot setAddMode={setAddMode} fetchBoote={fetchBoote} />
      ) : (
        <Liste page='boote' boote={boote} setAddMode={setAddMode} />
      )}
    </main>
  );
}

export default Boote;
