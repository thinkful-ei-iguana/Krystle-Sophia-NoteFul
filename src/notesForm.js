import React from 'react';
import config from './config'
import ApiContext from './ApiContext'

export default class NotesForm extends React.Component {
    static contextType = ApiContext;

    state = {
        noteName: { value: '', touched: false },
        noteDescription: { value: '', touched: false },
        folders: this.context.folders
    };

    setNoteName = noteName => {
        this.setState({ noteName: { value: noteName, touched: true } });
    };

    setNoteDescription = noteDescription => {
        this.setState({ noteDescription: { value: noteDescription, touched: true } });
    };


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

    addNote = () => {
        let noteName = this.state.noteName.value.trim();
        let noteDescription = this.state.noteDescription.value();
        fetch(`${config.API_ENDPOINT}/notes`,
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: noteName,
            })
            .then(res => {
                if (!res.ok)
                  return res.json().then(e => Promise.reject(e))
                return res.json()
              })
              .then((res) => {
                this.context.addNote(res)
            
              })

              .catch(error => {
                console.error({ error })
              })
          }
        

    folderOptions = this.state.folders.map(function(folder){
        return (
            <option value="{folder.name}">{folder.name}</option>
        )
    })


    render() {
        return (
            <form>
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
                <select name="folders" id="folder-select">
                    <option value="">Choose a Folder</option>
                    {this.folderOptions}
                </select>
                <button disabled={
                    this.validateNoteName() ||
                    this.validateNoteDescription()
                }>Submit Note</button>
            </form>
        )
    }

}