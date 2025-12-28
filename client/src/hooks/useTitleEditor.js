import { useState } from "react";

const useTitleEditor = (selectedDocument, setSelectedDocument, documentService, setDocuments) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editLocation, setEditLocation] = useState(null);

    const startEdit = (location, initialValue) => {
        if (!selectedDocument) return;
        setEditedTitle(initialValue !== undefined ? initialValue : selectedDocument.title);
        setIsEditingTitle(true);
        setEditLocation(location);
    };

    const cancelEdit = () => {
        setIsEditingTitle(false);
        setEditedTitle("");
        setEditLocation(null);
    };

    const saveEdit = () => {
        if (!selectedDocument || !editedTitle.trim()) {
            cancelEdit();
            return;
        }

        const trimmedTitle = editedTitle.trim();
        const updatedDoc = { ...selectedDocument, title: trimmedTitle };
        setSelectedDocument(updatedDoc);
        cancelEdit();

        documentService
            .update(selectedDocument.id, updatedDoc)
            .then((returnedDoc) => {
                setDocuments((docs) =>
                    docs.map((doc) => (doc.id === selectedDocument.id ? returnedDoc : doc))
                );
            })
            .catch((error) => {
                console.error("Error saving title", error);
            });
    };

    return {
        isEditingTitle,
        editedTitle,
        setEditedTitle,
        editLocation,
        startEdit,
        saveEdit,
        cancelEdit
    };
};

export default useTitleEditor;