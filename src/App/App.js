import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import AddFolder from '../AddFolder/AddFolder';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ErrorBoundary from '../ErrorBoundary';
import ApiContext from '../ApiContext';
import AddNote from '../AddNote/AddNote';
import getData from '../GetData'
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };


    handleUpdateState = (notes, folders) => {
        this.setState({
            notes: notes,
            folders: folders
        })
    }

    componentDidMount() {
        getData(this.handleUpdateState);
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
                    <Route 
                        path="/add-folder" 
                        render={(props) => 
                            <ErrorBoundary>
                                <AddFolder handleUpdateState={this.handleUpdateState} />
                            </ErrorBoundary>}
                    />
                    <Route
                        path="/add-note"
                        render={(props) => 
                            <ErrorBoundary>
                                <AddNote folders={this.state.folders} handleUpdateState={this.handleUpdateState} />
                            </ErrorBoundary>}
                    />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote
        };
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </ApiContext.Provider>
        );
    }
}

export default App;
