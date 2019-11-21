import React from 'react';
import config from './config'

export default class FolderForm extends React.Component {
    state = {
        folderName: { value: '', touched: false}
    };
    setFolderName = folderName => {
        this.setState({ folderName: { value: folderName, touched: true } });
    };


    validateFolderName = () => {
        let folderName = this.state.folderName.value.trim();
        if (folderName === 0) {
            return "Folder Name is required"
        }
        else if (folderName.length < 1 || folderName.length > 12) {
            return 'Folder Name must between 1 and 12 characters long'
        }
    }

    addFolder = () => {
        let folderName = this.state.folderName.value.trim();
        fetch(`${config.API_ENDPOINT}/folders`,
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: folderName,
        })
        .then(function (response) {
            return response.json();
        })
    }


    render() {
        return (
            <form>
                <label htmlFor="folder-name">Add Folder
                {this.state.folderName.touched &&
                <p className="error">{this.validateFolderName()}</p>}
                </label>
                <input id="folder-name" type="text" value={this.state.folderName.value}
                    onChange={e => this.setFolderName(e.target.value)} />
                <button disabled={
                    this.validateFolderName()
                }>Submit Folder Name</button>
            </form>
        )
    }

}