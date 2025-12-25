export const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
};