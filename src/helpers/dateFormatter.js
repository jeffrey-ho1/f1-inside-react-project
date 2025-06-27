export function formatApiDate(dateString) {
    if (!dateString) return 'Geen datum';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('nl-NL', options);
}

