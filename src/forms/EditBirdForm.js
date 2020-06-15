import React, { useState, useEffect } from 'react';
import BirdModel from '../models/BirdModel';
import BehaviorModel from '../models/BehaviorModel';
import Error from '../components/Error';

const EditBirdForm = (props) => {
  /** Direct child of Bird
   *  Parent of Error
   */

  const [allBehaviors, setAllBehaviors] = useState([]);
  const name = useFormInput(props.birdData.name);
  const number = useFormInput(props.birdData.number);
  const behavior = useFormInput(props.birdData.behavior._id);
  const unconfirmed = useFormInput(props.birdData.unconfirmed);
  const fieldNotes = useFormInput(props.birdData.fieldNotes);
  const [error, setError] = useState('');

  // API call to update bird
  const updateBird = (birdingSessionId, birdId, data) => {
    BirdModel.update(birdingSessionId, birdId, data)
      .then(res => {
        console.log('updated bird', res.data);
        // if success
        if (res.status === 200) {
          // tell parent component bird was updated
          props.setBirdData(res.data.updatedBird);
          props.setDidBirdChange(!props.didBirdChange);
          props.toggleFormDisplay();
        } else {
          // say some error happened
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          if (typeof err.response.data.message === 'string'){
            setError(err.response.data.message);
          }
        } else if (err.request) {
          console.log(err.request);
          setError('Something went wrong...');
        } else {
          console.log(err.message);
          setError('Something went wrong...');
        }
      })
  }

  // API call to get all behaviors for drop-down menu
  const getBehaviors = () => {
    BehaviorModel.all()
      .then(res => {
        console.log('all behaviors edit', res.data);
        // get pre-made list of behavior options
        const behaviors = res.data.allBehaviors.map((element, index) => {
          // return jsx that contains behavior name and _id
          return (
            <option key={element._id}
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

  // when component mounts
  useEffect(() => {
    getBehaviors();
  }, [])

  // form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    updateBird(props.birdingSessionId, props.birdData._id, {
      name: name.value, 
      number: number.value, 
      behavior: behavior.value, 
      unconfirmed: unconfirmed.value, 
      fieldNotes: fieldNotes.value
    });
  }

  return (
    <>
    <Error error={error} />
    <form  onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          className="form-control"
          // autofocus this field
          autoFocus
          // ref={input => input && input.focus()}
          onChange={name.handleChange}
          type="text"
          // id="name"
          name="name"
          value={name.value}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="number">Number</label>
        <input
          className="form-control"
          onChange={number.handleChange}
          type="number"
          // id="number"
          name="number"
          value={number.value}
        />
      </div>
      <div className="form-group">
        <label htmlFor="behavior">Behavior</label>
        <select value={behavior.value} onChange={behavior.handleChange} className="form-control" >
          {allBehaviors}
        </select>
      </div>
      <div className="form-group form-check">
        <input
          className="form-check-input"
          onChange={unconfirmed.handleChange}
          type="checkbox"
          // id="unconfirmed"
          name="unconfirmed"
          checked={unconfirmed.value}
        />
        <label htmlFor="unconfirmed" className="form-check-label">Unconfirmed ID?</label>
      </div>
      <div className="form-group">
        <label htmlFor="fieldNotes">Field Notes</label>
        <textarea
          className="form-control"
          onChange={fieldNotes.handleChange}
          // id="fieldNotes"
          name="fieldNotes"
          rows="5"
          cols="30"
          value={fieldNotes.value}
        />
      </div>

      <button className="btn btn-success" data-dismiss="modal" type="submit">Save</button>

    </form>
    </>
  )
}

export default EditBirdForm;

// custom hook for changing form inputs
const useFormInput = (initialValue) => {
  if (initialValue === null) {
    initialValue = ''; 
  }
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    // special case for checkbox, since default value is on, off
    if (event.target.type === 'checkbox') {
      // want to set as true or false
      setValue(!value);
    } else if (event.target.type === 'select') {
      // something for.. dropdown. maybe
    } 
    else {
      setValue(event.target.value);
    }
  }

  // method to reset form fields
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