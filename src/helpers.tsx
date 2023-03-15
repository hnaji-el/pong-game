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

export function firstLetterCapital(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function checkNickname(value: string): string {
  if (!value.trim().length) return "Zone text empty";

  return "";
}

export function checkChannelName(value: string): string {
  if (!value.trim().length) return "Zone text empty";

  return "";
}

export function checkPasswordChannel(value: string): string {
  if (!value.trim().length) return "Zone text empty";

  return "";
}
