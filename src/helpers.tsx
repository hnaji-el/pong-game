export function getIndexElement(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
): number {
  let listChild: NodeListOf<ChildNode> | undefined =
    e.currentTarget.parentNode?.childNodes;
  let index: number = 0;

  listChild?.forEach((element: ChildNode, i: number) => {
    if (element === e.currentTarget) {
      index = i;
      return;
    }
  });
  return index;
}
