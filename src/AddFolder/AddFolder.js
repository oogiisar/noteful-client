import React, { Component }  from 'react';
import ValidationError from '../ValidationError';
import propTypes from 'prop-types';
import GetData from '../GetData';
import config from '../config';
import './AddFolder.css';


class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            addedFolder: null
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

    submitHandler = (e) => {
        e.preventDefault();
        const fname = this.state.name.value;
        this.setState({addedFolder: fname});
    
        const headers = {
            'Content-Type': 'application/json'
        }
        fetch(`${config.API_ENDPOINT}/folders`, 
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({"name": fname})
            })
            .then(folderRes => { 
                if (!folderRes.ok) {
                    console.log('An error did occur: ', folderRes.status);
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
            <>
                {this.state.addedFolder ? <div className='folder_name'>Added folder: {this.state.addedFolder}</div> : <></>}
                <form className='newFolder' onSubmit={this.submitHandler}>
                    <label htmlFor='newFolder' className='folder_name'>Folder Name </label>
                    <input type='text' className='newFolder__control' name='newFolder' id='newFolder' onChange={e => this.updateName(e.target.value)} />
                    <ValidationError message={this.validateName()}/>
                    <button type='submit' className='newFolder__button'
                    disabled={this.validateName()}>Submit</button>
                </form>
            </>
        );
    }

}

AddFolder.propTypes =  {
    handleUpdateState: propTypes.func.isRequired
}

export  default AddFolder;