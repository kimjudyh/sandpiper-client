import React, { useState, useEffect } from 'react';
import BirdModel from '../models/BirdModel';
import BehaviorModel from '../models/BehaviorModel';

const EditBirdForm = (props) => {
  const [allBehaviors, setAllBehaviors] = useState([]);
  const name = useFormInput(props.birdData.name);
  const number = useFormInput(props.birdData.number);
  // fix.. set to some disabled choice
  const behavior = useFormInput(props.birdData.behavior._id);
  const unconfirmed = useFormInput(props.birdData.unconfirmed);
  const fieldNotes = useFormInput(props.birdData.fieldNotes);
  // TODO: photos

  // API call to update bird
  const updateBird = (birdingSessionId, birdId, data) => {
    BirdModel.update(birdingSessionId, birdId, data)
      .then(res => {
        console.log(res.data);
        // if success
        if (res.status === 200) {
          // tell parent component bird was updated
          props.setBirdData(res.data.updatedBird);
          props.setDidBirdChange(true);
          props.toggleFormDisplay();
        } else {
          // say some error happened
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

  // API call to get all behaviors for drop-down menu
  const getBehaviors = () => {
    BehaviorModel.all()
      .then(res => {
        console.log(res);
        // get pre-made list of behavior options
        const behaviors = res.data.allBehaviors.map((element, index) => {
          // set default behavior choice to first behavior
          // if (element._id === behavior.value) {
            // behavior.setValue(element._id)
            // select this behavior
            // return (
            //   <option selected key={element._id} 
            //   id={element.name} name={element.name} value={element._id}>
            //     {element.name} {element.code}
            //   </option>
            // )
          // } else {
            // return jsx that contains behavior name and _id
            return (
              <option key={element._id} 
              id={element.name} name={element.name} value={element._id}>
                {element.name} {element.code}
              </option>
            )
          // }
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
        <select value={behavior.value} onChange={behavior.handleChange}>
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

  )
}

export default EditBirdForm;

// custom hook for changing form inputs
const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (event) => {
    console.log('event', event.target);
    // special case for checkbox, since default value is on, off
    if (event.target.type === 'checkbox') {
      // want to set as true or false
      setValue(!value);
    } else if (event.target.type === 'select') {

    } 
    else {
      setValue(event.target.value);
    }
    console.log('event value', event.target.value);
  }
  console.log('value', value);
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