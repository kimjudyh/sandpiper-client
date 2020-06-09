import React, { useState, useEffect } from 'react';
import BirdModel from '../models/BirdModel';
import BehaviorModel from '../models/BehaviorModel';

const NewBirdForm = (props) => {
  const [allBehaviors, setAllBehaviors] = useState([]);
  const name = useFormInput('');
  const number = useFormInput('');
  // fix.. set to some disabled choice
  const behavior = useFormInput('');
  const unconfirmed = useFormInput(false);
  const fieldNotes = useFormInput('');
  // TODO: photos

  const makeNewBird = (birdingSessionId, data) => {
    BirdModel.create(birdingSessionId, data) 
      .then(res => {
        console.log(res.data);
        // if success, do something
        if (res.status === 200) {
          // reset form fields
          name.resetField();
          number.resetField();
          behavior.resetField();
          unconfirmed.resetField();
          fieldNotes.resetField();

          props.setDidBirdsChange(true);
          props.toggleFormDisplay();
        } else {
          // do something
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log(err.message);
        }
      })
  }

  const getBehaviors = () => {
    BehaviorModel.all()
      .then(res => {
        console.log(res);
        // get pre-made list of behavior options
        const behaviors = res.data.allBehaviors.map((element, index) => {
          return (
            <option key={element._id} onClick={behavior.handleChange}
            id={element.name} name={element.name} value={element._id}>
              {element.name} {element.code}
            </option>
          )
        })
        setAllBehaviors(behaviors);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log(err.message);
        }
      })
    // name = behavior name
    // value = behavior id
  }

  useEffect(() => {
    getBehaviors();
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('behavior', behavior.value)
    makeNewBird(props._id, {
      name: name.value, 
      number: number.value, 
      behavior: behavior.value, 
      unconfirmed: unconfirmed.value, 
      fieldNotes: fieldNotes.value
    })
  }

  return (
    <div>
      new bird form
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input 
            // autofocus this field
            ref={input => input && input.focus()}
            onChange={name.handleChange}
            type="text"
            id="name"
            name="name"
            value={name.value}
          />
        </div>
        <div>
          <label>Number</label>
          <input 
            onChange={number.handleChange}
            type="number"
            id="number"
            name="number"
            value={number.value}
          />
        </div>
        <div>
          <label>Behavior</label>
          <select onChange={behavior.handleChange}>
            {allBehaviors}
          </select>
        </div>
        <div>
          <label>Unconfirmed ID?</label>
          <input 
            onChange={unconfirmed.handleChange}
            type="checkbox"
            id="unconfirmed"
            name="unconfirmed"
            checked={unconfirmed.value}
          />
        </div>
        <div>
          <label>Field Notes</label>
          <textarea 
            onChange={fieldNotes.handleChange}
            id="fieldNotes"
            name="fieldNotes"
            value={fieldNotes.value}
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default NewBirdForm;

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (event) => {
    console.log(event.target.type)
    if (event.target.type === 'checkbox') {
      setValue(!value);
    } else if (event.target.type === 'select') {

    } 
    else {
      console.log(event.target.value)
      setValue(event.target.value);
    }
  }
  const resetField = () => {
    setValue('');
  }
  return ({
    value,
    resetField,
    handleChange
  })
}