import React, { useState, useEffect } from 'react';
import BirdModel from '../models/BirdModel';
import BehaviorModel from '../models/BehaviorModel';

const NewBirdForm = (props) => {
  const [allBehaviors, setAllBehaviors] = useState([]);
  const [defaultBehavior, setDefaultBehavior] = useState('');
  const name = useFormInput('');
  const number = useFormInput('');
  // fix.. set to some disabled choice
  const behavior = useFormInput('');
  const unconfirmed = useFormInput(false);
  const fieldNotes = useFormInput('');
  // TODO: photos

  // API call to make new bird
  const makeNewBird = (birdingSessionId, data) => {
    BirdModel.create(birdingSessionId, data) 
      .then(res => {
        console.log(res.data);
        // if success, do something
        if (res.status === 200) {
          // reset form fields
          name.resetField();
          number.resetField();
          // reset behavior to default 'Being a Bird' behavior
          behavior.setValue(defaultBehavior);
          // reset unconfirmed to false
          unconfirmed.setValue(false);
          fieldNotes.resetField();
          // tell parent component that a bird was added
          props.setDidBirdsChange(!props.didBirdsChange);
          // hide form
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

  // API request to get all behaviors for drop-down menu
  const getBehaviors = () => {
    BehaviorModel.all()
      .then(res => {
        console.log('all behaviors', res.data);
        // get pre-made list of behavior options
        const behaviors = res.data.allBehaviors.map((element, index) => {
          // set default behavior choice to first behavior
          if (element.name === "Being a Bird") {
            behavior.setValue(element._id)
            setDefaultBehavior(element._id);
          }
          // return jsx that contains behavior name and _id
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
  }

  // when component mounts, get all behaviors
  useEffect(() => {
    getBehaviors();
  }, [])

  // form submission
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
            autoFocus
            // ref={input => input && input.focus()}
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
          <select  onChange={behavior.handleChange}>
            <option disabled selected>Select a Behavior</option>
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

        <button className="btn btn-success" data-dismiss="modal" type="submit">Save</button>
      </form>
    </div>
  )
}

export default NewBirdForm;

// custom hook for changing form inputs
const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (event) => {
    // special case for checkbox, since default value is on, off
    if (event.target.type === 'checkbox') {
      // want to set as true or false
      setValue(!value);
    } else if (event.target.type === 'select') {

    } 
    else {
      setValue(event.target.value);
    }
  }
  const resetField = () => {
    setValue('');
  }
  return ({
    value,
    setValue,
    resetField,
    handleChange
  })
}