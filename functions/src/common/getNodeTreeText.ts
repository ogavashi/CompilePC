async function getNodeTreeText(inputNode: Element, node: any): Promise<any> {
  if (inputNode && inputNode.hasChildNodes()) {
    return node.innerText;
  }

  return null;
}

export default getNodeTreeText;
