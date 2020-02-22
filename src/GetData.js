import config from './config';

export const GetData = (handleUpdateState) =>
    Promise.all([
        fetch(`${config.API_ENDPOINT}/api/notes`),
        fetch(`${config.API_ENDPOINT}/api/folders`)
    ])
        .then(([notesRes, foldersRes]) => {
            if (!notesRes.ok)
                return notesRes.json().then(e => Promise.reject(e));
            if (!foldersRes.ok)
                return foldersRes.json().then(e => Promise.reject(e));

            return Promise.all([notesRes.json(), foldersRes.json()]);
        })
        .then(([notes, folders]) => {
            handleUpdateState(notes, folders);
        })
        .then(() => {
            console.log("I ran")
        })
        .catch(error => {
            console.error({error});
        });

export default GetData;