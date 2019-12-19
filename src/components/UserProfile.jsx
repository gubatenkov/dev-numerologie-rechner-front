import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import { currentUserQuery } from '../graphql/Queries';
import { useMutation, useQuery } from '@apollo/react-hooks';
import ConfirmUserDeletionDialog from './dialogs/ConfirmUserDeletionDialog';
import { deleteUserMutation } from '../graphql/Mutations';
import { deleteUserAuthData } from '../utils/AuthUtils';
import LoadingIndicator from './LoadingIndicator';
import MainContainer from './MainContainer';
import '../styles/UserProfile.scss'
import {Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

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
      <MainContainer>
        <div>
          <div>
            <NavigationBar />
          </div>
          <div className="akb-user-profile-display">
            <div className="akb-my-profile-navigation"></div>
            <div className="akb-user-info">
              <div className="akb-personal-info">
                <h2>Personal Information</h2>
                {/*<h4>Aktueller Name</h4>*/}
                {/*<Form>*/}
                {/*  <Row>*/}
                {/*    <Col>*/}
                {/*      <Form.Control placeholder="Vorname" />*/}
                {/*    </Col>*/}
                {/*    <Col>*/}
                {/*      <Form.Control placeholder="Nachname" />*/}
                {/*    </Col>*/}
                {/*  </Row>*/}
                {/*</Form>*/}
                <h5>Email</h5>
                <Form.Control type="email" value={data.currentUser.email} disabled={true}/>
              </div>
              <div className="akb-delete-div">
                <Button
                  className="akb-delete-button"
                  variant="danger"
                  size="lg"
                  onClick={handleOnOpenDeletionDialog}
                >Konto löschen</Button>
                <ConfirmUserDeletionDialog
                  isOpen={userDeletionDialogOpen}
                  onClose={handleOnCloseDeletionDialog}
                  onAction={handleOnConfirmDeletionDialog}
                />
              </div>
            </div>
            <div className="akb-save-container">
              {/*<Button className="akb-save-button" variant="primary" size="lg">Save</Button>*/}
            </div>
          </div>
        </div>
      </MainContainer>
    );
  }
}

export default withRouter(UserProfile);
