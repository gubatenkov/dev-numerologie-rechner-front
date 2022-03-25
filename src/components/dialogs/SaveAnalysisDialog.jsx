import PropTypes from "prop-types";
import { Dropdown, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";

import Dialog from "./Dialog";
import { useUser } from "../../contexts/UserContext";

const SaveAnalysisDialog = ({ groups, onSave, onClose, isOpen }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const User = useUser();
  const [isUserAuthorized, setIsUserAuthorized] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(
    groups?.length ? groups[0] : null
  );

  useEffect(() => {
    if (User?.user) {
      setIsUserAuthorized(true);
    } else {
      setIsUserAuthorized(false);
    }
  }, [User, User.user]);

  const handleAction = () =>
    isUserAuthorized
      ? onSave(selectedGroup)
      : history.push(`/login?redirect=${history.location.pathname}`);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onAction={handleAction}
      title={t("DIALOG.SAVE_ANALYSIS")}
      cancelTitle={t("CANCEL")}
      actionTitle={t("YES")}
    >
      {isUserAuthorized ? (
        <DialogForAuthUser
          groups={groups}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
      ) : (
        <DialogForNotAuthUser />
      )}
    </Dialog>
  );
};

function DialogForAuthUser({ groups, setSelectedGroup, selectedGroup }) {
  const { t } = useTranslation();

  return (
    <>
      <p>{t("GROUP")}</p>
      {!groups?.length ? (
        <Spinner
          animation="border"
          role="status"
          variant="dark"
          style={{ margin: "0 auto 15px", display: "block" }}
        />
      ) : (
        <Dropdown className="dropdown dropdown-analysis">
          <Dropdown.Toggle
            className="dropdown-toggle"
            id="dropdown-basic"
            variant="secondary"
          >
            {selectedGroup
              ? selectedGroup.isDefault
                ? t(`GROUP_NAMES.${selectedGroup?.name}`)
                : `${selectedGroup?.name}`
              : "Available groups"}
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu-analysis">
            {groups.map(item => {
              const name = item.isDefault
                ? t(`GROUP_NAMES.${item.name}`)
                : item.name;
              return (
                <Dropdown.Item
                  key={item.name}
                  value={item.name}
                  onClick={() => {
                    setSelectedGroup(groups.find(el => el.name === item.name));
                  }}
                >
                  {name}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      )}
      <p>
        <small>{t("DIALOG.CHOOSE_GROUP")}</small>
      </p>
    </>
  );
}

function DialogForNotAuthUser() {
  const { t } = useTranslation();
  return <p>{t("DIALOG.PLEASE_LOGIN")}</p>;
}

SaveAnalysisDialog.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

SaveAnalysisDialog.defaultProps = {
  isOpen: false
};

export default SaveAnalysisDialog;
