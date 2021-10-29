import React, { useState } from 'react';

// component for button to set filter to ''

const Filter = (props) => {
  const years = props.pictures.map(p => p.year)
  return (
    <div>
      <label htmlFor="year">Choose a year:</label>
      <select name="years" id="years" value={props.newFilter} onChange={props.handleFilterChange}>
        {years.map(year =>
          <option key={year} value={year}>{year}</option>
        )}
      </select>
    </div>
  )
}

const Pictures = (props) => {
  console.log(props)
  return (
    <div>
      <div> year {props.year}</div>
      <div> data {props.data}</div>
    </div>
  )
}

const App = () => {
  //const [pictures, setPictures] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const pictures = [
    {
      year: "2018",
      data: "testing 2018"
    },
    {
      year: "2017",
      data: "testing 2017"
    },
    {
      year: "2016",
      data: "testing 2016"
    },
    {
      year: "2019",
      data: "testing 2019"
    },
    {
      year: "2020",
      data: "testing 2020"
    },
  ]

  var filtered = pictures.filter(picture => picture.year.includes(newFilter))

  

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} pictures={pictures}/>
      {filtered.map(picture => 
        <Pictures 
        key={picture.year}
        year={picture.year}
        data={picture.data}
        />
        )}
    </div>
  );
}

export default App;
