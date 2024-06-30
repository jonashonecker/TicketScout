export function checkIfHtmlContainsText(htmlString: string) {
  function hasCharacters(element: string) {
    return Boolean(element.trim());
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const allElements = doc.querySelectorAll("*");
  for (const element of allElements) {
    if (element.textContent && hasCharacters(element.textContent)) {
      return true;
    }
  }
  return false;
}
