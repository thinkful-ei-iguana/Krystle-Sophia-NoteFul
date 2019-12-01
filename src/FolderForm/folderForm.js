import React from 'react';
import config from '../config'
import ApiContext from '../ApiContext'
import './folderForm.css'

export default class FolderForm extends React.Component {
    state = {
        folderName: { value: '', touched: false }
    };

    static contextType = ApiContext;

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

    handleFolderSubmit = () => {
        let folderName = this.state.folderName.value.trim();
        let jsonObj = {
            name: folderName
        }
        let request = JSON.stringify(jsonObj);
        fetch(`${config.API_ENDPOINT}/folders`,
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: request,
            })
            .then(function (response) {
                return response.json();
            })
            .then((response) => {
                this.context.addFolder(response)
            })
            .catch(error => {
                console.error({ error })
            })
    }


    render() {
        return (
            <form className="folder-form" onSubmit={() => this.handleFolderSubmit()}>
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