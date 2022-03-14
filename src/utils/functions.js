export default function fixWhenGoogleTranslateAppBreak() {
  if (typeof Node === "function" && Node.prototype) {
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function(child) {
      if (child.parentNode !== this) {
        if (console) {
          console.error(
            "Cannot remove a child from a different parent",
            child,
            this
          );
        }
        return child;
      }
      return originalRemoveChild.apply(this, arguments);
    };

    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function(newNode, referenceNode) {
      if (referenceNode && referenceNode.parentNode !== this) {
        if (console) {
          console.error(
            "Cannot insert before a reference node from a different parent",
            referenceNode,
            this
          );
        }
        return newNode;
      }
      return originalInsertBefore.apply(this, arguments);
    };
  }
}

export const getErrMessageFromString = errString => {
  const data = {
    NO_USER_WITH_EMAIL:
      "Tut mir leid, Benutzer mit einer solchen E-Mail gibt es noch nicht"
  };
  return errString in data ? data[errString] : null;
};
