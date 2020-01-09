import react from 'react';
import propType from 'prop-types';

const NotefulContext = react.createContext({
    notes: [],
    folders: []
});

NotefulContext.propType = {
    value: propType.objectOf(propType.shape({
        folders: propType.arrayOf(propType.shape({
            id: propType.string.isRequired,
            name: propType.string.isRequired
        })).isRequired,
        notes: propType.arrayOf(propType.shape({
            content: propType.string.isRequired,
            folderId: propType.string.isRequired,
            id: propType.string.isRequired,
            modified: propType.string.isRequired,
            name: propType.string.isRequired
        })).isRequired,
        deleteNote: propType.func.isRequired
    })).isRequired
}

export default NotefulContext;