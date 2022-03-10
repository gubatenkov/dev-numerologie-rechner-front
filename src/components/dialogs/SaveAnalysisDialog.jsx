import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";
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
  const [selectedGroup, setSelectedGroup] = useState(groups ? groups[0] : null);

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
          setSelectedGroup={setSelectedGroup}
        />
      ) : (
        <DialogForNotAuthUser />
      )}
    </Dialog>
  );
};

function DialogForAuthUser({ groups, setSelectedGroup }) {
  const { t } = useTranslation();
  return (
    <>
      <p>{t("GROUP")}</p>
      <div className="dropdown">
        {!groups?.length ? (
          <Spinner
            animation="border"
            role="status"
            variant="dark"
            style={{ margin: "0 auto 15px", display: "block" }}
          />
        ) : (
          <select
            className="form-control"
            onChange={newSelect => {
              setSelectedGroup(
                groups.find(item => item.name === newSelect.target.value)
              );
            }}
          >
            {groups.map(item => {
              const name = item.isDefault
                ? t(`GROUP_NAMES.${item.name}`)
                : item.name;
              return (
                <option key={item.name} value={item.name}>
                  {name}
                </option>
              );
            })}
          </select>
        )}
      </div>
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
