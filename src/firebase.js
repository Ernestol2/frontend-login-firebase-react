import { auth } from './config'; // Assuming you have a config file where you initialize Firebase

const getUserToken = async () => {
  const user = auth.currentUser;

  if (user) {
    try {
      const idToken = await user.getIdToken();
      console.log('User ID token:', idToken);
      return idToken;
    } catch (error) {
      console.error('Error getting user token:', error);
      throw error;
    }
  } else {
    console.log('No user signed in.');
    return null;
  }
};

export { getUserToken };
