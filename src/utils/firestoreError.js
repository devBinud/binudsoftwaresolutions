/**
 * Turns a Firestore/Firebase error into a short, actionable message for the admin UI.
 */
export const describeFirestoreError = (error) => {
  switch (error?.code) {
    case 'permission-denied':
      return 'Access denied by Firestore security rules. Publish firestore.rules in the Firebase Console (Firestore → Rules) and make sure you are signed in with the admin email listed in those rules.';
    case 'unauthenticated':
      return 'Your session has expired. Please log in again.';
    case 'unavailable':
      return 'Could not reach Firestore. Check your internet connection and try again.';
    case 'failed-precondition':
      return 'This query needs a Firestore index. Open the browser console for a direct link to create it.';
    default:
      return error?.message || 'Something went wrong while loading data.';
  }
};
