import React from 'react';
import config from './config'
import ApiContext from './ApiContext'

export default class NotesForm extends React.Component {
    static contextType = ApiContext;

    state = {
        noteName: { value: '', touched: false },
        noteDescription: { value: '', touched: false },
        folders: this.context.folders,
        selectValue: { value: '', touched: false }
    };

    setNoteName = noteName => {
        this.setState({ noteName: { value: noteName, touched: true } });
    };

    setNoteDescription = noteDescription => {
        this.setState({ noteDescription: { value: noteDescription, touched: true } });
    };

    setSelectedValue = selectValue => {
        this.setState({ selectValue: { value: selectValue, touched: true } });
    }


    validateNoteName = () => {
        let noteName = this.state.noteName.value.trim();
        if (noteName === 0) {
            return "Note Name is required"
        }
        else if (noteName.length < 1 || noteName.length > 12) {
            return 'Note Name must between 1 and 12 characters long'
        }
    }

    validateNoteDescription = () => {
        let noteDescription = this.state.noteDescription.value.trim();
        if (noteDescription === 0) {
            return "Note Description is required"
        }
        else if (noteDescription.length < 6 || noteDescription.length > 72) {
            return 'Note Description must between 6 and 72 characters long'
        }
    }

    handleNoteSubmit = () => {
        let noteName = this.state.noteName.value.trim();
        let noteDescription = this.state.noteDescription.value;
        let selectValue = this.state.selectValue.value; //1, 2

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        let jsonObj = {
            name: noteName,
            content: noteDescription,
            folderId: selectValue,
            modified: date
        }

        let request = JSON.stringify(jsonObj)
        fetch(`${config.API_ENDPOINT}/notes`,
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
                console.log(response)
                this.context.addNote(response)
            })
            .catch(error => {
                console.error({ error })
            })
    }


    getFolderOptions = () => {
        let selectValue = this.state.selectValue.value; //1, 2
        const folders = this.context.folders.map(function (folder) {
            if (folder.id === selectValue) {
                return (
                    <option key={folder.id} value={folder.id} selected>{folder.name}</option>
                )
            } else {
                return (
                    <option key={folder.id} value={folder.id}>{folder.name}</option>
                )
            }
        })
        return folders;
    }



    render() {
        const folderOptions = this.getFolderOptions();
        return (
            <form onSubmit={() => this.handleNoteSubmit()}>
                <label htmlFor="note-name">Note Name
                {this.state.noteName.touched &&
                        <p className="error">{this.validateNoteName()}</p>}
                </label>
                <input id="note-name" type="text" value={this.state.noteName.value}
                    onChange={e => this.setNoteName(e.target.value)} />

                <label htmlFor="note-description">Note Description
                {this.state.noteDescription.touched &&
                        <p className="error">{this.validateNoteDescription()}</p>}
                </label>
                <input id="note-description" type="text" value={this.state.noteDescription.value}
                    onChange={e => this.setNoteDescription(e.target.value)} />
                <select name="folders" id="folder-select" value={this.state.selectValue.value}
                    onChange={e => this.setSelectedValue(e.target.value)}
                >
                    <option value="">Choose a Folder</option>
                    {folderOptions}
                </select>
                <button disabled={
                    this.validateNoteName() ||
                    this.validateNoteDescription()
                }>Submit Note</button>
            </form>
        )
    }

}