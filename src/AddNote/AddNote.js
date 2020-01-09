import React, { Component }  from 'react';
import ValidationError from '../ValidationError';
import ErrorBoundary from '../ErrorBoundary';
import GetData from '../GetData';
import propTypes from 'prop-types';
import config from '../config';
import './AddNote.css';


class AddNote extends Component {
    constructor(props) {
        super(props);
        this.contentInput = React.createRef();
        this.folderInput = React.createRef();
        this.state = {
            name: {
                value: ''
            },
            addedNote: null
        }
    }
    updateName(name) {
        this.setState({name: {value: name}});
    }

    validateName(fieldValue) {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return '*Name is required';
        } 
      }

    getOptions() {
        const folders = this.props.folders;
        const options = folders.map(folder => 
            <option key={folder.id} value={folder.id}>{folder.name}</option>
        )
        
        return options;
    }

    submitHandler = (e) => {
        e.preventDefault();
        const content = this.contentInput.current.value;
        const folder  = this.folderInput.current.value;
        const nname = this.state.name.value;
        console.log(`Content: ${content} folder: ${folder} Name: ${nname}`)

        this.setState({addedNote: nname});
        
        const headers = {
            'Content-Type': 'application/json'
        }
        fetch(`${config.API_ENDPOINT}/notes`, 
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    "name": nname,
                    "modified": '2019-01-03T00:00:00.000Z',
                    "folderId": folder,
                    "content": content
                })
            })

            .then(notesRes => { 
                if (!notesRes.ok) {
                    console.log('An error did occur: ', notesRes.status);
                    throw new Error('something went wrong ');
                }    
            })
            .then(() => { 
                console.log('going to get data again')
                GetData(this.props.handleUpdateState);
            })
            .catch(error => {
                console.error({error});
            });
    }
    render() {
        return (
            <ErrorBoundary>
                {this.state.addedNote ? <div className='note_name'>Added Note: {this.state.addedNote}</div> : <></>}
                <form className='newNote' onSubmit={this.submitHandler}>
                    <label htmlFor='newNote' className='note_name'>Note Name </label>
                    <input type='text' className='newNote__control' name='newNote' id='newNote' onChange={e => this.updateName(e.target.value)} />
                    <ValidationError message={this.validateName()}/>
                    <label htmlFor='newContent' className='note_name'>Content </label>
                    <input  type='textarea' className='newContent__control' name='newContent' id='newContent'ref={this.contentInput}/>
                    <label htmlFor='chooseFolder' className='note_name'>Choose Folder
                        <select className='newContent__control' name='newContent' id='newContent'ref={this.folderInput}>
                            {this.getOptions()}
                        </select>
                    </label>
                    <button type='submit' className='newNote__button'
                    disabled={this.validateName()}>Submit</button>
                </form>
            </ErrorBoundary>
        );
    }
}

AddNote.propTypes =  {
    handleUpdateState: propTypes.func.isRequired,
    folders: propTypes.arrayOf(propTypes.shape({
        name: propTypes.string.isRequired,
        id: propTypes.string.isRequired
    })).isRequired
}

export  default AddNote;