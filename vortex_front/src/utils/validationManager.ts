class ValidationManager {
  static validateEmail(email: string) {
    let validationMessage = null;
    let regEx = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,4}$/);

    if (!regEx.test(email)) {
      validationMessage = 'Email invalido';
    }
    if (email.length === 0) {
      validationMessage = 'Este campo no puede estar vacío';
    }

    return validationMessage;
  }

  static validateGroup(validationsTexts: [string | null]) {
    for (let i = 0; i < validationsTexts.length; i++) {
      if (validationsTexts[i] !== null) {
        return false;
      }
    }

    return true;
  }
}

export default ValidationManager;
