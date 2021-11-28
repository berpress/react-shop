import React, { useState } from 'react';

function Search (props) {
  const { updateGoods = Function.prototype } = props;
  const [search, setSearch] = useState('');
  return (
    <div className="input-field">
            <input 
                placeholder="Search product" 
                id="email_inline" 
                type="search" 
                className="validate" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button
            className='btn search-btn'
            onClick={() => updateGoods(search)}
          >Search</button>
    </div>
  );
}

export {Search};