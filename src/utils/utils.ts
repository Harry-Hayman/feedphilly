// Format the date to a string
function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric'};
  
    return new Date(date).toLocaleDateString(undefined, options);
  }
  // Capitalize the first letter
function capitalize(str:string): string {
  if ( typeof str !== 'string' || str.length === 0 ) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Generate URL-friendly slug
function generateSlug(id: string): string {
  return id.replace(/\.md$/, '').replace(/\s+/g, '-').toLowerCase();
}

export { formatDate, capitalize, generateSlug };