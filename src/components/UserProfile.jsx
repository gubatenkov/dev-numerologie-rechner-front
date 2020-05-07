import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import ConfirmUserDeletionDialog from "./dialogs/ConfirmUserDeletionDialog";
import LoadingIndicator from "./LoadingIndicator";
import MainContainer from "./MainContainer";
import "../styles/UserProfile.scss";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import CreditsBuyModal from "./CreditsBuy/CreditsBuyModal";
import { useUser } from "../contexts/UserContext";

function UserProfile() {
  let history = useHistory();
  const [userDeletionDialogOpen, setUserDeletionDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const User = useUser();

  function handleOnOpenDeletionDialog() {
    setUserDeletionDialogOpen(true);
  }

  function handleOnCloseDeletionDialog() {
    setUserDeletionDialogOpen(false);
  }

  function handleOnConfirmDeletionDialog() {
    setUserDeletionDialogOpen(false);
    setLoading(true);
    User.deleteUser()
      .then(() => {
        history.push("/analysisInput");
      })
      .catch(e => {
        console.log("Error while deleting user:", e.message);
        setLoading(false);
      });
  }

  if (loading || !User.user) {
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
                <Form.Control
                  type="email"
                  value={User.user.currentUser.email}
                  disabled={true}
                />
              </div>
              <div className="akb-delete-div">
                <Button
                  className="akb-delete-button"
                  variant="danger"
                  size="lg"
                  onClick={handleOnOpenDeletionDialog}
                >
                  Konto löschen
                </Button>
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
        <CreditsBuyModal />
      </MainContainer>
    );
  }
}

export default withRouter(UserProfile);
