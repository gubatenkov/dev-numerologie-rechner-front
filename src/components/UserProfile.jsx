import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import { currentUserQuery } from '../graphql/Queries';
import { useMutation, useQuery } from '@apollo/react-hooks';
import ConfirmUserDeletionDialog from './dialogs/ConfirmUserDeletionDialog';
import { deleteUserMutation } from '../graphql/Mutations';
import { deleteUserAuthData } from '../utils/AuthUtils';
import LoadingIndicator from './LoadingIndicator';

function UserProfile() {
  let history = useHistory();
  const [userDeletionDialogOpen, setUserDeletionDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data } = useQuery(currentUserQuery);
  const [deleteUser] = useMutation(deleteUserMutation);

  function handleOnOpenDeletionDialog() {
    setUserDeletionDialogOpen(true);
  }

  function handleOnCloseDeletionDialog() {
    setUserDeletionDialogOpen(false);
  }

  function handleOnConfirmDeletionDialog() {
    // dismissing dialog
    setUserDeletionDialogOpen(false);

    setLoading(true);
    // deleting user & clearing the token
    deleteUser().then(() => {
      // removing token from local storage => logout
      deleteUserAuthData();

      // navigating to input for user
      history.push('/analysisInput');

      setLoading(false);
      // reloading to clear cache
      window.location.reload();
    });
  }

  if (loading || !data) {
    return <LoadingIndicator text="Lade..." />;
  } else {
    return (
      <div>
        <div>
          <NavigationBar />
        </div>
        <div>
          <h2>Personal Information</h2>
          <h5>Aktueller Name</h5>
          <input type="text" name="firstName" />
          <input type="text" name="lastName" />
          <h5>Email</h5>
          <input
            type="text"
            name="email"
            disabled={true}
            value={data.currentUser.email}
          />
          <button type="submit">Save</button>
        </div>
        <button onClick={handleOnOpenDeletionDialog}>Konto löschen</button>
        <ConfirmUserDeletionDialog
          isOpen={userDeletionDialogOpen}
          onClose={handleOnCloseDeletionDialog}
          onAction={handleOnConfirmDeletionDialog}
        />
      </div>
    );
  }
}

export default withRouter(UserProfile);
